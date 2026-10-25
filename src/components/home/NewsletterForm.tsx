"use client";
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitted(false);

    if (!email) {
      setError("অনুগ্রহ করে আপনার ইমেইল দিন।");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("সঠিক ইমেইল ফরম্যাট প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
    }, 500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="আপনার ইমেইল ঠিকানা..."
          className="flex-1 px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition disabled:opacity-50 cursor-pointer shrink-0"
        >
          {isSubmitting ? "যুক্ত হচ্ছে..." : "সাবস্ক্রাইব করুন"}
        </button>
      </form>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      {isSubmitted && (
        <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-semibold mt-3 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।</span>
        </div>
      )}
    </div>
  );
}
