"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { IProduct } from "@/types/Product";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { FavoriteButton } from "@/components/products/FavoriteButton";

interface ProductAddToCartProps {
  product: IProduct;
}

export function ProductAddToCart({ product }: ProductAddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { user, token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const maxAvailable =
    product.availableStock !== undefined
      ? product.availableStock
      : product.quantity || 0;
  const isExpired = Boolean(product.isExpired);
  const isOutOfStock = maxAvailable <= 0 || isExpired;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    // Redirect to login page if farmer/buyer is not logged in
    if (!user || !token) {
      const redirectUrl = pathname
        ? `/login?redirect=${encodeURIComponent(pathname)}`
        : `/login?redirect=${encodeURIComponent(`/products/${product._id}`)}`;
      router.push(redirectUrl);
      return;
    }

    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Stock Availability Info Text */}
      <div>
        {isExpired ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            ⚠ মেয়াদোত্তীর্ণ পণ্য: গ্রাহক সুরক্ষার্থে এই পণ্যটির ক্রয় অনুপলব্ধ রাখা হয়েছে।
          </span>
        ) : isOutOfStock ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
            স্টক শূন্য: বর্তমানে এই পণ্যটি স্টকে নেই।
          </span>
        ) : maxAvailable <= (product.lowStockThreshold || 5) ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            স্বল্প স্টক: আর মাত্র {maxAvailable} {product.unit || 'টি'} অবশিষ্ট আছে!
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            ✓ স্টকে উপলব্ধ: {maxAvailable} {product.unit || 'টি'}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Quantity Counter */}
        <div className="inline-flex items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-1">
          <button
            type="button"
            aria-label="কমান"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={quantity <= 1 || isOutOfStock}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white">
            {quantity}
          </span>

          <button
            type="button"
            aria-label="বাড়ান"
            onClick={() =>
              setQuantity((prev) => Math.min(maxAvailable, prev + 1))
            }
            disabled={quantity >= maxAvailable || isOutOfStock}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add To Cart CTA Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            isExpired
              ? "bg-gray-400 text-white cursor-not-allowed"
              : added
              ? "bg-emerald-800 text-white"
              : "bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
          }`}
        >
          {isExpired ? (
            "মেয়াদ শেষ (ক্রয় অনুপলব্ধ)"
          ) : isOutOfStock ? (
            "স্টক শেষ"
          ) : added ? (
            <>
              <Check className="w-4 h-4" /> কার্টে যোগ হয়েছে!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> কার্টে যোগ করুন
            </>
          )}
        </button>

        {/* Favorite Button */}
        <FavoriteButton productId={product._id} showLabel={true} />
      </div>
    </div>
  );
}
