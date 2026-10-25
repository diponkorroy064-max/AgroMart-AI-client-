"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
} from "lucide-react";
import { useCart, CartItem } from "@/contexts/CartContext";

const trustBadges = [
  { icon: ShieldCheck, text: "শতভাগ নিরাপদ পেমেন্ট গ্যারান্টি" },
  { icon: Truck, text: "সারা দেশে দ্রুত হোম ডেলিভারি" },
  { icon: RotateCcw, text: "সহজ রিটার্ন ও রিফান্ড সুবিধা" },
];

export function CartView() {
  const { state, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const cartItems = state.items;

  const subtotal = getCartTotal();
  const deliveryFee = cartItems.length > 0 ? 80 : 0;
  const grandTotal = subtotal + deliveryFee;

  const summaryItems = [
    { label: "পণ্যের উপ-মোট", value: `৳ ${subtotal}` },
    {
      label: "হোম ডেলিভারি চার্জ",
      value: deliveryFee === 0 ? "ফ্রি" : `৳ ${deliveryFee}`,
    },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 sm:py-24">
        <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center mx-auto mb-6 shadow-2xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          আপনার কার্ট বর্তমানে খালি
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">
          আপনার কার্টে কোনো পণ্য যোগ করা হয়নি। উন্নত বীজ, সার বা তাজা কৃষিপণ্য বেছে নিতে মার্কেটপ্লেস ঘুরে দেখুন।
        </p>
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            পণ্যসমূহ দেখুন
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      {/* Left: Cart Items List (7 or 8 columns) */}
      <div className="lg:col-span-8 space-y-4">
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
          {cartItems.map((item: CartItem) => {
            const itemTotal = (item.price || 0) * (item.quantity || 1);

            return (
              <div
                key={String(item._id)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/40"
              >
                {/* Thumbnail & Product Details */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200/70 dark:border-gray-700/70 shrink-0">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      ৳ {item.price} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">/ ইউনিট</span>
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Item Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
                  {/* Quantity Counter */}
                  <div className="inline-flex items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-1">
                    <button
                      type="button"
                      aria-label="কমান"
                      onClick={() =>
                        updateQuantity(
                          String(item._id),
                          Math.max(1, (item.quantity || 1) - 1)
                        )
                      }
                      disabled={(item.quantity || 1) <= 1}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white">
                      {item.quantity || 1}
                    </span>

                    <button
                      type="button"
                      aria-label="বাড়ান"
                      onClick={() =>
                        updateQuantity(
                          String(item._id),
                          (item.quantity || 1) + 1
                        )
                      }
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-20">
                    <p className="text-base font-extrabold text-gray-900 dark:text-white">
                      ৳ {itemTotal}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    aria-label="সরিয়ে ফেলুন"
                    onClick={() => removeFromCart(String(item._id))}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                    title="পণ্যটি কার্ট থেকে সরান"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Shopping Link */}
        <div className="pt-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
          >
            ← আরও পণ্য কেনাকাটা করুন
          </Link>
        </div>
      </div>

      {/* Right: Order Summary (4 columns) */}
      <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-7 shadow-2xs">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-gray-800">
            অর্ডারের সারসংক্ষেপ
          </h2>

          {/* Pricing Breakdown (Mapped) */}
          <div className="space-y-3 text-sm">
            {summaryItems.map((item, idx) => (
              <div key={idx} className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>{item.label}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {item.value}
                </span>
              </div>
            ))}

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-baseline">
              <span className="text-base font-bold text-gray-900 dark:text-white">
                সর্বমোট প্রদেয়
              </span>
              <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                ৳ {grandTotal}
              </span>
            </div>
          </div>

          {/* Minimal Promo Code Input */}
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="কুপন কোড..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>
              <button
                type="button"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
              >
                প্রয়োগ
              </button>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="mt-6">
            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-xl py-3.5 text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              অর্ডার সম্পন্ন করতে এগিয়ে যান
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Minimal Trust Badges (Mapped) */}
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 space-y-2.5">
            {trustBadges.map((badge, idx) => {
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
                >
                  <BadgeIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
