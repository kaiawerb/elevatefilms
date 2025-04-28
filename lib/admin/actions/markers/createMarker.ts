"use server"

import { db } from "@/database/drizzle"
import { propertyCoordinates } from "@/database/schema"
import { CoordinateParams } from "@/types" // seu tipo de input

export const createCoordinate = async (params: CoordinateParams) => {
  try {
    const newCoordinate = await db
      .insert(propertyCoordinates)
      .values({ ...params })
      .returning()

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newCoordinate[0])),
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: "An error occurred while creating the coordinate",
    }
  }
}
