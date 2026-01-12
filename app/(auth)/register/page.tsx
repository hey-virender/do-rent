"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="grid grid-cols-2 text-neutral-100 px-20">
     <div className="w-full h-full col-span-1 rounded-tl-2xl rounded-bl-2xl overflow-hidden">
        <Image
          src="/assets/images/galaxy.jpg"
          alt="login image"
          width={800}
          height={800}
          className=" object-cover w-full h-full"
        />
      </div>

      <div className="relative w-full h-full  overflow-hidden rounded-tr-2xl rounded-br-2xl bg-white/5 px-8 py-32 backdrop-blur-xl shadow-2xl">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/100 via-primary/80 to-primary/60" />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--primary))/_0.25,_transparent_30%)]" />

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-neutral-300">Sign in to your account</p>

        <form className="mt-8">
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    required
                    className="bg-neutral-300 border-white/80 focus:border-purple-500 focus:ring-purple-500/20 text-black text-lg"
                  />
                  <FieldDescription className="text-gray-300 select-none">
                    Enter your name 
                  </FieldDescription>
                </Field>
                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    placeholder="you@example.com"
                    required
                    className="bg-neutral-300 border-white/80 focus:border-purple-500 focus:ring-purple-500/20 text-black text-lg"
                  />
                  <FieldDescription className="text-gray-300 select-none">
                    Enter your email address
                  </FieldDescription>
                </Field>

                <div>
                  <Field>
                  <FieldLabel htmlFor="gender">Gender</FieldLabel>
                 <Select >
                  <SelectTrigger id="gender" className="text-white">
                    <SelectValue className="bg-white text-gray-400" placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem className="bg-white" value="male">Male</SelectItem>
                      <SelectItem className="bg-white" value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                 </Select>
                  <FieldDescription className="text-gray-300 select-none">
                    Select your gender
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                 <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem className="bg-white" value="tenant">Tenant</SelectItem>
                      <SelectItem className="bg-white" value="landlord">Landlord</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                 </Select>
                  <FieldDescription className="text-gray-300 select-none">
                    Enter your email address
                  </FieldDescription>
                </Field>
                </div>

                {/* Password */}
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      required
                      className="bg-neutral-300 border-white/80 pr-10 focus:border-purple-500 focus:ring-purple-500/20 text-black text-lg"
                    />

                    {showPassword ? (
                      <Eye
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-9 cursor-pointer text-neutral-900 hover:text-black p-2"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeClosed
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-9 cursor-pointer text-neutral-900 hover:text-black p-2"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>

                  <FieldDescription className="text-gray-300 select-none">
                    Enter your password
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>

            <Button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-primary/40 via-primary/70 to-primary/80 text-lg border border-neutral-300 hover:scale-[1.01]"
            >
              Login
            </Button>

            <FieldGroup>
              <FieldDescription className="text-center mt-4 text-neutral-800 select-none">
                Don't have an account?{" "}
                <Link
                  href="/(auth)/register"
                  className="text-gray-200 hover:text-gray-400 hover:scale-105 hover:underline"
                >
                  Sign up
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
