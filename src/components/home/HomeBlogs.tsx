import Link from "next/link";
import { getBlogs } from "@/lib/api/blog";
import { BlogCard } from "@/components/blog";
import { ArrowRight, Sprout } from "lucide-react";

export default async function HomeBlogs() {
  const latestPosts = await getBlogs({ limit: 4 });

  if (!latestPosts || latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-6 md:py-8 lg:py-10 bg-gray-50/60 border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-100">
              <Sprout className="w-3.5 h-3.5 text-emerald-600" />
              <span>কৃষি ব্লগ ও চাষাবাদ পরামর্শ</span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              সর্বশেষ কৃষি আর্টিকেল ও টিপস
            </h2>

            <p className="mt-1.5 text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
              আধুনিক খামার সরঞ্জাম, সার প্রয়োগ ও রোগবালাই দমনের বৈজ্ঞানিক গাইডলাইন
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-emerald-600/30 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold transition shrink-0 self-start sm:self-end"
          >
            সকল ব্লগ দেখুন <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Standard Grid Cards (Identical card layout to blogs page) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {latestPosts.map((post) => (
            <BlogCard key={post.id || post._id} post={post} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
}
