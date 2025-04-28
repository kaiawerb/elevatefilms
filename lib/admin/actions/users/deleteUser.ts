// actions/delete-user-action.ts
"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
// actions/delete-user-action.ts
export const deleteUser = async (id: string) => {
  if (!id) return { success: false, message: "ID inválido" }

  try {
    const [deleted] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id })

    if (!deleted) {
      return { success: false, message: "Usuário não encontrado" }
    }

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar:", error)
    return { success: false, message: "Erro no servidor" }
  }
}
