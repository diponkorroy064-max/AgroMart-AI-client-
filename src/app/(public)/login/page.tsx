import { Suspense } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Leaf } from "lucide-react";
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
        <div className="hidden lg:flex bg-linear-to-br from-green-700 to-emerald-600 text-white p-12 flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <Leaf className="w-10 h-10 text-emerald-200" />
            <span className="text-4xl font-bold tracking-tight">
              অ্যাগ্রোমার্ট
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-6">
            স্বাগতম! ফিরে আসার জন্য ধন্যবাদ
          </h1>

          <p className="text-green-100 text-lg leading-8 mb-8">
            আপনার ড্যাশবোর্ডে প্রবেশ করুন, পণ্য তালিকা পরিচালনা করুন এবং দেশের প্রত্যন্ত অঞ্চলের বিশ্বস্ত কৃষক ও ক্রেতাদের সাথে সরাসরি যুক্ত থাকুন।
          </p>

          <Image
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80"
            width={600}
            height={500}
            alt="Farmer with fresh harvest"
            priority
            className="rounded-2xl shadow-xl object-cover"
          />
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