import { describe, it, expect } from "vitest";
import { registerSchema, loginSchema } from "@/validations/auth.validation";

const validRegistration = {
  name: "Virender Chauhan",
  adhaarNumber: "123456789012",
  email: "user@example.com",
  password: "secret123",
  confirmPassword: "secret123",
  gender: "male" as const,
  phone: "9876543210",
  role: "landlord" as const,
  termsAccepted: true,
  dob: "1999-05-20",
};

describe("registerSchema", () => {
  it("accepts a well-formed registration", () => {
    expect(registerSchema.safeParse(validRegistration).success).toBe(true);
  });

  it("rejects mismatched passwords and reports it on confirmPassword", () => {
    const result = registerSchema.safeParse({
      ...validRegistration,
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) =>
        i.path.includes("confirmPassword"),
      );
      expect(issue?.message).toBe("Passwords do not match");
    }
  });

  it("requires terms to be accepted", () => {
    const result = registerSchema.safeParse({
      ...validRegistration,
      termsAccepted: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an Aadhaar number that is not exactly 12 digits", () => {
    expect(
      registerSchema.safeParse({ ...validRegistration, adhaarNumber: "12345" })
        .success,
    ).toBe(false);
  });

  it("allows a null Aadhaar number", () => {
    expect(
      registerSchema.safeParse({ ...validRegistration, adhaarNumber: null })
        .success,
    ).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(
      registerSchema.safeParse({ ...validRegistration, email: "not-an-email" })
        .success,
    ).toBe(false);
  });

  it("rejects a password under 6 characters", () => {
    expect(
      registerSchema.safeParse({
        ...validRegistration,
        password: "abc",
        confirmPassword: "abc",
      }).success,
    ).toBe(false);
  });

  it("rejects an unrecognised role", () => {
    expect(
      registerSchema.safeParse({ ...validRegistration, role: "superuser" })
        .success,
    ).toBe(false);
  });

  it("rejects an unparseable date of birth", () => {
    expect(
      registerSchema.safeParse({ ...validRegistration, dob: "not a date" })
        .success,
    ).toBe(false);
  });
});

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    expect(
      loginSchema.safeParse({ email: "a@b.com", password: "secret123" }).success,
    ).toBe(true);
  });

  it("rejects a malformed email", () => {
    expect(
      loginSchema.safeParse({ email: "nope", password: "secret123" }).success,
    ).toBe(false);
  });
});
