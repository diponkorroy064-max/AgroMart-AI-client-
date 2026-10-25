import React from "react";
import type { Metadata } from "next";
import { Sprout } from "lucide-react";
import {
  getBlogPosts,
  getFeaturedBlogPost,
  getBlogCategories,
  getQuickKrishiTips,
} from "@/lib/blog";
import {
  BlogCard,
  BlogSearch,
  BlogCategoryNav,
  BlogEmptyState,
  BlogKrishiTips,
  BlogMarketplaceBanner,
} from "@/components/blog";

export const metadata: Metadata = {
  title: "কৃষি ব্লগ ও আধুনিক চাষাবাদ নির্দেশিকা | AgroMart AI",
  description:
    "আধুনিক কৃষি প্রযুক্তি, মাচা পদ্ধতিতে ছাগল পালন, সুষম সার ব্যবস্থাপনা ও লাভজনক খামার পরিচালনার সেরা আর্টিকেল ও পরামর্শ।",
  keywords: [
    "কৃষি ব্লগ",
    "ছাগল পালন",
    "মাচা পদ্ধতি",
    "আধুনিক খামার",
    "কৃষি প্রযুক্তি",
    "জৈব সার",
    "AgroMart AI",
  ],
  openGraph: {
    title: "কৃষি ব্লগ ও আধুনিক চাষাবাদ নির্দেশিকা | AgroMart AI",
    description:
      "আধুনিক কৃষি প্রযুক্তি, মাচা পদ্ধতিতে ছাগল পালন ও বৈজ্ঞানিক ফসল উৎপাদনের নির্ভরযোগ্য গাইডলাইন।",
    type: "website",
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category || "all";
  const currentSearch = resolvedParams?.q || "";

  // Server-side filtering
  const posts = getBlogPosts({
    category: currentCategory,
    search: currentSearch,
  });

  const categories = getBlogCategories();
  const featuredPost = getFeaturedBlogPost();
  const krishiTips = getQuickKrishiTips();

  const isDefaultView = currentCategory === "all" && !currentSearch.trim();

  return (
    <main className="min-h-screen bg-slate-50/40 text-slate-900 pb-16">
      {/* 1. Minimalist Hero Section */}
      <header className="bg-white border-b border-slate-200/80 pt-12 pb-10">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-100">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>কৃষি জ্ঞান ও আধুনিক খামার নির্দেশিকা</span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            অ্যাগ্রোমার্ট <span className="text-emerald-700">কৃষি ব্লগ</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            বৈজ্ঞানিক পদ্ধতিতে চাষাবাদ, রোগবালাই দমন, সার প্রয়োগ ও আধুনিক খামার ব্যবস্থাপনার নির্ভরযোগ্য দিকনির্দেশনা।
          </p>

          {/* Minimalist Search */}
          <BlogSearch
            initialSearch={currentSearch}
            currentCategory={currentCategory}
          />
        </div>
      </header>

      {/* Main Container */}
      <div className="container mx-auto px-4 max-w-6xl py-8 space-y-12">
        {/* 2. Category Filter Pills */}
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
          <BlogCategoryNav
            categories={categories}
            activeCategory={currentCategory}
            currentSearch={currentSearch}
          />
        </div>

        {/* 3. Featured Spotlight Article (Shown when no search/filter active) */}
        {isDefaultView && featuredPost && (
          <section aria-label="বিশেষ প্রতিবেদন">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-wide uppercase text-emerald-700">
                বিশেষ প্রতিবেদন • Featured Guide
              </span>
            </div>
            <BlogCard post={featuredPost} variant="featured" priorityImage />
          </section>
        )}

        {/* 4. Article Grid Section */}
        <section aria-labelledby="all-articles-heading">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                id="all-articles-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900"
              >
                {currentSearch
                  ? `অনুসন্ধানের ফলাফল (${posts.length})`
                  : currentCategory !== "all"
                  ? `${categories.find((c) => c.slug === currentCategory)?.name || "ক্যাটাগরি"} (${posts.length})`
                  : `সকল আর্টিকেল (${posts.length})`}
              </h2>
              {currentSearch && (
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  &ldquo;{currentSearch}&rdquo; সম্পর্কিত নিবন্ধসমূহ
                </p>
              )}
            </div>
          </div>

          {posts.length === 0 ? (
            <BlogEmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} variant="default" />
              ))}
            </div>
          )}
        </section>

        {/* 5. Minimalist Krishi Tips */}
        <BlogKrishiTips tips={krishiTips} />

        {/* 6. Marketplace Banner */}
        <BlogMarketplaceBanner />
      </div>
    </main>
  );
}
