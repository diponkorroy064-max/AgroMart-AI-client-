import React from "react";
import Link from "next/link";
import {
  FlaskConical,
  Sprout,
  Bug,
  ShieldCheck,
  Tractor,
  Droplets,
  Wrench,
  LeafyGreen,
  FolderTree,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { getCategories } from "@/lib/api/category";
import { ICategory } from "@/types/Category";

// Icon mapping for agricultural categories
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  fertilizers: FlaskConical,
  seeds: Sprout,
  pesticides: Bug,
  herbicides: ShieldCheck,
  "agricultural-machinery": Tractor,
  "irrigation-equipment": Droplets,
  "farming-tools": Wrench,
  "crop-protection": LeafyGreen,
};

// Thematic color accents for agricultural categories
const colorMap: Record<string, { bg: string; text: string; hoverBg: string; border: string }> = {
  fertilizers: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    hoverBg: "group-hover:bg-emerald-600",
    border: "group-hover:border-emerald-300 dark:group-hover:border-emerald-700",
  },
  seeds: {
    bg: "bg-green-50 dark:bg-green-950/40",
    text: "text-green-700 dark:text-green-300",
    hoverBg: "group-hover:bg-green-600",
    border: "group-hover:border-green-300 dark:group-hover:border-green-700",
  },
  pesticides: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300",
    hoverBg: "group-hover:bg-amber-600",
    border: "group-hover:border-amber-300 dark:group-hover:border-amber-700",
  },
  herbicides: {
    bg: "bg-teal-50 dark:bg-teal-950/40",
    text: "text-teal-700 dark:text-teal-300",
    hoverBg: "group-hover:bg-teal-600",
    border: "group-hover:border-teal-300 dark:group-hover:border-teal-700",
  },
  "agricultural-machinery": {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
    hoverBg: "group-hover:bg-blue-600",
    border: "group-hover:border-blue-300 dark:group-hover:border-blue-700",
  },
  "irrigation-equipment": {
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    text: "text-cyan-700 dark:text-cyan-300",
    hoverBg: "group-hover:bg-cyan-600",
    border: "group-hover:border-cyan-300 dark:group-hover:border-cyan-700",
  },
  "farming-tools": {
    bg: "bg-orange-50 dark:bg-orange-950/40",
    text: "text-orange-700 dark:text-orange-300",
    hoverBg: "group-hover:bg-orange-600",
    border: "group-hover:border-orange-300 dark:group-hover:border-orange-700",
  },
  "crop-protection": {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    text: "text-purple-700 dark:text-purple-300",
    hoverBg: "group-hover:bg-purple-600",
    border: "group-hover:border-purple-300 dark:group-hover:border-purple-700",
  },
};

const defaultColor = {
  bg: "bg-emerald-50 dark:bg-emerald-950/40",
  text: "text-emerald-700 dark:text-emerald-300",
  hoverBg: "group-hover:bg-emerald-600",
  border: "group-hover:border-emerald-300 dark:group-hover:border-emerald-700",
};

// Format category title into Bengali name and English subtitle
const parseCategoryName = (fullName: string) => {
  const match = fullName.match(/^(.*?)(?:\s*\((.*?)\))?$/);
  const bnName = match ? match[1].trim() : fullName;
  const enTag = match && match[2] ? match[2].trim() : null;
  return { bnName, enTag };
};

export default async function Categories() {
  let categories: ICategory[] = [];
  try {
    const res = await getCategories({ status: "active" });
    if (res?.categories && Array.isArray(res.categories)) {
      categories = res.categories;
    }
  } catch (err) {
    console.error("[SSR Categories] Error loading categories on server:", err);
  }

  // If no active categories found in database, render nothing (no default/mock fallback data)
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-50/70 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ক্যাটাগরি ব্রাউজ করুন
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            জনপ্রিয় কৃষি ক্যাটাগরি
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            আপনার খামার ও ফসলের প্রয়োজনীয় সামগ্রী সরাসরি ক্যাটাগরি অনুযায়ী খুঁজুন
          </p>
        </div>

        {/* Categories Grid - Centered last row (SSR) */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.slug] || FolderTree;
            const colors = colorMap[cat.slug] || defaultColor;
            const { bnName, enTag } = parseCategoryName(cat.name);
            const prodCount = cat.productCount || 0;
            const subCount = cat.subcategoryCount || 0;

            const countLabel =
              prodCount > 0
                ? `${prodCount.toLocaleString("bn-BD")} টি পণ্য`
                : subCount > 0
                ? `${subCount.toLocaleString("bn-BD")} টি উপ-বিভাগ`
                : "পণ্য দেখুন";

            return (
              <Link
                key={cat._id}
                href={`/products?category=${encodeURIComponent(cat.slug)}`}
                className={`w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 shadow-2xs hover:shadow-md transition-all duration-300 group ${colors.border}`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center shrink-0 ${colors.hoverBg} group-hover:text-white transition-all duration-300 shadow-2xs`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {bnName}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                        {countLabel}
                      </span>
                      {enTag && (
                        <>
                          <span className="text-gray-300 dark:text-gray-600 text-[10px]">•</span>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                            {enTag}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrow hint */}
                <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1 opacity-0 group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>

        {/* Bottom Explore Button */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/90 dark:border-gray-700 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition shadow-2xs group cursor-pointer"
          >
            <span>সকল কৃষি ক্যাটাগরি ও পণ্য অন্বেষণ করুন</span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
