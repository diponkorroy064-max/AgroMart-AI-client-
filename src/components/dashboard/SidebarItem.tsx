'use client';

import Link from 'next/link';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarItem = ({
  href,
  icon,
  label,
  isActive,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`
        group
        relative
        flex
        items-center
        gap-3
        rounded-xl
        px-5
        py-3
        font-medium
        transition-all
        duration-200

        ${isActive
          ? 'bg-green-100 text-green-700 shadow-sm'
          : 'text-gray-600 hover:bg-gray-100 hover:text-green-700'
        }
      `}>
      {isActive && (
        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-green-600" />
      )}

      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default SidebarItem;
