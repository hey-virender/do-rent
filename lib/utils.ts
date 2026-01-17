import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function prismaUpdateFilter<T extends Record<string, unknown>>(data: T) {
  const cleaned: Record<string, unknown> = {}

  for (const key in data) {
    const value = data[key]

    if (
      value !== undefined &&
      value !== null &&
      !(typeof value === "string" && value.trim() === "")
    ) {
      cleaned[key] = value
    }
  }

  return cleaned as Partial<T>
}
