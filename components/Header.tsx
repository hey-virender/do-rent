"use client";
import Link from "next/link";
import { House,MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";


const Header = () => {
  const { data: session } = useSession();
  const { name, role } =
    (session?.user as { name: string; role: string }) || {};


  return (
    <header className="flex justify-between items-center px-4 py-6 border-b-2 border-primary ">
      <Link href="/">
        <div className="flex items-center gap-2 text-primary">
          <House className="inline mb-1 mr-2 size-10" />
          <h1 className="text-4xl font-grotesk font-bold ">Do Rent</h1>
        </div>
      </Link>

      <div className="flex gap-4">
        {role === "landlord" && name && (
          <Link href="/dashboard">
            <Button className="mr-4 text-lg capitalize ">Dashboard</Button>
          </Link>
        )}
        {role === "tenant" && (
          <Link href="/chats" className="flex items-center gap-2 mr-4 text-lg capitalize text-primary font-bold py-1 px-3 border-2 border-accent rounded-md">
            <MessageCircle/>
            Chats
          </Link>
        )}

        {name ? (
          <Link href="/profile">
            <p className="mr-4 text-lg capitalize">Hello, {name}</p>
          </Link>
        ) : (
          <Link href="/login">
            <Button
              variant={"default"}
              className="px-4 py-2 text-lg cursor-pointer"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
