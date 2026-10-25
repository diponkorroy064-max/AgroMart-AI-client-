import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  aboutHeroData,
  aboutPillarsData,
  aboutCategoriesData,
  aboutAiWorkflowData,
  aboutValuesData,
  aboutStatisticsData,
  aboutCtaData,
} from "@/data/about-data";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | AgroMart AI",
  description:
    "AgroMart AI হলো কৃষিকাজের রাসায়নিক ও জৈব সার, আধুনিক মেশিনারিজ, কীটনাশক এবং হাইব্রিড বীজের স্মার্ট মার্কেটপ্লেস। এআই অ্যাসিস্ট্যান্টের মাধ্যমে সঠিক কৃষিপণ্য নির্বাচন করুন।",
  openGraph: {
    title: "আমাদের সম্পর্কে | AgroMart AI - স্মার্ট কৃষি মার্কেটপ্লেস",
    description:
      "কৃষক, শীর্ষ কৃষি কোম্পানি ও এআই প্রযুক্তির সমন্বয়ে আধুনিক ও লাভজনক কৃষি সমাধান।",
    type: "website",
  },
};

// Reusable Section Header Component (prevents repeated markup)
interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-4xl sm:max-w-5xl ${
        centered ? "mx-auto text-center" : "text-left"
      }`}
    >
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 border border-emerald-200/60 dark:border-emerald-800/60">
          {badge}
        </span>
      )}
      <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl sm:max-w-4xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      <main className="overflow-hidden">
        {/* 1. Hero Section */}
        <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-14 sm:pt-16 sm:pb-20 text-center">
          <div className="w-full max-w-5xl sm:max-w-6xl mx-auto">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4 border border-emerald-200/80 dark:border-emerald-800/80 shadow-2xs">
              🌾 {aboutHeroData.badge}
            </span>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              {aboutHeroData.title}
            </h1>

            <p className="mt-3.5 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300 max-w-4xl sm:max-w-5xl mx-auto font-normal">
              {aboutHeroData.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={aboutHeroData.primaryCta.href}
                className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition active:scale-95 cursor-pointer"
              >
                {aboutHeroData.primaryCta.label}
              </Link>
              <Link
                href={aboutHeroData.secondaryCta.href}
                className="inline-flex items-center justify-center border-2 border-emerald-700/80 dark:border-emerald-600 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition active:scale-95 cursor-pointer"
              >
                {aboutHeroData.secondaryCta.label}
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Core Pillars: Farmers, Sellers & AI Assistant */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100 dark:border-gray-900">
          <SectionHeader
            badge="অ্যাগ্রোমার্ট ইকোসিস্টেম"
            title="কৃষক, সেলার ও এআই-এর সমন্বিত মার্কেটপ্লেস"
            subtitle="AgroMart AI কেবল একটি ই-কমার্স নয়; এটি কৃষক ও কৃষি কোম্পানির সরাসরি সংযোগ এবং নির্ভুল এআই নির্দেশনার এক আধুনিক প্ল্যাটফর্ম।"
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {aboutPillarsData.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/90 dark:border-gray-800 p-7 sm:p-8 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700/80 hover:shadow-lg transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/60">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400 mt-1">
                      {pillar.subtitle}
                    </p>

                    <p className="mt-3.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800/80 space-y-3">
                      {pillar.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-snug">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {pillar.ctaHref && pillar.ctaLabel && (
                    <div className="mt-8 pt-4">
                      <Link
                        href={pillar.ctaHref}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 group"
                      >
                        {pillar.ctaLabel}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Comprehensive Product Offerings & Machinery */}
        <section className="bg-gray-50/80 dark:bg-gray-900/50 py-16 sm:py-20 border-y border-gray-100 dark:border-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="পণ্য সম্ভার"
              title="কৃষিকাজের সব ধরনের সরঞ্জাম এক ঠিকানায়"
              subtitle="রাসায়নিক সার, জৈব সার, ভারী মেশিনারিজ, কীটনাশক ও হাইব্রিড বীজ—উচ্চ ফলনশীল চাষাবাদের সমস্ত উপাদান।"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutCategoriesData.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="bg-white dark:bg-gray-900 p-6 sm:p-7 rounded-2xl border border-gray-200/80 dark:border-gray-800 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-200 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/60">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                            {cat.title}
                          </h3>
                          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                            {cat.badge}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <Link
                        href={`/products?category=${cat.categorySlug}`}
                        className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1 group"
                      >
                        পণ্যসমূহ দেখুন
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. AI Assistant Workflow: How It Works */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionHeader
            badge="স্মার্ট প্রযুক্তি"
            title="কীভাবে কাজ করে AgroMart AI অ্যাসিস্ট্যান্ট?"
            subtitle="কৃষক যাতে সঠিক জমিতে সঠিক পণ্য প্রয়োগ করে সর্বোচ্চ ফসল ঘরে তুলতে পারেন, সেজন্য ৩টি সহজ পদক্ষেপে কাজ করে আমাদের এআই।"
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {aboutAiWorkflowData.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-2xl p-7 border border-gray-200/90 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-200 flex flex-col justify-between shadow-2xs relative"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-extrabold text-base flex items-center justify-center mb-5 shadow-xs">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Trust, Authenticity & Commitments */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100 dark:border-gray-900">
          <SectionHeader
            badge="আমাদের অঙ্গীকার"
            title="কৃষক ও সেলারদের প্রতি আমাদের প্রতিশ্রুতি"
            subtitle="প্রতারণাহীন ও নিরাপদ কৃষি সামগ্রী সরবরাহের মাধ্যমে একটি টেকসই খাদ্য বিপ্লব গড়ে তোলা আমাদের অঙ্গীকার।"
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutValuesData.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.id}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 text-center hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-200 flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-900/60">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Impact Statistics Strip */}
        <section className="bg-emerald-900 text-white py-14 sm:py-16 rounded-3xl mx-4 my-10 shadow-md">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
              {aboutStatisticsData.map((stat, idx) => (
                <div
                  key={idx}
                  className={
                    idx === aboutStatisticsData.length - 1
                      ? "col-span-2 lg:col-span-1"
                      : ""
                  }
                >
                  <h3 className="text-3xl sm:text-4xl font-black text-amber-300">
                    {stat.value}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-emerald-100 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Call To Action (CTA) Section */}
        <section className="bg-linear-to-r from-emerald-900 via-emerald-800 to-green-900 py-16 sm:py-20 text-center text-white rounded-3xl mx-4 mb-16 shadow-lg">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {aboutCtaData.title}
            </h2>
            <p className="mt-4 text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {aboutCtaData.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={aboutCtaData.primaryCta.href}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {aboutCtaData.primaryCta.label}
              </Link>
              <Link
                href={aboutCtaData.secondaryCta.href}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-white text-white hover:bg-white hover:text-emerald-950 font-bold text-sm sm:text-base transition-all active:scale-95 cursor-pointer"
              >
                {aboutCtaData.secondaryCta.label}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
