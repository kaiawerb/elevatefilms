import NextAuth, { User } from "next-auth"
import { compare } from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./database/drizzle"
import { users } from "./database/schema"
import { eq } from "drizzle-orm"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1)

        if (user.length === 0) return null

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password
        )

        if (!isPasswordValid) return null

        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullname,
          image: user[0].image,
          companyId: user[0].companyId,
        } as User
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.companyId = user.companyId // Passando o companyId no token
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.companyId = token.companyId as string
        session.user.image = token.image as string
      }
      return session
    },
  },
})
