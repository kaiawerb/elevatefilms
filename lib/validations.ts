import { number, z } from "zod"

export const signUpSchema = z.object({
  fullname: z.string().min(4),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(8),
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
