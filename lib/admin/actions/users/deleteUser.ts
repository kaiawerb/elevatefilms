"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"

export const deleteUser = async (id: string) => {
  try {
    await db.delete(users).where(eq(users.id, id))
    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar usuario:", error)
    return { success: false, message: "Erro ao deletar usuario." }
  }
}
