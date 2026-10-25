"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS, type NavItem } from "@/constants/navigation";

export type { NavItem };
export { NAV_ITEMS };

export default function NavbarLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative px-3 py-2 text-sm transition-colors duration-200 flex items-center gap-1.5 ${
              isActive
                ? "text-green-600 font-bold"
                : "text-gray-600 font-medium hover:text-green-600"
            }`}
          >
            <span>{item.title}</span>

            {item.badge && (
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-xs animate-pulse">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
