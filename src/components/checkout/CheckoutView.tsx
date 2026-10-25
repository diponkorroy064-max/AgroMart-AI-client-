"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  ShoppingBag,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { createOrder } from "@/lib/api/order";
import { IOrder } from "@/types/Order";

interface CheckoutField {
  name: "name" | "phone" | "district" | "address";
  label: string;
  type: "text" | "tel";
  placeholder: string;
  required: boolean;
}

const checkoutFields: CheckoutField[] = [
  {
    name: "name",
    label: "আপনার পূর্ণ নাম",
    type: "text",
    placeholder: "যেমন: মোঃ রফিকুল ইসলাম",
    required: true,
  },
  {
    name: "phone",
    label: "সচল মোবাইল নম্বর",
    type: "tel",
    placeholder: "০১৭xxxxxxxx",
    required: true,
  },
  {
    name: "district",
    label: "জেলা",
    type: "text",
    placeholder: "যেমন: বগুড়া, রংপুর, দিনাজপুর, ঢাকা",
    required: true,
  },
  {
    name: "address",
    label: "সম্পূর্ণ ডেলিভারি ঠিকানা (গ্রাম / পাড়া / বাড়ি নম্বর)",
    type: "text",
    placeholder: "যেমন: শান্তিনগর, ডাকঘর- শেরপুর",
    required: true,
  },
];

const trustBadges = [
  { icon: ShieldCheck, text: "ক্যাশ অন ডেলিভারি: পণ্য হাতে পেয়ে টাকা পরিশোধ করুন" },
  { icon: Truck, text: "সারা দেশে নিরাপদ ও দ্রুত হোম ডেলিভারি সেবা" },
];

