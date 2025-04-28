"use server"

import { db } from "@/database/drizzle"
import { companies } from "@/database/schema"
import { CompanyParams } from "@/types"

export const createCompany = async (params: CompanyParams) => {
  try {
    const newCompany = await db
      .insert(companies)
      .values({
        ...params,
      })
      .returning()

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newCompany[0])),
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: "An error occurred while creating the book",
    }
  }
}
