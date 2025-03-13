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
  serialNumber: string
  purchaseDate: Date | null
  purchaseValue: string
  status: string
  notes?: string
  coverUrl: string
  createdAt?: Date | null
}

interface GearParams {
  name: string
  type: "DRONE" | "CAMERA" | "LENS" | "ACCESSORY"
  brand: string
  model: string
  serialNumber: string
  purchaseDate: Date
  purchaseValue: string
  status: "AVAILABLE" | "IN_USE" | "UNDER_MAINTENANCE" | "INACTIVE"
  coverUrl: string
  notes?: string
}

interface Company {
  id?: string
  name: string
  cnpj: string
  address: string
  phone: string
  email?: string
  companyId: string
  createdAt?: Date | null
}

interface CompanyParams {
  name: string
  cnpj: string
  address: string
  phone: string
  email: string
}

interface UserParams {
  password: string
  fullname: string
  email: string
  age: number
  companyId: string
  role: "USER" | "ADMIN"
  phone: string
  cpf: string
  genre: string
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
