/* prettier-ignore-file */

import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string): string =>
  name
    .split(" ") // Corrigido: separa por espaços em branco
    .map((part) => part[0]) // Pega a primeira letra de cada palavra
    .join("")
    .toUpperCase()
    .slice(0, 2)

export const capitalizeFirstLetter = (str: string | null) => {
  if (!str) return "Unknown" // Ou outra string padrão
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const formatStatus = (status: string) => {
  return status
    .toLowerCase() // Transforma tudo para minúsculo
    .replace(/_/g, " ") // Substitui "_" por espaço
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitaliza cada palavra
}

export const formatPhoneNumber = (phone: string | number): string => {
  // Garante que é uma string sem caracteres estranhos
  const cleaned = phone.toString().replace(/\D/g, "")

  // Formato para números com DDD e 9 dígitos (ex: 51985488659)
  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, "$1 $2 $3-$4")
  }

  // Formato para números com DDD e 8 dígitos (ex: 5185488659)
  if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, "$1 $2-$3")
  }

  // Se não bater os padrões conhecidos, retorna sem alteração
  return phone.toString()
}
