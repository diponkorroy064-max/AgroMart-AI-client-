"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, User, Leaf, Menu, X, LayoutDashboard, LogOut } from "lucide-react";


export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Products",
      href: "/products",
    },
    // {
    //   title: "Categories",
    //   href: "/categories",
    // },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  const activeClass = (href: string) =>
    pathname === href
      ? "text-green-600 font-semibold"
      : "text-gray-700 hover:text-green-600";

  
  if (loading) {
    return (
      <header className="sticky top-0 z-1000 bg-white border-b">
        <div className="container mx-auto h-16 flex items-center justify-between px-4 py-5">
          <div className="h-8 w-36 bg-gray-200 rounded animate-pulse" />

          <div className="hidden md:flex gap-6">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="flex gap-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </header>
    );
  }


  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">

        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />

            <span className="text-2xl font-bold text-green-700">
              AgroMart AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${activeClass(item.href)} transition`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            <Link href="/cart">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>

            {user ? (
              <>
                <Link href={`/dashboard/${user?.role}`}>
                  <Button className="gap-2">
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Button>
                </Link>

                <div className="hidden md:flex items-center gap-2 rounded-full border bg-gray-50 px-4 py-2">
                  <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
                    <User
                      size={18}
                      className="text-green-700"/>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {user?.name}
                    </p>

                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  onClick={logout}
                  className="gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button>
                    Register
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden border-t py-5 space-y-4">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className={`block ${activeClass(item.href)}`}>
                {item.title}
              </Link>
            ))}

          </div>
        )}
      </div>
    </header>
  );
}
