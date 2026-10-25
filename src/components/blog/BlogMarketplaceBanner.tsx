import Link from "next/link";
import { Tractor, ArrowRight } from "lucide-react";

export function BlogMarketplaceBanner() {
  return (
    <section className="bg-emerald-50/50 border border-emerald-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="space-y-1.5 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-[11px] font-semibold">
          <Tractor className="w-3.5 h-3.5 text-emerald-700" />
          <span>অ্যাগ্রোমার্ট কৃষি শপ</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          ব্লগে আলোচিত কৃষি যন্ত্রপাতি ও উপকরণ খুঁজছেন?
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
          প্লাস্টিক স্ল্যাটেড ফ্লোর ম্যাট, স্বয়ংক্রিয় ড্রিংকার, বীজ ও জৈব সার সরাসরি বিশ্বস্ত সরবরাহকারীদের কাছ থেকে অর্ডার করুন।
        </p>
      </div>

      <Link
        href="/products"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs"
      >
        পণ্যসমূহ দেখুন <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
