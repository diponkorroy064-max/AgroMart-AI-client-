import { testimonialsData } from "@/data/home-data";
import TestimornialCard from "./TestimornialCard";

export default function Testimonials() {
  return (
    <section className="py-6 md:py-8 lg:py-10 bg-gray-50/60 border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2.5 border border-emerald-100">
            কৃষক ও ক্রেতাদের আস্থা
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            গ্রাহকদের বাস্তব অভিজ্ঞতা
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            সারা দেশের কৃষক, বিক্রেতা এবং ভোক্তাদের আস্থা ও সন্তুষ্টির চিত্র।
          </p>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonialsData.map((testimonial, index) => (
            <TestimornialCard key={index} item={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
