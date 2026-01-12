"use client";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="text-center flex flex-col justify-center items-center  gap-8">
      <div className="">
        <h1 className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-[16rem] bg-clip-text font-extrabold text-transparent">
          Oops!
        </h1>
        <h3 className="text-4xl font-bold uppercase">404 - Page Not Found</h3>
        <p className="text-xl max-w-lg mx-auto mt-6">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link href="/">
          <Button variant="default" className="px-3 py-6 text-lg mt-8 text-lg flex items-center gap-2 mx-auto">
          <Home className="inline mb-1 mr-2 size-7" /> Return to Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
