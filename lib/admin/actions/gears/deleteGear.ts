"use server"

import { db } from "@/database/drizzle"
import { gears } from "@/database/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const deleteGear = async (id: string) => {
  if (!id) return { success: false, message: "ID inválido" }

  try {
    const [deleted] = await db
      .delete(gears)
      .where(eq(gears.id, id))
      .returning({ id: gears.id })

    if (!deleted) {
      return { success: false, message: "Equipamento não encontrado" }
    }

    revalidatePath("/admin/gears")
    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar:", error)
    return { success: false, message: "Erro no servidor" }
  }
}
