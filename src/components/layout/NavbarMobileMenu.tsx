"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  User,
  Phone,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import {
  NAV_ITEMS,
  getRoleNameInBangla,
  SITE_HOTLINE,
} from "@/constants/navigation";
import { getFileUrl } from "@/lib/api/auth";

export default function NavbarMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [topOffset, setTopOffset] = useState(115);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const { user, logout } = useAuth();

  // Standard React hook to detect client hydration without cascading effect
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Close menu automatically whenever route changes (in-render state transition)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  // Handle position tracking, resize, escape key, and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const header = document.querySelector("header");
      if (header) {
        const rect = header.getBoundingClientRect();
        setTopOffset(Math.max(Math.round(rect.bottom), 0));
      }
    };

    updatePosition();

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      } else {
        updatePosition();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while menu is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Hamburger / Close Toggle Button */}
      <button
        onClick={toggle}
        aria-label={isOpen ? "মেন্যু বন্ধ করুন" : "মেন্যু খুলুন"}
        aria-expanded={isOpen}
        className="p-2 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition border border-gray-200/80 cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Portalled Dropdown to escape ancestor stacking contexts/backdrop-filter */}
      {mounted && isOpen && createPortal(
        <div
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden flex flex-col justify-start"
          style={{ top: `${topOffset}px` }}
        >
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-200"
            onClick={close}
            aria-hidden="true"
          />

          {/* Dropdown panel */}
          <div className="relative z-10 w-full bg-white border-b border-gray-200 shadow-2xl flex flex-col max-h-full overflow-y-auto overscroll-contain transition-all">
            <div className="p-4 sm:p-5 space-y-4 max-w-lg mx-auto w-full pb-8">
              {/* User Info if logged in */}
              {user && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-linear-to-r from-emerald-50 to-green-50 border border-emerald-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow shrink-0 overflow-hidden border border-emerald-300">
                      {user.avatar ? (
                        <img
                          src={getFileUrl(user.avatar)}
                          alt={user.name || "User"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : user.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-gray-900 truncate">
                        {user.name}
                      </p>
                      <span className="text-[11px] font-semibold text-emerald-700">
                        {getRoleNameInBangla(user.role)}
                      </span>
                    </div>
                  </div>

                  <Link href={`/dashboard/${user.role}`} onClick={close} className="shrink-0">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 text-xs">
                      <LayoutDashboard className="w-3.5 h-3.5" /> ড্যাশবোর্ড
                    </Button>
                  </Link>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-1">
                  মেন্যুসমূহ
                </p>

                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className={`flex items-center justify-between px-3.5 py-2.5 text-sm transition ${
                        isActive
                          ? "text-green-600 font-bold"
                          : "text-gray-700 font-medium hover:text-green-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-green-600" : "text-gray-400"}`} />
                        <span>{item.title}</span>
                      </div>

                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Auth Buttons for logged-out users */}
              {!user && (
                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                  <Link href="/login" onClick={close} className="w-full">
                    <Button variant="outline" className="w-full border-gray-300 py-2.5 font-semibold">
                      লগইন করুন
                    </Button>
                  </Link>
                  <Link href="/register" onClick={close} className="w-full">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 font-semibold shadow">
                      নতুন অ্যাকাউন্ট খুলুন
                    </Button>
                  </Link>
                </div>
              )}

              {/* Logout button for logged-in user */}
              {user && (
                <div className="pt-2 border-t border-gray-100">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      logout();
                      close();
                    }}
                    className="w-full gap-2 text-sm"
                  >
                    <LogOut className="w-4 h-4" /> লগআউট করুন
                  </Button>
                </div>
              )}

              {/* Helpline quick strip */}
              <a
                href={`tel:${SITE_HOTLINE}`}
                className="p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 text-center text-xs text-gray-600 hover:text-emerald-800 flex items-center justify-center gap-1.5 transition block"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>জরুরি কৃষি হটলাইন: </span>
                <span className="font-bold text-emerald-700">{SITE_HOTLINE}</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
