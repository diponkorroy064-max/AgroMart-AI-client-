import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsView } from "@/components/products/ProductsView";

export const metadata: Metadata = {
  title: "সকল কৃষি পণ্য ও উপকরণ | AgroMart AI",
  description:
    "স্থানীয় বিশ্বস্ত কৃষক ও খামারিদের থেকে তাজা ফসল, উন্নত জাতের বীজ, সুষম সার ও আধুনিক কৃষি যন্ত্রপাতি সরাসরি সংগ্রহ করুন।",
  openGraph: {
    title: "সকল কৃষি পণ্য ও উপকরণ | AgroMart AI",
    description: "আধুনিক ডিজিটাল কৃষি মার্কেটপ্লেস AgroMart AI থেকে তাজা পণ্য কিনুন।",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-7xl">
        {/* Minimalist Header */}
        <header className="mb-8 sm:mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 border border-emerald-100 dark:border-emerald-900">
            মার্কেটপ্লেস
          </span>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            সকল কৃষি পণ্য ও উপকরণ
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-3xl">
            স্থানীয় বিশ্বস্ত কৃষক ও খামারিদের থেকে উন্নত জাতের বীজ, সুষম সার, বালাইনাশক ও আধুনিক কৃষি যন্ত্রপাতি সরাসরি সংগ্রহ করুন।
          </p>
        </header>

        {/* Products Catalog View */}
        <Suspense
          fallback={
            <div className="py-20 text-center text-gray-400">
              পণ্য লোড হচ্ছে...
            </div>
          }
        >
          <ProductsView />
        </Suspense>
      </main>
    </div>
  );
}
