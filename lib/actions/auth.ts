"use server"

import { signIn } from "@/auth"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { AuthCredentials } from "@/types"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import ratelimit from "../ratelimit"
import { redirect } from "next/navigation"
import { workflowClient } from "../worflow"
import config from "../config"
import { signOut } from "next-auth/react"

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1"
  const { success } = await ratelimit.limit(ip)

  if (!success) return redirect("/too-fast")

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return { success: false, error: result.error }
    }

    return { success: true }
  } catch (error) {
    console.log(error, "Signin Error")
    return { success: false, error: "Signin ERROR" }
  }
}

export const signUp = async (params: AuthCredentials) => {
  const { fullname, email, password, companyId } = params

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1"
  const { success } = await ratelimit.limit(ip)

  if (!success) return redirect("/too-fast")

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" }
  }

  const hashedPassword = await hash(password, 10)

  try {
    await db.insert(users).values({
      fullname,
      email,
      password: hashedPassword,
      companyId,
    })

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullname,
      },
    })

    await signInWithCredentials({
      email,
      password,
    })

    return { success: true }
  } catch (error) {
    console.log(error, "Signup ERROR")
    return { success: false, error: "Signup error" }
  }
}
