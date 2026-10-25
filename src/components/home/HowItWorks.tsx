import React from "react";
import { howItWorksSteps } from "@/data/home-data";

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-100">
            সহজ ৪ ধাপ
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            কীভাবে কাজ করে অ্যাগ্রোমার্ট?
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            কৃষি পণ্য কেনাবেচা এখন আগের চেয়ে অনেক সহজ, দ্রুত ও নিরাপদ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {howItWorksSteps.map((step) => (
            <div
              key={step.number}
              className="relative p-5 rounded-2xl bg-white border border-gray-100 shadow-2xs hover:border-emerald-200 hover:shadow-xs transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black text-emerald-600/40">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
