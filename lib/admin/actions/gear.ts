"use server"

import { db } from "@/database/drizzle"
import { gears } from "@/database/schema"
import { GearParams } from "@/types"

export const createGear = async (params: GearParams) => {
  try {
    const newBook = await db
      .insert(gears)
      .values({ ...params, purchaseValue: params.purchaseValue.toString() })
      .returning()

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: "An error occurred while creating the book",
    }
  }
}
