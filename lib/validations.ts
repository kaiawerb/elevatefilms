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
  fullname: z.string().min(2, "Informe um nome completo").max(255),
  email: z.string().email("E-mail inválido."),
  password: z.string().optional(),

  age: z.number().min(1),
  genre: z.string().min(1, "Informe um genero"),

  civilStatus: z.string().min(5, "Informe um estado civil"),
  profession: z.string().min(1, "Informe uma profissão"),
  phone: z.string().min(8, "Informe um telefone"),

  cpf: z.string(),
  rg: z.string(),
  documentPhoto: z.string(),
  creci: z.string(),

  street: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  state: z.string(),
  zipCode: z.string(),
  complement: z.string(),

  notes: z.string(),
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
  brand: z.string().min(2, "A marca deve ter pelo menos 2 caracteres."),
  model: z.string().min(2, "O modelo deve ter pelo menos 2 caracteres."),

  type: z.enum(["DRONE", "CAMERA", "LENS", "ACCESSORY"], {
    message: "O tipo deve ser DRONE, CAMERA, LENS ou ACCESSORY.",
  }),
  status: z
    .enum(["AVAILABLE", "IN_USE", "UNDER_MAINTENANCE", "INACTIVE", "TO_BUY"], {
      message:
        "O status deve ser AVAILABLE, IN_USE, UNDER_MAINTENANCE ou INACTIVE.",
    })
    .default("AVAILABLE"),

  purchaseDate: z.date(),
  purchaseValue: z.string(),
  serialNumber: z
    .string()
    .min(2, "O número de série deve ter pelo menos 2 caracteres."),

  coverUrl: z.string(),
  notes: z.string().optional(),
  companyId: z.string().optional(),
})

export const companySchema = z.object({
  name: z
    .string()
    .min(2, "O nome da empresa deve ter pelo menos 2 caracteres."),
  email: z.string().email("E-mail inválido."),

  cnpj: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido."),
  phone: z
    .string()
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/, "Telefone inválido."),

  street: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  state: z.string(),
  zipCode: z.string(),
  complement: z.string(),

  createdAt: z.date().default(new Date()), // Data de criação padrão
  notes: z.string(),
  image: z.string(),
})

export const coordinatesSchema = z.object({
  name: z
    .string()
    .min(2, "O nome do marcador deve ter pelo menos 2 caracteres."),
  propertyId: z.string().optional(),
  companyId: z.string().optional(),
  latitude: z.string(),
  longitude: z.string(),
})
