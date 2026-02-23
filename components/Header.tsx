"use client";
import Link from "next/link";
import {
  CircleUser,
  House,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const { name, role } =
    (session?.user as { name: string; role: string }) || {};

  return (
    <header className="flex justify-between items-center px-4 py-6 border-b-2 border-primary ">
      <Link href="/" className="flex items-center gap-2" aria-label="Go to home page">
        <div className="flex items-center gap-2 text-primary">
          <House className="inline mb-1 mr-2 size-6 lg:size-10" />
          <h1 className="text-xl lg:text-4xl font-grotesk font-bold ">
            Do Rent
          </h1>
        </div>
      </Link>

      <div className="flex sm:gap-4">
        {role === "landlord" && name && (
          <Link href="/dashboard" className="bg-primary text-white rounded-lg px-3 py-1 flex items-center gap-2  capitalize font-bold" aria-label="Go to dashboard">
            <LayoutDashboard className="size-6 lg:size-8" aria-hidden="true" />
            <span className="hidden lg:block">Dashboard</span>
          </Link>
        )}
        {role === "tenant" && (
          <Link
            href="/chats"
            aria-label="Go to chats"
            className="flex items-center gap-2 mr-4  lg:text-lg capitalize text-primary font-bold py-1 px-3 border-2 border-accent rounded-md"
          >
            <MessageCircle />
            <span className="hidden lg:block">Chats</span>
          </Link>
        )}

        {name ? (
          <Link
            href="/profile"
            aria-label="Go to profile"
            className="flex items-center gap-2"
          >
            <p className="mr-4 text-lg capitalize hidden sm:block">
              Hello, {name}
            </p>

            <CircleUser
              className="size-8 text-accent sm:hidden"
              aria-hidden="true"
            />
          </Link>
        ) : (
          <Link className="bg-primary text-white px-4 py-2 text-lg cursor-pointer rounded-md" aria-label="Go to login page" href="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
