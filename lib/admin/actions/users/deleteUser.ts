// actions/delete-user-action.ts
"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const deleteUser = async (id: string) => {
  try {
    await db.delete(users).where(eq(users.id, id))
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar usuario:", error)
    return { success: false, message: "Erro ao deletar usuario." }
  }
}
