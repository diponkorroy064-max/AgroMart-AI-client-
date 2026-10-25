"use client";
import React, { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

interface FormFieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder: string;
  required?: boolean;
  rows?: number;
  colSpan?: 1 | 2;
}

const formFields: FormFieldConfig[] = [
  {
    name: "name",
    label: "আপনার পূর্ণ নাম",
    type: "text",
    placeholder: "যেমন: মোঃ রফিকুল ইসলাম",
    required: true,
    colSpan: 1,
  },
  {
    name: "email",
    label: "ইমেইল ঠিকানা",
    type: "email",
    placeholder: "name@example.com",
    required: true,
    colSpan: 1,
  },
  {
    name: "phone",
    label: "মোবাইল নম্বর",
    type: "tel",
    placeholder: "+৮৮০ ১XXXXXXXXX",
    required: false,
    colSpan: 1,
  },
  {
    name: "subject",
    label: "বার্তার বিষয়",
    type: "text",
    placeholder: "যেমন: বাল্ক অর্ডার বা পণ্য সম্পর্কিত প্রশ্ন",
    required: true,
    colSpan: 1,
  },
  {
    name: "message",
    label: "বিস্তারিত বার্তা",
    type: "textarea",
    placeholder: "আপনার মতামত, জিজ্ঞাসা বা প্রয়োজনীয় তথ্য বিস্তারিত লিখুন...",
    required: true,
    rows: 4,
    colSpan: 2,
  },
];

export function ContactForm() {
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const inputBaseClasses =
    "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-850 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all";

  return (
    <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          আমাদের সরাসরি বার্তা পাঠান
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          নিচের তথ্যগুলো পূরণ করে বার্তা পাঠালে আমাদের টিম দ্রুত যোগাযোগ করবে।
        </p>
      </div>

      {isSubmitted ? (
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/70 dark:bg-emerald-950/40 p-6 text-center">
          <CheckCircle2 className="mx-auto w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-3" />
          <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
            বার্তাটি সফলভাবে পাঠানো হয়েছে!
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
            আমাদের কাস্টমার কেয়ার প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer"
          >
            আরেকটি বার্তা পাঠান
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formFields.map((field) => (
              <div
                key={field.name}
                className={field.colSpan === 2 ? "sm:col-span-2" : "sm:col-span-1"}
              >
                <label
                  htmlFor={field.name}
                  className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-emerald-600 dark:text-emerald-400 ml-1">
                      *
                    </span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows={field.rows || 4}
                    required={field.required}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`${inputBaseClasses} resize-y`}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={inputBaseClasses}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-60 shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  পাঠানো হচ্ছে...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  বার্তা পাঠান
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
