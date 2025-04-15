"use server"

import { db } from "@/database/drizzle"
import { propertyCoordinates } from "@/database/schema"
import { eq } from "drizzle-orm"

export const updateCoordinate = async (
  id: string,
  updates: { name: string; latitude: string; longitude: string }
) => {
  try {
    const result = await db
      .update(propertyCoordinates)
      .set({
        name: updates.name,
        latitude: updates.latitude,
        longitude: updates.longitude,
      })
      .where(eq(propertyCoordinates.id, id))
      .returning()

    return {
      success: true,
      data: result[0],
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: "Erro ao atualizar marcador",
    }
  }
}
