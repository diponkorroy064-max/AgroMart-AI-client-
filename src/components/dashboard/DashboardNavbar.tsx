'use client';

import React from 'react';
import Link from 'next/link';
import {
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Leaf,
  Store,
  ExternalLink,
  Bell,
  LogOut,
  User as UserIcon,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getRoleNameInBangla } from '@/constants/navigation';
import { getFileUrl } from './ProfileEditModal';

export interface DashboardNavbarProps {
  sidebarOpen: boolean;
  mobileOpen?: boolean;
  onToggleSidebar: () => void;
  className?: string;
}

export default function DashboardNavbar({
  sidebarOpen,
  mobileOpen = false,
  onToggleSidebar,
  className = '',
}: DashboardNavbarProps) {
  const { user, logout } = useAuth();

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'farmer':
        return { label: 'কৃষক প্যানেল', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'seller':
        return { label: 'বিক্রেতা হাব', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'admin':
        return { label: 'অ্যাডমিন সেন্টার', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      default:
        return { label: 'ড্যাশবোর্ড', color: 'bg-gray-100 text-gray-700 border-gray-200' };
    }
  };

  const roleBadge = getRoleBadge(user?.role);

  return (
    <header
      className={`sticky top-0 z-30 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 shadow-xs transition-colors duration-200 ${className}`}
    >
      <div className="w-full px-3 sm:px-5 lg:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left Section: Sidebar Toggle Button & Brand Info */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          {/* Main Sidebar Toggle Button (Requested: Button to keep sidebar visible/hidden) */}
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? 'সাইডবার লুকান' : 'সাইডবার দেখান'}
            title={sidebarOpen ? 'সাইডবার লুকান' : 'সাইডবার দেখান'}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl border border-gray-200/90 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 hover:bg-emerald-50 hover:border-emerald-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-emerald-700 dark:hover:text-emerald-400 shadow-xs transition-all duration-200 cursor-pointer group shrink-0"
          >
            {/* Responsive Icon: On mobile shows Menu/Toggle, on desktop shows Panel collapse/open */}
            <span className="lg:hidden">
              <Menu className="w-5 h-5 group-hover:scale-105 transition-transform" />
            </span>
            <span className="hidden lg:inline-flex">
              {sidebarOpen ? (
                <PanelLeftClose className="w-5 h-5 group-hover:scale-105 transition-transform" />
              ) : (
                <PanelLeftOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform" />
              )}
            </span>

            {/* Accessible Text Label for Desktop */}
            <span className="hidden md:inline text-xs font-semibold select-none">
              {sidebarOpen ? 'সাইডবার লুকান' : 'সাইডবার দেখান'}
            </span>
          </button>

          {/* Single Official AgroMart AI Brand Logo linking to Home Page */}
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 group shrink-0"
              title="AgroMart AI হোমপেজে যান"
              aria-label="AgroMart AI হোমপেজ"
            >
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Leaf className="w-4 h-4 text-emerald-100" />
              </div>
              <span className="font-extrabold text-gray-900 dark:text-white tracking-tight hidden sm:inline text-base">
                AgroMart <span className="text-emerald-600 dark:text-emerald-400">AI</span>
              </span>
            </Link>

            {/* Role Badge Indicator */}
            <span
              className={`hidden sm:inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full border ${roleBadge.color}`}
            >
              {roleBadge.label}
            </span>
          </div>
        </div>

        {/* Center / Middle: Direct link to visit the main website / store */}
        <div className="hidden md:flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-emerald-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-200 text-xs font-semibold shadow-xs transition-all duration-200 group"
            title="মূল ওয়েবসাইটে ফিরে যান"
          >
            <Store className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>মূল মার্কেটপ্লেস</span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {/* Right Section: Notification, User Profile & Quick Logout */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Store Shortcut for Mobile */}
          <Link
            href="/"
            className="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 transition"
            title="মূল মার্কেটপ্লেস"
            aria-label="মূল মার্কেটপ্লেস"
          >
            <Store className="w-4.5 h-4.5" />
          </Link>

          {/* Notifications Icon */}
          <button
            type="button"
            aria-label="বিজ্ঞপ্তি"
            title="বিজ্ঞপ্তি"
            className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse" />
          </button>

          {/* User Profile Chip */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-green-700 text-white flex items-center justify-center font-bold text-xs shadow-xs border border-emerald-300 dark:border-emerald-600 shrink-0 overflow-hidden">
              {user?.avatar ? (
                <img
                  src={getFileUrl(user.avatar)}
                  alt={user.name || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : user?.name ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <UserIcon className="w-4 h-4" />
              )}
            </div>

            <div className="hidden lg:flex flex-col min-w-0 pr-1">
              <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[120px] leading-tight">
                {user?.name || 'সম্মানিত ব্যবহারকারী'}
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 leading-tight">
                {getRoleNameInBangla(user?.role)}
              </span>
            </div>
          </div>

          {/* Quick Logout Button */}
          <button
            type="button"
            onClick={logout}
            aria-label="লগআউট"
            title="লগআউট করুন"
            className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer shrink-0"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
