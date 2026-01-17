"use client";
import { useUIStore } from "@/store/ui.store";
import Link from "next/link";
import { House } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
const navItems = [
  { name: "Home", href: "/" },
  { name: "Rent Properties", href: "/properties" },
  { name: "List Property", href: "/list-property" },
];

const Header = () => {
  const { data: session } = useSession();
  const { name } = (session?.user as { name: string }) || {};
  const { isMenuOpen, toggleMenu } = useUIStore();
  return (
    <header className="flex justify-between items-center px-4 py-6 border-b-2 border-primary ">
      <div className="flex items-center gap-2 text-primary">
        <House className="inline mb-1 mr-2 size-10" />
        <h1 className="text-4xl font-grotesk font-bold ">Do Rent</h1>
      </div>

      <nav>
        <ul className="hidden lg:text-lg lg:visible md:flex gap-20 font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <button className="md:hidden" onClick={toggleMenu}>
          ☰
        </button>
        {isMenuOpen && (
          <ul className="absolute right-0  top-12 bg-white border rounded shadow-lg flex flex-col gap-2 p-4 md:hidden z-50">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={toggleMenu}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
      {name ?(<Link href="/profile">
      <p className="mr-4 text-lg capitalize">Hello, {name}</p>
      </Link>
      ) :<Link href="/login">
        
        <Button
          variant={"default"}
          className="px-4 py-2 text-lg cursor-pointer"
        >
          Login
        </Button>
      </Link>}
      
    </header>
  );
};

export default Header;
