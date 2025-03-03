import { string } from "zod"

interface AuthCredentials {
  fullname: string
  email: string
  password: string
}

interface User {
  id: string
  fullname: string
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
  id?: string // Opcional, pois pode ser gerado automaticamente
  name: string // Nome do equipamento
  type: string // Tipo do equipamento (ex.: Drone, Câmera, Lente, Acessório)
  brand: string // Marca do equipamento
  model: string // Modelo do equipamento
  serialNumber: string // Número de série do equipamento
  purchaseDate: Date | null // Data de aquisição
  purchaseValue: number // Valor de aquisição (em formato de string para evitar problemas com decimais)
  status: string // Status do equipamento (ex.: Disponível, Em uso, Em manutenção, Inativo)
  notes?: string // Observações adicionais (opcional)
  createdAt?: Date | null // Data de criação (opcional, pois pode ser gerada automaticamente)
}

interface GearParams {
  name: string
  type: "DRONE" | "CAMERA" | "LENS" | "ACCESSORY"
  brand: string
  model: string
  serialNumber: string
  purchaseDate: Date // Obrigatório
  purchaseValue: number
  status: "AVAILABLE" | "IN_USE" | "UNDER_MAINTENANCE" | "INACTIVE"
  notes?: string
}
