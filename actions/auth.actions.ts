"use server";

import { registerSchema } from "@/validations/auth.validation";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function registerUser(input: unknown) {
  try {
    const parsed = registerSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten() };
    }

    const {
      name,
      email,
      password,
      avatar,
      role,
      phone,
      adhaarNumber,
      gender,
      dob,
    } = parsed.data;

    // 1️⃣ Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        errors: "User with this email already exists",
      };
    }

    // 2️⃣ Hash password (IMPORTANT: await)
    const hashedPassword = await hash(password, 10);

    // 3️⃣ Create user + profile (single transaction)
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,

        profile: {
          create: {
            avatarUrl: avatar ?? "",
            phone: phone ?? null,
            adhaarNumber: adhaarNumber ?? null,
            gender,
            address: null,
          },
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      errors: "An unexpected error occurred during registration",
    };
  }
}
