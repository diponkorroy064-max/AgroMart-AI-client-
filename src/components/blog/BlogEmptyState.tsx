import Link from "next/link";
import { BookOpen, RotateCcw } from "lucide-react";

export function BlogEmptyState() {
  return (
    <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-slate-200">
      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        কোনো আর্টিকেল পাওয়া যায়নি
      </h3>
      <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-5 leading-relaxed">
        আপনার অনুসন্ধানের সাথে মিলে এমন কোনো ব্লগ আর্টিকেল এই মুহূর্তে নেই। অন্য কোনো বিষয় খুঁজুন অথবা সব আর্টিকেল দেখুন।
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        সব আর্টিকেল দেখুন
      </Link>
    </div>
  );
}
