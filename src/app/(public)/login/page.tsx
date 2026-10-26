import { Suspense } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Leaf, CheckCircle2, Bot, ShieldCheck } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "লগইন করুন | AgroMart AI",
  description: "আপনার অ্যাকাউন্টে লগইন করুন এবং দেশের শীর্ষস্থানীয় কৃষি মার্কেটপ্লেসে যুক্ত থাকুন।",
};

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side: Server-rendered Branding */}
        <div className="hidden lg:flex bg-linear-to-br from-emerald-800 via-emerald-700 to-green-800 text-white p-10 lg:p-12 flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xs">
              <Leaf className="w-6 h-6 text-emerald-200" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold tracking-tight">
                AgroMart
              </span>
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-200 px-2 py-0.5 rounded-md border border-emerald-300/30">
                AI
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 text-white">
            স্মার্ট কৃষি ও আধুনিক খামার ব্যবস্থাপনায় স্বাগতম
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6">
            আপনার অ্যাকাউন্টে প্রবেশ করে মানসম্মত বীজ, সুষম সার, আধুনিক কৃষি যন্ত্রপাতি ও সেচ সরঞ্জাম কেনাবেচা পরিচালনা করুন। এআই ভিত্তিক ফসল দিকনির্দেশনা ও রিয়েল-টাইম অর্ডার ট্র্যাকিংয়ের মাধ্যমে খামারের উৎপাদনশীলতা বৃদ্ধি করুন।
          </p>

          {/* Key Value Points */}
          <div className="space-y-2.5 mb-6">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-emerald-50 bg-white/5 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>প্রত্যয়িত বীজ, সার ও উন্নত কৃষি উপকরণ</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-emerald-50 bg-white/5 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-white/10">
              <Bot className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>এআই চালিত রোগবালাই ও ফসল পরিচর্যা পরামর্শ</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-emerald-50 bg-white/5 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>যাচাইকৃত সরবরাহকারী ও নিরাপদ ডিজিটাল লেনদেন</span>
            </div>
          </div>

          <div className="relative w-full h-52 lg:h-60 rounded-2xl overflow-hidden shadow-xl border border-white/20">
            <Image
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              alt="Smart Agriculture Farmer with Tablet"
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Header & Interactive Form Leaf */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800">
              অ্যাকাউন্টে লগইন করুন
            </h2>

            <p className="text-gray-500 mt-2">
              আপনার নিবন্ধিত ইমেইল ও পাসওয়ার্ড দিয়ে এগিয়ে যান।
            </p>
          </div>

          <Suspense
            fallback={
              <div className="py-8 text-center text-gray-500 text-sm">
                লোড হচ্ছে...
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}