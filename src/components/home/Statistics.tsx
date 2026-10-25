import React from "react";
import { marketplaceStatistics } from "@/data/home-data";

export default function Statistics() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50/60 border-b border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-100">
            আমাদের অর্জন
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            হাজারো কৃষক ও ক্রেতার আস্থার প্রতীক
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            সারা দেশের খামারি, কৃষি উদ্যোক্তা ও ভোক্তাদের এক ছাদের নিচে নির্ভরযোগ্য সমাধান
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {marketplaceStatistics.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-gray-100 shadow-2xs text-center flex flex-col items-center justify-center hover:border-emerald-200 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 shrink-0">
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-emerald-700 tracking-tight mb-0.5">
                {stat.value}
              </p>
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">
                {stat.title}
              </h3>
              <p className="text-[11px] text-gray-400 leading-snug line-clamp-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
