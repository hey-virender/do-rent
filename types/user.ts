export type UserRole = "tenant" | "landlord" | "admin";

export interface User {
  id:string,
  name : string|null,
  email:string,
  avatar?:string | null,
  role: UserRole,
  gender: "male" | "female" | "other" | null,
  phone?: string | null,
  provider: "google" | "local"| "facebook",
  isActive: boolean,
  isVerified: boolean,
  createdAt: string,
  updatedAt: string,
}