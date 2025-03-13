import { number, z } from "zod"

export const signUpSchema = z.object({
  fullname: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
  companyId: z.string(),
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const userSchema = z.object({
  fullname: z.string().min(2).max(100),
  password: z.string().min(8),
  email: z.string().email("E-mail inválido."),
  age: z.number(),
  companyId: z.string(),
  genre: z.string(),
  address: z.string(),
  cpf: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  phone: z.string(),
})

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
  downloadUrl: z.string(),
})

export const gearSchema = z.object({
  name: z
    .string()
    .min(2, "O nome do equipamento deve ter pelo menos 2 caracteres."),
  type: z.enum(["DRONE", "CAMERA", "LENS", "ACCESSORY"], {
    message: "O tipo deve ser DRONE, CAMERA, LENS ou ACCESSORY.",
  }),
  brand: z.string().min(2, "A marca deve ter pelo menos 2 caracteres."),
  model: z.string().min(2, "O modelo deve ter pelo menos 2 caracteres."),
  serialNumber: z
    .string()
    .min(2, "O número de série deve ter pelo menos 2 caracteres."),
  purchaseDate: z.date(), // Data de aquisição
  purchaseValue: z.string(),
  status: z
    .enum(["AVAILABLE", "IN_USE", "UNDER_MAINTENANCE", "INACTIVE"], {
      message:
        "O status deve ser AVAILABLE, IN_USE, UNDER_MAINTENANCE ou INACTIVE.",
    })
    .default("AVAILABLE"),
  coverUrl: z.string(),
  notes: z.string().optional(), // Observações adicionais
})

export const companySchema = z.object({
  id: z.string().uuid().optional(), // ID gerado automaticamente
  name: z
    .string()
    .min(2, "O nome da empresa deve ter pelo menos 2 caracteres."),
  cnpj: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido."),
  address: z.string(), // Endereço pode ser opcional
  phone: z
    .string()
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/, "Telefone inválido."),
  email: z.string().email("E-mail inválido."),
  createdAt: z.date().default(new Date()), // Data de criação padrão
})
