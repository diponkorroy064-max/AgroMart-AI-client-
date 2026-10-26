import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  BookOpen,
} from "lucide-react";
import {
  getBlogBySlug,
  getBlogs,
  getBlogImageUrl,
} from "@/lib/api/blog";
import {
  BlogCard,
  BlogShareButton,
  BlogKeyTakeaways,
  BlogArticleBody,
  BlogMarketplaceBanner,
} from "@/components/blog";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface BlogPostDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate dynamic SEO Metadata for each blog post on the server.
 */
export async function generateMetadata({
  params,
}: BlogPostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogBySlug(slug)) || (await getBlogBySlug(decodeURIComponent(slug)));

  if (!post) {
    return {
      title: "আর্টিকেল পাওয়া যায়নি | AgroMart AI",
      description: "অনুরোধকৃত কৃষি আর্টিকেলটি খুঁজে পাওয়া যায়নি।",
    };
  }

  return {
    title: `${post.title} | AgroMart AI`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: BlogPostDetailPageProps) {
  const { slug } = await params;
  const post = (await getBlogBySlug(slug)) || (await getBlogBySlug(decodeURIComponent(slug)));

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            আর্টিকেলটি পাওয়া যায়নি
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">
            আপনি যে ব্লগ পোস্টটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা স্থানান্তরিত করা হয়েছে।
          </p>
          <Link href="/blog">
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white gap-2 text-xs sm:text-sm">
              <ArrowLeft className="w-4 h-4" /> ব্লগে ফিরে যান
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const allPosts = await getBlogs();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="min-h-screen bg-slate-50/40 text-slate-900 py-8 sm:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. Minimalist Top Breadcrumb & Category */}
        <nav aria-label="ব্রেডক্রাম্ব" className="flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            সকল ব্লগে ফিরে যান
          </Link>

          <Link
            href={`/blog?category=${post.categorySlug}`}
            className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors border border-emerald-100"
          >
            {post.category}
          </Link>
        </nav>

        {/* 2. Article Header */}
        <header className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xs space-y-5">
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {post.date}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug">
            {post.title}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {post.subtitle}
          </p>

          {/* Author Byline & Share Button */}
          <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {post.author.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  {post.author.role}
                </p>
              </div>
            </div>

            <BlogShareButton title={post.title} />
          </div>
        </header>

        {/* 3. Featured Image */}
        <div className="relative h-64 sm:h-96 lg:h-[460px] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-2xs">
          <Image
            src={getBlogImageUrl(post.image)}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>

        {/* 4. Key Highlights (Takeaways) */}
        <BlogKeyTakeaways takeaways={post.keyTakeaways} />

        {/* 5. Main Article Body */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xs">
          {post.sections && post.sections.length > 0 ? (
            <BlogArticleBody sections={post.sections} />
          ) : post.content ? (
            <div className="prose prose-emerald max-w-none text-slate-700 leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
              {post.content}
            </div>
          ) : null}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
                <Tag className="w-3.5 h-3.5 text-emerald-600" /> ট্যাগসমূহ:
              </span>
              {post.tags.map((tag, i) => (
                <Link
                  key={i}
                  href={`/blog?q=${encodeURIComponent(tag)}`}
                  className="text-xs bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1 rounded-full font-medium transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Author Footer Sign-off Card */}
          <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/60 rounded-xl p-4 sm:p-5 flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
              <Image
                src={post.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={post.author?.name || "লেখক"}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-slate-900">
                {post.author?.name || "অ্যাগ্রোমার্ট টিম"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {post.author?.role || "কৃষি জ্ঞান ও গবেষণা বিভাগ"} • অ্যাগ্রোমার্ট
              </p>
            </div>
          </div>
        </div>

        {/* 6. Marketplace Interconnect Banner (Shared Reusable Component) */}
        <BlogMarketplaceBanner />

        {/* 7. Related Articles (Using Reusable BlogCard) */}
        {relatedPosts.length > 0 && (
          <section aria-labelledby="related-heading" className="space-y-5">
            <h2 id="related-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
              আরও কৃষি আর্টিকেল পড়ুন
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((related) => (
                <BlogCard key={related.id || related._id} post={related} variant="default" />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
