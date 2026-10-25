"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { getRoleNameInBangla } from "@/constants/navigation";
import { getFileUrl } from "@/lib/api/auth";

export default function NavbarUserNav() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="hidden sm:flex items-center gap-2">
        <div className="h-9 w-20 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-9 w-24 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="hidden sm:flex items-center gap-2 sm:gap-3">
        {/* Dashboard Shortcut */}
        <Link href={`/dashboard/${user.role}`}>
          <Button
            size="sm"
            className="bg-linear-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all gap-1.5 px-3.5 py-2 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">ড্যাশবোর্ড</span>
          </Button>
        </Link>

        {/* User Pill */}
        <Link
          href={`/dashboard/${user.role}/profile`}
          title="প্রোফাইল দেখুন"
          className="hidden lg:flex items-center gap-2.5 px-2 py-1 rounded-xl hover:bg-gray-100/70 transition group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-emerald-500 to-green-700 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0 overflow-hidden">
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
              <User className="w-4 h-4" />
            )}
          </div>

          <div className="leading-tight pr-1">
            <p className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 truncate max-w-[120px] transition-colors">
              {user.name}
            </p>
            <span className="text-[10px] font-medium text-gray-500">
              {getRoleNameInBangla(user.role)}
            </span>
          </div>
        </Link>

        {/* Logout */}
        <button
          onClick={logout}
          aria-label="লগআউট"
          title="লগআউট"
          className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-2">
      <Link href="/login">
        <Button
          variant="outline"
          size="sm"
          className="border-gray-200 hover:border-emerald-500 text-gray-700 hover:text-emerald-700 font-semibold rounded-xl px-4 py-2 transition"
        >
          লগইন
        </Button>
      </Link>

      <Link href="/register">
        <Button
          size="sm"
          className="bg-linear-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition px-4 py-2 cursor-pointer"
        >
          অ্যাকাউন্ট খুলুন
        </Button>
      </Link>
    </div>
  );
}
