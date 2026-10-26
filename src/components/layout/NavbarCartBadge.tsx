"use client";
import { useMemo } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function NavbarCartBadge() {
  const { state } = useCart();

  const totalQuantity = useMemo(() => {
    return state?.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
  }, [state?.items]);

  return (
    <Link
      href="/cart"
      aria-label="Shopping Cart"
      className="relative p-2.5 rounded-2xl bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-all duration-200 border border-gray-200/70 hover:border-emerald-300 shadow-xs group"
    >
      <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />

      {totalQuantity > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1.5 flex items-center justify-center text-[11px] font-extrabold text-white bg-linear-to-r from-emerald-600 to-green-500 rounded-full shadow-md animate-pulse">
          {totalQuantity > 99 ? "99+" : totalQuantity}
        </span>
      )}
    </Link>
  );
}
