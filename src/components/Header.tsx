'use client';111

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="container flex flex-col justify-center mb-3 mx-auto">
      <img
        src="/images/pokeapi.png"
        alt="Pokeapi logo"
        className="w-[fit-content] mt-3 mx-auto mb-4"
      />
      <nav >
        <ul className="flex gap-3">
          <li>
            <Link href="/" className={pathname === "/" ? "font-bold underline" : ""}>
              main
            </Link>
          </li>
          <li>
            <Link
              href="/favorites"
              className={pathname === "/favorites" ? "font-bold underline" : ""}
            >
              favorites
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
