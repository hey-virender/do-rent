import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    role ?: "tenant" | "landlord" | "admin"
  }

  interface Session {
    user: {
      role: "tenant" | "landlord" | "admin"
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "tenant" | "landlord" | "admin"
  }
}