import React from "react";
import Link from "next/link";
import { Leaf, Phone, Truck, Search } from "lucide-react";
import { SITE_HOTLINE, SITE_HOTLINE_HOURS } from "@/constants/navigation";
import NavbarLinks from "./NavbarLinks";
import NavbarCartBadge from "./NavbarCartBadge";
import NavbarUserNav from "./NavbarUserNav";
import NavbarMobileMenu from "./NavbarMobileMenu";

export default function Navbar() {
  return (
    <>
      {/* 1. Top Announcement & Hotline Strip (Visible at top of page, scrolls out of view) */}
      <div className="w-full bg-linear-to-r from-emerald-900 via-green-800 to-teal-900 text-white text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-emerald-800/60">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-100 font-medium text-center sm:text-left text-[11px] sm:text-xs">
            <span className="hidden sm:inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full text-[10px] text-emerald-200 shrink-0">
              <Truck className="w-3 h-3 text-emerald-300" />
              ৬৪ জেলায় ক্যাশ অন ডেলিভারি
            </span>
            <span className="line-clamp-1 sm:line-clamp-none">
              🌾 ফসলের বীজ, জৈব সার ও খামার সরঞ্জাম ক্রয়ে সর্বোচ্চ ছাড়!
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-emerald-200 text-[10px] sm:text-[11px] font-semibold">
            <div className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>কৃষি হটলাইন: {SITE_HOTLINE}</span>
            </div>
            <span className="hidden md:inline text-emerald-400/60">•</span>
            <span className="hidden md:inline">{SITE_HOTLINE_HOURS}</span>
          </div>
        </div>
      </div>

      {/* 2. Main Glassmorphism Navbar (Sticky at top: 0 during scrolling) */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-emerald-100/80 shadow-xs transition-colors duration-200">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex h-15 sm:h-18 items-center justify-between gap-2 sm:gap-4">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 group shrink-0 min-w-0"
              aria-label="AgroMart AI Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-linear-to-br from-emerald-600 via-green-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/25 group-hover:scale-105 transition-transform duration-300 shrink-0">
                <Leaf className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-100" />
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-gray-900 group-hover:text-emerald-800 transition">
                    AgroMart
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-linear-to-r from-emerald-600 to-green-600 text-white tracking-wider shadow-xs">
                    AI
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 -mt-1 hidden sm:block tracking-wide">
                  স্মার্ট কৃষি মার্কেটপ্লেস
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Client leaf for active state) */}
            <NavbarLinks />

            {/* Right Action Tools */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Quick Search Shortcut */}
              <Link
                href="/products"
                title="পণ্য খুঁজুন"
                aria-label="Search Products"
                className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 border border-gray-200/70 hover:border-emerald-300 shadow-xs transition group"
              >
                <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </Link>

              {/* Shopping Cart Icon with Live Badge (Client Leaf) */}
              <NavbarCartBadge />

              {/* User Authentication & Dashboard Controls (Client Leaf, visible sm+) */}
              <NavbarUserNav />

              {/* Mobile Menu Hamburger (Client Leaf) */}
              <NavbarMobileMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
