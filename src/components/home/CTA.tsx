import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ctaTrustCues } from "@/data/home-data";


export default function CTA() {
  return (
    <section className="py-6 md:py-8 lg:py-10 bg-gray-50/50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-800 via-green-800 to-teal-900 px-6 py-12 sm:px-12 sm:py-16 text-center text-white shadow-xl">
          {/* Subtle ambient blur highlights */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium text-emerald-200 border border-white/15">
              🌿 বাংলাদেশের স্মার্ট কৃষি নেটওয়ার্ক
            </span>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              অ্যাগ্রোমার্টের সাথে আজই শুরু হোক <br className="hidden sm:inline" /> আপনার আধুনিক কৃষি যাত্রা
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              সরাসরি বিশ্বস্ত কৃষকের উৎপাদিত খাঁটি পণ্য কিনুন কিংবা আপনার ফসলের ন্যায্য মূল্যে বিক্রি করতে আজই আমাদের প্ল্যাটফর্মে যুক্ত হোন।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50 active:scale-95 cursor-pointer"
              >
                কেনাকাটা শুরু করুন
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95 cursor-pointer"
              >
                বিক্রেতা হিসেবে যুক্ত হোন
              </Link>
            </div>

            {/* Minimal trust cues */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-xs text-emerald-200/80 border-t border-white/10">
              {ctaTrustCues.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5">
                  <item.icon className="h-4 w-4 text-emerald-300" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
