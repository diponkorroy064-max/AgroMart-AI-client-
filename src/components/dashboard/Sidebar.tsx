'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  X,
  PanelLeftClose,
  Store,
  Heart,
  User,
  Boxes,
  FolderTree,
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import { useAuth } from '@/contexts/AuthContext';
import { getRoleNameInBangla } from '@/constants/navigation';
import { getFileUrl } from './ProfileEditModal';

export interface SidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen?: boolean;
  setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  // Backwards compatibility props
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  sidebarOpen: propSidebarOpen,
  setSidebarOpen: propSetSidebarOpen,
  mobileOpen: propMobileOpen,
  setMobileOpen: propSetMobileOpen,
  open: legacyOpen,
  setOpen: legacySetOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Normalize props for backward compatibility
  const isDesktopOpen = propSidebarOpen !== undefined ? propSidebarOpen : legacyOpen ?? true;
  const setDesktopOpen = propSetSidebarOpen || legacySetOpen || (() => {});
  const isMobileOpen = propMobileOpen !== undefined ? propMobileOpen : legacyOpen ?? false;
  const setMobileOpen = propSetMobileOpen || legacySetOpen || (() => {});

  const getSidebarItems = () => {
    switch (user?.role) {
      case 'farmer':
        return [
          {
            href: '/dashboard/farmer',
            icon: LayoutDashboard,
            label: 'ড্যাশবোর্ড ওভারভিউ',
          },
          {
            href: '/dashboard/farmer/orders',
            icon: ShoppingCart,
            label: 'আমার ক্রয়কৃত অর্ডার',
          },
          {
            href: '/dashboard/farmer/favorites',
            icon: Heart,
            label: 'প্রিয় পণ্যসমূহ',
          },
          {
            href: '/dashboard/farmer/profile',
            icon: Users,
            label: 'খামারি প্রোফাইল',
          },
        ];

      case 'seller':
        return [
          {
            href: '/dashboard/seller',
            icon: LayoutDashboard,
            label: 'বিক্রেতা ড্যাশবোর্ড',
          },
          {
            href: '/dashboard/seller/products',
            icon: Package,
            label: 'আমার বিক্রয় পণ্য',
          },
          {
            href: '/dashboard/seller/inventory',
            icon: Boxes,
            label: 'ইনভেন্টরি ম্যানেজমেন্ট',
          },
          {
            href: '/dashboard/seller/orders',
            icon: ShoppingCart,
            label: 'ক্রেতাদের অর্ডার',
          },
          {
            href: '/dashboard/seller/profile',
            icon: Users,
            label: 'দোকান ও প্রোফাইল',
          },
        ];

      case 'admin':
        return [
          {
            href: '/dashboard/admin',
            icon: LayoutDashboard,
            label: 'অ্যাডমিন কন্ট্রোল',
          },
          {
            href: '/dashboard/admin/inventory',
            icon: Boxes,
            label: 'ইনভেন্টরি পর্যবেক্ষণ',
          },
          {
            href: '/dashboard/admin/categories',
            icon: FolderTree,
            label: 'ক্যাটাগরি ও সাব-ক্যাটাগরি',
          },
          {
            href: '/dashboard/admin/users',
            icon: Users,
            label: 'ব্যবহারকারী তালিকা',
          },
          {
            href: '/dashboard/admin/products',
            icon: Package,
            label: 'পণ্য যাচাই ও নিয়ন্ত্রণ',
          },
          {
            href: '/dashboard/admin/orders',
            icon: ShoppingCart,
            label: 'সকল গ্রাহক অর্ডার',
          },
          {
            href: '/dashboard/admin/profile',
            icon: User,
            label: 'প্রোফাইল',
          },
        ];

      default:
        return [
          {
            href: '/dashboard/farmer',
            icon: LayoutDashboard,
            label: 'ড্যাশবোর্ড',
          },
          {
            href: '/products',
            icon: Package,
            label: 'সকল পণ্য',
          },
        ];
    }
  };

  const sidebarItems = getSidebarItems();

  // Shared inner content of the fixed sidebar (Height is 100% full with scrollable navigation)
  const renderSidebarContent = (isMobile: boolean = false) => (
    <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 select-none">
      {/* 1. Clean Top Header with Section Title & Collapse/Close Button (No duplicate logo) */}
      <div className="h-16 px-4 border-b border-gray-200/80 dark:border-gray-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 tracking-wide">
            ড্যাশবোর্ড নেভিগেশন
          </span>
        </div>

        {/* Toggle / Close Button */}
        {isMobile ? (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition cursor-pointer"
            aria-label="সাইডবার বন্ধ করুন"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setDesktopOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition cursor-pointer"
            aria-label="সাইডবার লুকান"
            title="সাইডবার লুকান"
          >
            <PanelLeftClose className="w-4.5 h-4.5" />
          </button>
        )}
      </div>

      {/* 2. User Info Card */}
      <div className="p-3.5 shrink-0">
        <div className="p-3 rounded-2xl bg-linear-to-br from-emerald-50/80 via-teal-50/40 to-emerald-50/30 dark:from-gray-800 dark:via-gray-800 dark:to-emerald-950/20 border border-emerald-100/80 dark:border-gray-700/80 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center font-bold text-sm shadow-xs ring-2 ring-emerald-300 dark:ring-emerald-700 overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={getFileUrl(user.avatar)}
                    alt={user.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  'U'
                )}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                {user?.name || 'সম্মানিত ব্যবহারকারী'}
              </h4>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full inline-block">
                  {getRoleNameInBangla(user?.role)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Links (Scrollable middle section) */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <div className="px-3 py-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          মূল মেন্যু
        </div>

        {sidebarItems.map((item) => {
          const active =
            item.href === `/dashboard/${user?.role}`
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={<item.icon size={18} />}
              isActive={active}
              onClick={() => isMobile && setMobileOpen(false)}
            />
          );
        })}

        <div className="pt-4 px-3 py-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          মার্কেটপ্লেস
        </div>

        {/* Back to main store */}
        <SidebarItem
          href="/"
          label="মূল মার্কেটপ্লেস"
          icon={<Store size={18} />}
          isActive={false}
          onClick={() => isMobile && setMobileOpen(false)}
        />
        <SidebarItem
          href="/products"
          label="সকল পণ্যসমূহ"
          icon={<Package size={18} />}
          isActive={false}
          onClick={() => isMobile && setMobileOpen(false)}
        />
      </div>

      {/* 4. Logout Footer (Firmly pinned at the bottom of the full-height sidebar) */}
      <div className="p-3.5 border-t border-gray-200/80 dark:border-gray-800 shrink-0 bg-white dark:bg-gray-900">
        <button
          type="button"
          onClick={() => logout()}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-red-50 hover:bg-red-100/80 dark:bg-red-950/30 dark:hover:bg-red-900/40 py-2.5 px-3 font-semibold text-xs text-red-600 dark:text-red-400 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          <span>লগআউট করুন</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer (Left Slide-in, full height) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] h-screen shadow-2xl lg:hidden transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {renderSidebarContent(true)}
      </aside>

      {/* Desktop Fixed Full-Height Sidebar (Stays fixed at left: 0, height: 100vh) */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 bottom-0 h-screen z-40 w-64 xl:w-72 bg-white dark:bg-gray-900 border-r border-gray-200/80 dark:border-gray-800 transition-transform duration-300 ease-in-out ${
          isDesktopOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
      >
        {renderSidebarContent(false)}
      </aside>
    </>
  );
}
