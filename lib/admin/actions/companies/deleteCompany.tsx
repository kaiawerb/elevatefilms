"use server"

import { db } from "@/database/drizzle"
import { companies } from "@/database/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const deleteCompany = async (id: string) => {
  if (!id) return { success: false, message: "ID inválido" }

  try {
    const [deleted] = await db
      .delete(companies)
      .where(eq(companies.id, id))
      .returning({ id: companies.id })

    if (!deleted) {
      return { success: false, message: "Empresa não encontrado" }
    }

    revalidatePath("/admin/companies")
    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar:", error)
    return { success: false, message: "Erro no servidor" }
  }
}
