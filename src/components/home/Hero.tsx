import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Sprout, Star, BadgeCheck, Bot} from "lucide-react";
import { trendingSearches } from "@/data/home-data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-100 py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid items-center grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-12">
        {/* Left Content Column */}
        <div className="text-center lg:text-left lg:col-span-6">
          {/* Top Interactive Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] sm:text-xs font-semibold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>বাংলাদেশের নির্ভরযোগ্য এআই স্মার্ট কৃষি প্ল্যাটফর্ম</span>
          </div>

          {/* Headline */}
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-950 leading-tight mb-3">
            আধুনিক চাষাবাদ ও উন্নত ফলনে —
            <span className="block mt-1 text-transparent bg-clip-text bg-linear-to-r from-emerald-600 via-green-600 to-teal-600">
              কৃষকের আস্থার স্মার্ট মার্কেটপ্লেস
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5 max-w-xl mx-auto lg:mx-0">
            সরাসরি বিশ্বস্ত কৃষক ও সরবরাহকারীদের কাছ থেকে খাঁটি ফসল, প্রত্যয়িত বীজ, সার ও আধুনিক কৃষি সরঞ্জাম কিনুন এবং খামারের সর্বোচ্চ লাভ নিশ্চিত করুন।
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mb-5 max-w-md mx-auto lg:mx-0">
            <Link href="/products" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer">
                কেনাকাটা শুরু করুন
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>

            <Link href="/register" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs sm:text-sm border border-gray-200 transition active:scale-95 cursor-pointer">
                <Sprout className="w-3.5 h-3.5 text-green-600" />
                বিক্রেতা হিসেবে যুক্ত হন
              </button>
            </Link>
          </div>

          {/* Trending Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-[11px] text-gray-500 max-w-lg mx-auto lg:mx-0">
            <span className="font-semibold text-gray-600 text-[11px]">জনপ্রিয়:</span>
            {trendingSearches.map((item) => (
              <Link
                key={item.label}
                href={`/products?search=${encodeURIComponent(item.query)}`}
                className="px-2.5 py-0.5 rounded-md bg-gray-100 hover:bg-green-100 hover:text-green-800 text-gray-600 transition text-[11px]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Visual Showcase */}
        <div className="relative lg:col-span-6 flex items-center justify-center w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto">
          {/* Visual Frame */}
          <div className="relative w-full aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-emerald-100/90">
            <Image
              src="/agromartai.png"
              alt="স্মার্ট কৃষি ফসল ও খামার"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              className="object-cover"
            />

            {/* Bottom Badge */}
            <div className="absolute bottom-3 left-3 right-3 bg-gray-950/75 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 text-white flex items-center justify-between border border-white/10 shadow-sm">
              <div>
                <p className="text-[10px] sm:text-xs font-semibold text-green-300">স্মার্ট এগ্রিকালচার</p>
                <p className="text-xs sm:text-sm font-bold leading-tight">গুণগত মানসম্পন্ন কৃষি পণ্য</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-600 rounded-full text-[10px] sm:text-xs font-bold text-white shadow-2xs">
                <Bot className="w-3.5 h-3.5" />
                <span>এআই</span>
              </div>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="absolute -top-3 -right-2 sm:-right-3 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
            <span className="text-xs font-bold text-gray-900">৪.৯ রেটিং</span>
          </div>

          <div className="absolute -bottom-3 -left-2 sm:-left-3 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-1.5">
            <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-gray-900">১০০% খাঁটি পণ্য</span>
          </div>
        </div>
      </div>
    </section>
  );
}
