import { string } from "zod"
import NextAuth from "next-auth"

interface AuthCredentials {
  fullname: string
  email: string
  password: string
  companyId: string
}

interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  totalCopies: number
  availableCopies: number
  description: string
  coverColor: string
  coverUrl: string
  videoUrl: string
  summary: string
  createdAt: Date | null
  downloadUrl: string
}

interface BookParams {
  title: string
  author: string
  genre: string
  rating: number
  coverUrl: string
  coverColor: string
  downloadUrl: string
  description: string
  totalCopies: number
  videoUrl: string
  summary: string
}

interface Gear {
  id?: string
  name: string
  type: string
  brand: string
  model: string
  serialNumber?: string
  purchaseDate: Date | null
  purchaseValue: string
  status: string
  notes?: string
  coverUrl?: string
  createdAt?: Date | null
}

interface GearParams {
  name: string
  brand: string
  model: string

  type: "DRONE" | "CAMERA" | "LENS" | "ACCESSORY"
  status: "AVAILABLE" | "IN_USE" | "UNDER_MAINTENANCE" | "INACTIVE" | "TO_BUY"

  purchaseDate: Date
  purchaseValue: string
  serialNumber?: string

  coverUrl: string
  notes?: string
}

interface Company {
  id?: string
  name: string
  cnpj: string
  city?: string
  phone: string
  email?: string
  companyId: string
  createdAt?: Date | null
  image: string
}

interface CompanyParams {
  name: string
  email: string

  phone: string
  cnpj: string

  street?: string
  city: string
  neighborhood?: string
  state?: string
  zipCode?: string
  complement?: string

  notes?: string
  image?: string
}

interface UserParams {
  fullname: string
  email: string
  password: string

  age: number
  genre: string

  civilStatus: string
  profession: string
  phone: string

  cpf: string
  rg: string
  documentPhoto?: string
  creci?: string

  street?: string
  city: string
  neighborhood?: string
  state?: string
  zipCode?: string
  complement?: string

  notes?: string
  companyId?: string
}

export interface Column {
  id: string | number
  title: string
}

export interface Task {
  id: string | number
  columnId: string | number
  content: string
  description?: string
  priority?: "low" | "medium" | "high"
  category?: string
  media?: string[]
  comments?: string[]
  createdAt?: string
}

declare module "next-auth" {
  interface User {
    id: string
    fullname: string
    email: string
    companyId: string
    image: string
  }

  interface Session {
    user: User
  }

  interface JWT {
    id: string
    fullname: string
    email: string
    companyId: string
  }
}
