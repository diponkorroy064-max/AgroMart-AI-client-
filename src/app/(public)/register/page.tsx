import Image from "next/image";
import type { Metadata } from "next";
import { Leaf, Sprout, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "নতুন অ্যাকাউন্ট খুলুন | AgroMart AI",
  description: "অ্যাগ্রোমার্ট এআই প্ল্যাটফর্মে কৃষক বা বিক্রেতা হিসেবে ফ্রি অ্যাকাউন্ট খুলে দেশের ডিজিটাল কৃষি নেটওয়ার্কে যুক্ত হোন।",
};

export default function RegisterPage() {
  return (
    <section className="min-h-screen bg-linear-to-br from-green-100 via-white to-green-50 py-12">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Left Side: Server-rendered Branding */}
          <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-emerald-800 via-emerald-700 to-green-800 p-10 lg:p-12 text-white">
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

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 text-white">
              ডিজিটাল কৃষি বিপ্লবের সাথে আজই যুক্ত হোন
            </h2>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6">
              অ্যাগ্রোমার্ট এআই-তে বিনামূল্যে অ্যাকাউন্ট তৈরি করুন। কৃষক হিসেবে সংগ্রহ করুন সেরা মানের প্রত্যয়িত বীজ, সার, কীটনাশক ও আধুনিক কৃষি প্রযুক্তি; আর বিক্রেতা হিসেবে কোনো মধ্যস্বত্বভোগী ছাড়া সারা দেশের লক্ষাধিক খামারির কাছে আপনার কৃষি উপকরণ পৌঁছে দিন।
            </p>

            {/* Key Value Points for Registration */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-emerald-50 bg-white/5 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-white/10">
                <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>কৃষকদের জন্য: সুলভ মূল্যে মানসম্মত কৃষি উপকরণ ও এআই গাইডেন্স</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-emerald-50 bg-white/5 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-white/10">
                <TrendingUp className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>বিক্রেতাদের জন্য: সরাসরি দেশব্যাপী খামারিদের কাছে বিক্রির সুযোগ</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-emerald-50 bg-white/5 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>সহজ ও দ্রুত নিবন্ধন, নিরাপদ লেনদেন ও সার্বক্ষণিক সহায়তা</span>
              </div>
            </div>

            <div className="relative w-full h-52 lg:h-60 rounded-2xl overflow-hidden shadow-xl border border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=80"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Modern Agriculture and Farm Tech"
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side: Header & Interactive Form Leaf */}
          <div className="flex items-center justify-center p-8 lg:p-14">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <Sprout className="text-green-600 h-8 w-8" />
                </div>

                <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800">
                  নতুন অ্যাকাউন্ট খুলুন
                </h1>

                <p className="text-gray-500 mt-2 text-sm">
                  কৃষি পণ্য সহজে কেনাবেচা করতে প্রয়োজনীয় তথ্য দিয়ে নিবন্ধন করুন।
                </p>
              </div>

              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
