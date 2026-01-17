"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/auth.store";
import { registerSchema } from "@/validations/auth.validation";
import { SelectValue } from "@radix-ui/react-select";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { registerUser } from "@/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const {data:session} = useSession()
  const router = useRouter();
  if(session && session.user){
    toast.error("You are already logged in");
    router.push("/");
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dob, setDob] = useState<Date | undefined>(undefined);

  function handleDateChange(date: Date | undefined) {
    if (date) {
      setRegisterData({ dob: date.toISOString() });
    } else {
      setRegisterData({ dob: "" });
    }
  }

  const { registerData, setRegisterData, errors, setErrors, clearErrors } =
    useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const result = registerSchema.safeParse(registerData);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((err) => {
          const field = err.path[0];

          if (typeof field === "string" || typeof field === "number") {
            fieldErrors[field.toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
      clearErrors();
      const response = await registerUser(registerData);
      if (!response.success) {
        toast.error((response.errors as string) || "Registration failed");
        return;
      }
      toast.success(
        "Registration successful! Please check your email to verify your account.",
      );

      router.push("/login");
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        adhaarNumber: "",
        role: "",
        gender: "",
        dob: "",
        termsAccepted: false,
      });
    } catch (error) {
      toast.error((error as string) || "An unexpected error occurred");
    }
  };

  return (
    <main className="grid grid-cols-2 text-neutral-100 px-20 pb-10">
      <div className="w-full h-full col-span-1 rounded-tl-2xl rounded-bl-2xl overflow-hidden">
        <Image
          src="/assets/images/galaxy.jpg"
          alt="login image"
          width={800}
          height={800}
          className=" object-cover w-full h-full"
        />
      </div>

      <div className="relative w-full h-full  overflow-hidden rounded-tr-2xl rounded-br-2xl bg-white/5 px-8 py-12 backdrop-blur-xl shadow-2xl">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/100 via-primary/80 to-primary/60" />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--primary))/_0.25,_transparent_30%)]" />

        <h1 className="text-3xl font-bold tracking-tight text-white">
          New here? Create an account
        </h1>
        <p className="mt-2 text-sm text-neutral-300">Create your account</p>

        <form className="mt-8" onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup className="grid grid-cols-2 gap-4">
                {/* Name */}
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    required
                    className="bg-black/20 border-white/80 focus:border-purple-500 focus:ring-purple-500/20 text-white text-lg placeholder:text-white/60"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ name: e.target.value })}
                  />
                  {errors?.name ? (
                    <FieldDescription className="text-red-400">
                      {errors.name}
                    </FieldDescription>
                  ) : (
                    <FieldDescription className="text-gray-300">
                      Enter your name
                    </FieldDescription>
                  )}
                </Field>
                {/* Adhaar Number */}
                <Field>
                  <FieldLabel htmlFor="adhaarNumber">Adhaar Number</FieldLabel>
                  <Input
                    id="adhaarNumber"
                    placeholder="Your Adhaar Number"
                    required
                    className="bg-black/20 border-white/80 focus:border-purple-500 focus:ring-purple-500/20 text-white text-lg placeholder:text-white/60"
                    value={registerData.adhaarNumber}
                    onChange={(e) =>
                      setRegisterData({ adhaarNumber: e.target.value })
                    }
                  />

                  {errors?.adhaarNumber ? (
                    <FieldDescription className="text-red-400">
                      {errors.adhaarNumber}
                    </FieldDescription>
                  ) : (
                    <FieldDescription className="text-gray-300">
                      Enter your Adhaar Number
                    </FieldDescription>
                  )}
                </Field>
                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    placeholder="you@example.com"
                    required
                    className="bg-black/20 border-white/80 focus:border-purple-500 focus:ring-purple-500/20 text-white text-lg placeholder:text-white/60"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ email: e.target.value })}
                  />
                  {errors?.email ? (
                    <FieldDescription className="text-red-400">
                      {errors.email}
                    </FieldDescription>
                  ) : (
                    <FieldDescription className="text-gray-300 select-none">
                      Enter your email address
                    </FieldDescription>
                  )}
                </Field>
                {/* Phone */}
                <Field>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    id="phone"
                    placeholder="Your phone number"
                    required
                    className="bg-black/20 border-white/80 focus:border-purple-500 focus:ring-purple-500/20 text-white text-lg placeholder:text-white/60"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ phone: e.target.value })}
                  />
                  {errors?.phone ? (
                    <FieldDescription className="text-red-400">
                      {errors.phone}
                    </FieldDescription>
                  ) : (
                    <FieldDescription className="text-gray-300 select-none">
                      Enter your phone number
                    </FieldDescription>
                  )}
                </Field>
                {/* Gender */}
                <Field>
                  <FieldLabel htmlFor="gender">Gender</FieldLabel>
                  <Select
                    value={registerData.gender}
                    onValueChange={(value) =>
                      setRegisterData({ gender: value })
                    }
                  >
                    <SelectTrigger
                      id="gender"
                      className="text-white bg-black/20 [&>span]:text-white/60
      [&>span]:opacity-100"
                    >
                      <SelectValue
                        className="text-white "
                        placeholder="Select your gender"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem className="bg-white" value="male">
                          Male
                        </SelectItem>
                        <SelectItem className="bg-white" value="female">
                          Female
                        </SelectItem>
                        <SelectItem className="bg-white" value="other">
                          Other
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors?.gender ? (
                    <FieldDescription className="text-red-400">
                      {errors.gender}
                    </FieldDescription>
                  ) : (
                    <FieldDescription className="text-gray-300 select-none">
                      Select your gender
                    </FieldDescription>
                  )}
                </Field>
                {/* Role */}
                <Field>
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                  <Select
                    value={registerData.role}
                    onValueChange={(value) => setRegisterData({ role: value })}
                  >
                    <SelectTrigger
                      id="role"
                      className="text-white bg-black/20 [&>span]:text-white/60 [&>span]:opacity-100"
                    >
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem className="bg-white" value="tenant">
                          Tenant
                        </SelectItem>
                        <SelectItem className="bg-white" value="landlord">
                          Landlord
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors?.role ? (
                    <FieldDescription className="text-red-400">
                      {errors.role}
                    </FieldDescription>
                  ) : (
                    <FieldDescription className="text-gray-300 select-none">
                      Enter your email address
                    </FieldDescription>
                  )}
                </Field>

                {/* Date of Birth */}
                <Field>
                  <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
                  <DatePicker
                    date={
                      registerData.dob ? new Date(registerData.dob) : undefined
                    }
                    className="text-white bg-black/20 [&>span]:text-white/60 [&>span]:opacity-100"
                    calendarClassName="bg-white"
                    setDate={handleDateChange}
                  />
                </Field>
                {errors?.dob ? (
                  <FieldDescription className="text-red-400">
                    {errors.dob}
                  </FieldDescription>
                ) : (
                  <FieldDescription className="text-gray-300 select-none">
                    Enter your date of birth
                  </FieldDescription>
                )}
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldGroup className="mt-4 grid grid-cols-2 ">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Choose your password"
                      type={showPassword ? "text" : "password"}
                      className="bg-black/20 border-white/80 pr-10 focus:border-purple-500 focus:ring-purple-500/20 text-white text-lg placeholder:text-white/60"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({ password: e.target.value })
                      }
                    />

                    {showPassword ? (
                      <Eye
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-9 cursor-pointer text-white hover:text-gray-300 p-2"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeClosed
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-9 cursor-pointer text-white hover:text-gray-300 p-2"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                  {errors?.password ? (
                    <FieldDescription className="text-red-400">
                      {errors.password}
                    </FieldDescription>
                  ) : (
                    <FieldDescription className="text-gray-300 select-none">
                      Enter your password
                    </FieldDescription>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      placeholder="Confirm your password"
                      type={showConfirmPassword ? "text" : "password"}
                      className="bg-black/20 border-white/80 pr-10 focus:border-purple-500 focus:ring-purple-500/20 text-white text-lg placeholder:text-white/60"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({ confirmPassword: e.target.value })
                      }
                    />

                    {showConfirmPassword ? (
                      <Eye
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-9 cursor-pointer text-white hover:text-gray-300 p-2"
                        onClick={() => setShowConfirmPassword(false)}
                      />
                    ) : (
                      <EyeClosed
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-9 cursor-pointer text-white hover:text-gray-300 p-2"
                        onClick={() => setShowConfirmPassword(true)}
                      />
                    )}
                  </div>
                  {errors?.confirmPassword ? (
                    <FieldDescription className="text-red-400">
                      {errors.confirmPassword}
                    </FieldDescription>
                  ) : (
                    <FieldDescription className="text-gray-300 select-none">
                      Confirm your password
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <div className="flex items-center gap-2 mt-4">
                <Checkbox
                  id="terms"
                  className="size-5"
                  checked={registerData.termsAccepted}
                  onCheckedChange={(checked) =>
                    setRegisterData({ termsAccepted: checked === true })
                  }
                />

                <label
                  htmlFor="terms"
                  className=" text-neutral-200 leading-tight"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="underline hover:text-white">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {errors?.termsAccepted ? (
                <FieldDescription className="text-red-400">
                  {errors.termsAccepted}
                </FieldDescription>
              ) : null}
            </FieldSet>

            <Button
              type="submit"
              className="mt-6 w-fit px-20 py-6 mx-auto bg-gradient-to-r from-primary/40 via-primary/70 to-primary/80 text-lg border border-neutral-300  hover:scale-[1.01]"
            >
              Register
            </Button>

            <FieldGroup>
              <FieldDescription className="text-center mt-4 text-neutral-800 select-none ">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-gray-200 ml-2 hover:text-gray-400 hover:scale-105 hover:underline"
                >
                  Login
                </Link>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
};

export default Page;
