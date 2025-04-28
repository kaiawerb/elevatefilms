"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { UserParams } from "@/types"

export const createUser = async (params: UserParams) => {
  try {
    const newGear = await db
      .insert(users)
      .values({ ...params })
      .returning()

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newGear[0])),
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: "An error occurred while creating the book",
    }
  }
}
