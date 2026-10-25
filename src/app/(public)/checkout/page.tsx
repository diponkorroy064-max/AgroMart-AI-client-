import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "চেকআউট | AgroMart AI",
  description:
    "আপনার ডেলিভারি তথ্য নিশ্চিত করুন এবং অ্যাগ্রোমার্ট থেকে দ্রুত ও নিরাপদে কেনাকাটা সম্পন্ন করুন।",
  openGraph: {
    title: "চেকআউট | AgroMart AI",
    description: "নিরাপদ ডিজিটাল ও ক্যাশ অন ডেলিভারি পেমেন্টে কেনাকাটা করুন।",
    type: "website",
  },
};

export default function CheckoutPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-6xl">
        {/* Minimalist Header */}
        <header className="mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 border border-emerald-100 dark:border-emerald-900">
            অর্ডার কনফার্মেশন
          </span>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            অর্ডার ও ডেলিভারি তথ্য
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            সঠিক ডেলিভারির জন্য আপনার প্রয়োজনীয় ঠিকানা ও যোগাযোগের বিবরণ পূরণ করুন।
          </p>
        </header>

        {/* Interactive Checkout View */}
        <CheckoutView />
      </main>
    </div>
  );
}
