'use client';

import React from 'react';
import Link from 'next/link';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  href,
  icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        group
        relative
        flex
        items-center
        gap-3
        rounded-xl
        px-3.5
        py-2.5
        font-medium
        text-sm
        transition-all
        duration-200
        ${isActive
          ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs dark:bg-emerald-950/60 dark:text-emerald-300'
          : 'text-gray-600 hover:bg-gray-100/80 hover:text-emerald-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400'
        }
      `}>
      {isActive && (
        <span className="absolute left-0 top-1.5 bottom-1.5 w-1.5 rounded-r-full bg-emerald-600 dark:bg-emerald-500 shadow-sm" />
      )}

      <span
        className={`transition-colors shrink-0 ${
          isActive
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-gray-500 group-hover:text-emerald-600 dark:text-gray-400 dark:group-hover:text-emerald-400'
        }`}
      >
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </Link>
  );
};

export default SidebarItem;

