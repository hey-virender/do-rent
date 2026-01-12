"use client";
import { useUIStore } from "@/store/ui.store";
import Link from "next/link";
import React from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Rent Properties", href: "/properties" },
  { name: "List Property", href: "/list-property" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const {isMenuOpen,toggleMenu} = useUIStore();
  return (
    <header className="flex justify-between items-center px-4 py-2 border-b-2 mb-5 border-primary ">
      <h1 className="text-4xl font-bold italic">Do Rent</h1>
      <nav>
        <ul className="hidden lg:visible md:flex gap-20 font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden"
          onClick={toggleMenu}
        >
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
    </header>
  );
};

export default Header;
