// lib/admin/actions/deleteCoordinate.ts
"use server"

import { db } from "@/database/drizzle"
import { propertyCoordinates } from "@/database/schema"
import { eq } from "drizzle-orm"

export const deleteCoordinate = async (id: string) => {
  try {
    await db.delete(propertyCoordinates).where(eq(propertyCoordinates.id, id))
    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar marcador:", error)
    return { success: false, message: "Erro ao deletar marcador." }
  }
}
