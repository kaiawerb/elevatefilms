import { auth } from "@/auth"
import Header from "@/components/Header"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq, and } from "drizzle-orm"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()

  if (!session) redirect("/sign-in")

  if (session?.user?.id && session?.user?.companyId) {
    const [user] = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.id, session.user.id),
          eq(users.companyId, session.user.companyId)
        ) // 🔹 Filtra pelo companyId
      )
      .limit(1)

    if (!user) {
      redirect("/sign-in") // 🔹 Redireciona se o usuário não pertencer à empresa
    }

    const today = new Date().toISOString().split("T")[0] // 🔹 Evita erro de fuso horário
    if (user?.lastActivityDate !== today) {
      await db
        .update(users)
        .set({ lastActivityDate: today })
        .where(eq(users.id, session.user.id))
    }
  }

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  )
}

export default Layout
