import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  contactInfoList,
  supportHighlights,
  contactFaqs,
} from "@/data/contact-data";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "যোগাযোগ | AgroMart AI",
  description:
    "কৃষক, বিক্রেতা ও ক্রেতাদের সমন্বয়ে স্মার্ট কৃষি সেবা। যেকোনো পরামর্শ বা তথ্যের জন্য অ্যাগ্রোমার্টের সাথে যোগাযোগ করুন।",
  openGraph: {
    title: "যোগাযোগ | AgroMart AI",
    description:
      "অ্যাগ্রোমার্ট কাস্টমার সাপোর্ট ও অফিস ঠিকানা। সরাসরি কল করুন বা অনলাইনে বার্তা পাঠান।",
    type: "website",
  },
};


export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-7xl">
        {/* 1. Minimal Header */}
        <header className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 border border-emerald-100 dark:border-emerald-900">
            সহায়তা ও যোগাযোগ
          </span>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            অ্যাগ্রোমার্টের সাথে যোগাযোগ করুন
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            কৃষক, বিক্রেতা বা সাধারণ ক্রেতা — যেকোনো জিজ্ঞাসা, পরামর্শ বা সেবার
            প্রয়োজনে আমাদের টিম আপনাকে সহায়তা করতে প্রস্তুত।
          </p>
        </header>

        {/* 2. Contact Info Cards (Mapped) */}
        <section className="mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfoList.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-6 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700/80 transition-all duration-200 h-full">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-900/60">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-base font-bold text-gray-900 dark:text-white wrap-break-word">
                      {item.detail}
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );

              return item.href ? (
                <a
                  key={item.id}
                  href={item.href}
                  className="block group outline-none"
                >
                  {content}
                </a>
              ) : (
                <div key={item.id}>{content}</div>
              );
            })}
          </div>
        </section>

        {/* 3. Main Form & Side Info Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Interactive Form Component (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Side Info & Assistance Topics (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Assistance Points */}
            <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-7">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                যেসব বিষয়ে আমরা সরাসরি সহায়তা করি
              </h2>
              <ul className="space-y-3">
                {supportHighlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Community / Register CTA Card */}
            <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/40 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-200">
                  কোম্পানি ও বিক্রেতা হিসেবে যুক্ত হোন
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  সরাসরি সারা দেশের কৃষকদের কাছে আপনার সার, হাইব্রিড বীজ ও কৃষি মেশিনারিজ পৌঁছে দিন।
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors"
                >
                  রেজিস্ট্রেশন করুন
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Minimal Map Card */}
            <div className="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 overflow-hidden bg-white dark:bg-gray-800/60">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300">
                অফিস অবস্থান (ঢাকা, বাংলাদেশ)
              </div>
              <div className="h-48 w-full">
                <iframe
                  title="AgroMart Office Location"
                  src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Minimalist FAQ Section */}
        <section className="pt-10 sm:pt-14 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl sm:max-w-5xl mx-auto text-center mb-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 border border-emerald-200/60 dark:border-emerald-800/60">
              🌾 সাধারণ জিজ্ঞাসা ও সহায়তা
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed">
              রাসায়নিক ও জৈব সার, মেশিনারিজ, হাইব্রিড বীজ, কোম্পানির সেলার সুবিধা এবং এআই প্রযুক্তি সংক্রান্ত প্রয়োজনীয় উত্তর।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl sm:max-w-6xl mx-auto">
            {contactFaqs.map((faq) => {
              const Icon = faq.icon;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-5 sm:p-6 hover:border-emerald-300 dark:hover:border-emerald-700/80 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      {Icon && (
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/60 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                      )}
                      {faq.category && (
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                          {faq.category}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {faq.question}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
