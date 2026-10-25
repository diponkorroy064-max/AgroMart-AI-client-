import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "শপিং কার্ট | AgroMart AI",
  description:
    "আপনার নির্বাচিত কৃষি পণ্য, বীজ ও সরঞ্জামসমূহ পর্যালোচনা করুন এবং সহজে অর্ডার নিশ্চিত করুন।",
  openGraph: {
    title: "শপিং কার্ট | AgroMart AI",
    description: "আপনার পছন্দের কৃষি সামগ্রী সহজে অর্ডার করুন অ্যাগ্রোমার্টে।",
    type: "website",
  },
};

export default function CartPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-7xl">
        {/* Minimalist Header */}
        <header className="mb-8 sm:mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 border border-emerald-100 dark:border-emerald-900">
            কেনাকাটা
          </span>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            শপিং কার্ট
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            আপনার নির্বাচিত কৃষি সামগ্রী ও পণ্যসমূহ পর্যালোচনা করে চেকআউট সম্পন্ন করুন।
          </p>
        </header>

        {/* Cart View Component */}
        <CartView />
      </main>
    </div>
  );
}
