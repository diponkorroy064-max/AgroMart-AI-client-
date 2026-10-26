import { Leaf } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import { newsletterTrustCues } from "@/data/home-data";

export default function Newsletter() {
  return (
    <section className="py-6 md:py-8 lg:py-10 bg-white border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-100">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            অ্যাগ্রোমার্ট আপডেট
          </span>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            নিয়মিত কৃষি টিপস ও অফার পেতে যুক্ত থাকুন
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mb-6 max-w-2xl mx-auto leading-relaxed">
            মৌসুমি চাষের আধুনিক পরামর্শ, খামার সরঞ্জাম ও সার-বীজের বিশেষ মূল্যছাড় সরাসরি আপনার ইনবক্সে।
          </p>

          <NewsletterForm />

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs text-gray-400">
            {newsletterTrustCues.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1">
                <item.icon className="w-3.5 h-3.5 text-emerald-600" />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}