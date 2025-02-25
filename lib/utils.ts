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
