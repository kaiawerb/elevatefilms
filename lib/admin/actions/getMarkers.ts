"use server"

import { db } from "@/database/drizzle"
import { propertyCoordinates } from "@/database/schema"

export const getCoordinates = async () => {
  try {
    const results = await db.select().from(propertyCoordinates)
    return results
  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error)
    return []
  }
}
