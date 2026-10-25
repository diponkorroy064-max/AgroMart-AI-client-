import Image from "next/image";
import type { Metadata } from "next";
import { Leaf, Sprout } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "নতুন অ্যাকাউন্ট খুলুন | AgroMart AI",
  description: "অ্যাগ্রোমার্ট প্ল্যাটফর্মে কৃষক বা বিক্রেতা হিসেবে ফ্রি অ্যাকাউন্ট খুলে দেশের ডিজিটাল কৃষি নেটওয়ার্কে যুক্ত হোন।",
};

export default function RegisterPage() {
  return (
    <section className="min-h-screen bg-linear-to-br from-green-100 via-white to-green-50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Left Side: Server-rendered Branding */}
          <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-green-700 via-green-600 to-emerald-700 p-12 text-white">
            <div className="flex items-center gap-3 mb-8">
              <Leaf className="h-12 w-12 text-emerald-200" />
              <span className="text-4xl font-bold tracking-tight">
                অ্যাগ্রোমার্ট
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-6">
              আধুনিক ও স্মার্ট কৃষির সাথে যুক্ত হোন
            </h2>

            <p className="text-lg text-green-100 leading-8">
              সরাসরি বিশ্বস্ত কৃষকের কাছ থেকে খাঁটি কৃষি পণ্য কিনুন, আপনার খামারের ফসল ন্যায্য মূল্যে বিক্রি করুন এবং দেশের সবচেয়ে বড় ডিজিটাল কৃষি নেটওয়ার্কে যুক্ত হোন।
            </p>

            <Image
              width={600}
              height={600}
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399"
              alt="Farmer with fresh vegetables"
              priority
              className="mt-12 w-full max-w-md self-center rounded-2xl shadow-2xl object-cover"
            />
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
