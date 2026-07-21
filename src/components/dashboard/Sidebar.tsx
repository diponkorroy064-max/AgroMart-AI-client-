'use client';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import { useAuth } from '@/contexts/AuthContext';


interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ open }: SidebarProps) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const getSidebarItems = () => {
    switch (user?.role) {
      case 'farmer':
        return [
          {
            href: '/dashboard/farmer',
            icon: LayoutDashboard,
            label: 'Dashboard',
          },
          {
            href: '/dashboard/farmer/products',
            icon: Package,
            label: 'My Products',
          },
          {
            href: '/dashboard/farmer/orders',
            icon: ShoppingCart,
            label: 'Orders',
          },
          {
            href: '/dashboard/farmer/profile',
            icon: Users,
            label: 'Profile',
          },
        ];

      case 'seller':
        return [
          {
            href: '/dashboard/seller',
            icon: LayoutDashboard,
            label: 'Dashboard',
          },
          {
            href: '/dashboard/seller/products',
            icon: Package,
            label: 'My Products',
          },
          {
            href: '/dashboard/seller/orders',
            icon: ShoppingCart,
            label: 'Orders',
          },
          {
            href: '/dashboard/seller/profile',
            icon: Users,
            label: 'Profile',
          },
        ];

      case 'admin':
        return [
          {
            href: '/dashboard/admin',
            icon: LayoutDashboard,
            label: 'Dashboard',
          },
          {
            href: '/dashboard/admin/users',
            icon: Users,
            label: 'Users',
          },
          {
            href: '/dashboard/admin/products',
            icon: Package,
            label: 'Products',
          },
          {
            href: '/dashboard/admin/orders',
            icon: ShoppingCart,
            label: 'Orders',
          },
        ];

      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <aside className={`
    fixed lg:sticky top-16 left-0 z-50 h-screen w-60 bg-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

      {/* Logo */}
      {/* <div className="border-b px-8 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-green-600 to-emerald-500 shadow-lg">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              AgroMart AI
            </h2>

            <p className="text-sm text-gray-500">
              Dashboard
            </p>
          </div>
        </div>
      </div> */}

      {/* User */}
      <div className="border-b p-6">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/150"
            alt="user"
            className="h-14 w-14 rounded-full border-2 border-green-500 object-cover"
          />

          <div>
            <h3 className="font-semibold">
              {user?.name}
            </h3>
            <p className="text-sm capitalize text-green-600">
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        {sidebarItems.map((item) => {

          const active =
            item.href === `/dashboard/${user?.role}`
              ? pathname === item.href // Dashboard only
              : pathname.startsWith(item.href);

          return (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={<item.icon size={20} />}
              isActive={active}
            />
          );
        })}

      </nav>

      {/* Logout */}
      <div className="border-t p-5">
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-50 py-3 font-medium text-red-600 transition hover:bg-red-100">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

