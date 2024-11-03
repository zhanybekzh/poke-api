"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="container flex flex-col justify-center mb-3 mx-auto">
      <Image
        src="/images/pokeapi.png"
        alt="Pokeapi logo"
        width={300} 
        height={150}
        className="mt-3 mx-auto mb-4"
      />
      <nav>
        <ul className="flex gap-3">
          <li>
            <Link
              href="/"
              className={pathname === "/" ? "font-bold underline" : ""}
            >
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
