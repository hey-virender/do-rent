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
  isVerified: boolean,
  adhaarNumber?: string | null,
  panNumber?: string | null,
  address?: Address[] | null,
  createdAt: string,
  updatedAt: string,
  dob: string | null,
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}