export function CheckoutView() {
  const { state, getCartTotal, clearCart } = useCart();
  const { user, token } = useAuth();

  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<IOrder | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    note: "",
  });

  // Automatically pre-fill form data if farmer is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        phone: prev.phone || user.phone || "",
        address: prev.address || user.address || "",
      }));
    }
  }, [user]);

  const cartItems = state.items;
  const subtotal = getCartTotal();
  const deliveryFee = cartItems.length > 0 ? 80 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!token) {
      setErrorMessage("অর্ডার সম্পন্ন করতে অনুগ্রহ করে প্রথমে আপনার কৃষক অ্যাকাউন্টে লগইন করুন।");
      return;
    }

    if (!formData.name || !formData.phone || !formData.address || !formData.district) {
      setErrorMessage("অনুগ্রহ করে প্রয়োজনীয় তথ্যগুলো (নাম, মোবাইল নম্বর, জেলা ও ঠিকানা) পূরণ করুন।");
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage("আপনার কার্টে কোনো পণ্য নেই।");
      return;
    }

    try {
      setIsSubmitting(true);

      const orderItems = cartItems.map((item) => ({
        productId: String(item._id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || "",
      }));

      const payload = {
        items: orderItems,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          district: formData.district,
          address: formData.address,
          note: formData.note,
        },
        paymentMethod: "cod" as const,
        note: formData.note,
      };

      const res = await createOrder(payload, token);

      if (res.success && res.order) {
        setConfirmedOrder(res.order);
        setIsOrdered(true);
        clearCart();
      } else {
        throw new Error(res.message || "অর্ডার সম্পন্ন করতে সমস্যা হয়েছে");
      }
    } catch (err: any) {
      console.error("Order submission error:", err);
      setErrorMessage(err.message || "অর্ডার সম্পন্ন করা সম্ভব হয়নি, পুনরায় চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClasses =
    "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-850 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all";

  // 1. Order Success State
  if (isOrdered) {
    const orderNumber = confirmedOrder?.orderNumber || "ORD-SUCCESS";

    return (
      <div className="max-w-lg mx-auto py-12 sm:py-16 text-center">
        <div className="bg-white dark:bg-gray-800/60 rounded-3xl border border-gray-200/80 dark:border-gray-700/80 p-8 sm:p-10 shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
            অর্ডার নং: {orderNumber}
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            অর্ডারটি সফলভাবে গৃহীত হয়েছে!
          </h2>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            ধন্যবাদ! পণ্যটি ক্যাশ অন ডেলিভারিতে পাঠানো হচ্ছে। আমাদের প্রতিনিধি শীঘ্রই আপনার মোবাইল নম্বরে ({formData.phone}) যোগাযোগ করবেন।
          </p>

          <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-900/70 p-5 text-left text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2 border border-gray-100 dark:border-gray-800">
            <p>
              <strong className="text-gray-900 dark:text-white">প্রাপক:</strong> {formData.name}
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">ঠিকানা:</strong> {formData.address}, {formData.district}
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">পেমেন্ট পদ্ধতি:</strong>{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে পরিশোধ)
              </span>
            </p>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-baseline font-bold text-gray-900 dark:text-white">
              <span>সর্বমোট প্রদেয় মূল্য:</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-base font-black">
                ৳ {grandTotal}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard/farmer/orders"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white py-3 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              আমার অর্ডার ট্র্যাক করুন
            </Link>
            <Link
              href="/products"
              className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 py-3 rounded-xl text-xs sm:text-sm font-semibold transition"
            >
              মার্কেটপ্লেসে ফিরুন
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Empty Cart Guard
  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 sm:py-24">
        <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center mx-auto mb-5 shadow-2xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          আপনার কার্ট বর্তমানে খালি!
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">
          চেকআউট সম্পন্ন করার আগে অনুগ্রহ করে মার্কেটপ্লেস থেকে আপনার পছন্দের বীজ, সার বা কৃষি যন্ত্রপাতি কার্টে যোগ করুন।
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          পণ্যসমূহ ব্রাউজ করুন
        </Link>
      </div>
    );
  }

  // 3. Checkout Form View
  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> কার্টে ফিরে যান
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          অর্ডার ও ক্যাশ অন ডেলিভারি তথ্য
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন। কোনো অনলাইন পেমেন্ট গেটওয়ের প্রয়োজন নেই।
        </p>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
          {!token && (
            <Link
              href="/login"
              className="ml-auto underline font-bold whitespace-nowrap"
            >
              লগইন করুন →
            </Link>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Delivery Details & Payment Method (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Delivery Address Form */}
          <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
              ১. ডেলিভারির ঠিকানা প্রদান করুন
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {checkoutFields.map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {field.label}{" "}
                    {field.required && (
                      <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    )}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={inputBaseClasses}
                  />
                </div>
              ))}
            </div>

            {/* Delivery Note Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="note"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300"
              >
                বিশেষ ডেলিভারি নির্দেশনা (ঐচ্ছিক)
              </label>
              <textarea
                id="note"
                name="note"
                rows={2}
                placeholder="যেমন: সকাল ১০টার পর ডেলিভারি দিন..."
                value={formData.note}
                onChange={handleInputChange}
                className={`${inputBaseClasses} resize-y`}
              />
            </div>
          </div>

          {/* Section 2: Cash on Delivery Payment Method */}
          <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
              ২. পেমেন্ট পদ্ধতি (Payment Method)
            </h2>

            <div className="p-4 rounded-xl border-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                  ক্যাশ অন ডেলিভারি (Cash on Delivery)
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
                  অর্ডার করতে কোনো অগ্রিম পেমেন্ট বা অনলাইন গেটওয়ে লাগবে না। পণ্যটি আপনার ঠিকানায় পৌঁছানোর পর দেখে মূল্য পরিশোধ করুন।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Placement (5 cols) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-7 shadow-2xs">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
              অর্ডারের সারসংক্ষেপ
            </h2>

            {/* Itemized Cart List */}
            <div className="max-h-56 overflow-y-auto space-y-2.5 mb-4 pr-1 divide-y divide-gray-100 dark:divide-gray-800/60">
              {cartItems.map((item) => (
                <div
                  key={String(item._id)}
                  className="flex justify-between items-center text-xs sm:text-sm pt-2 first:pt-0"
                >
                  <div className="pr-3 min-w-0">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.quantity} × ৳ {item.price}
                    </p>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white shrink-0">
                    ৳ {(item.price || 0) * (item.quantity || 1)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="flex justify-between">
                <span>উপমোট:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ৳ {subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>হোম ডেলিভারি চার্জ:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ৳ {deliveryFee}
                </span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between items-baseline font-bold text-gray-900 dark:text-white">
                <span className="text-sm sm:text-base">সর্বমোট প্রদেয়:</span>
                <span className="text-lg sm:text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  ৳ {grandTotal}
                </span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-xl py-3.5 text-sm font-semibold transition-all shadow-xs cursor-pointer flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  অর্ডার সম্পন্ন হচ্ছে...
                </>
              ) : (
                <>
                  অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 space-y-2">
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
      </form>
    </div>
  );
}
