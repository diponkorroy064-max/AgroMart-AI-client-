import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { BlogPost } from "@/types/blog";

export interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  priorityImage?: boolean;
}

export function BlogCard({
  post,
  variant = "default",
  priorityImage = false,
}: BlogCardProps) {
  if (variant === "featured") {
    return (
      <article className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="relative lg:col-span-7 h-64 sm:h-80 lg:h-full min-h-70 sm:min-h-85 bg-slate-100 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority={priorityImage}
            className="object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700 text-white shadow-xs">
              {post.category}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-3">
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

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-200 leading-snug mb-3">
                {post.title}
              </h2>
            </Link>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="space-y-2 mb-6 hidden sm:block">
                {post.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{takeaway}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                  {post.author.name}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1">
                  {post.author.role}
                </p>
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs"
            >
              সম্পূর্ণ পড়ুন <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // 2. Compact Variant (For Related Posts or Sidebar)
  if (variant === "compact") {
    return (
      <article className="group bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all overflow-hidden flex flex-col justify-between">
        <div className="relative h-40 w-full overflow-hidden bg-slate-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-102 transition-transform duration-300"
          />
          <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-700 text-white shadow-2xs">
            {post.category}
          </span>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5 font-medium">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-600" />
                {post.date}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                {post.readTime}
              </span>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition line-clamp-2 mb-1.5 leading-snug">
                {post.title}
              </h3>
            </Link>

            <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-3">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[11px] font-medium text-slate-600 truncate max-w-32.5">
              {post.author.name}
            </span>
            <Link
              href={`/blog/${post.slug}`}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
            >
              পড়ুন <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // 3. Default Standard Grid Card Variant
  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Card Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priorityImage}
            className="object-cover group-hover:scale-102 transition-transform duration-400"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-semibold shadow-xs">
              {post.category}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-2 font-medium">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {post.date}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              {post.readTime}
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2 mb-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>

          {/* Minimalist Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {post.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="text-xs font-semibold text-slate-700 truncate max-w-32.5">
            {post.author.name}
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition"
        >
          পড়ুন <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
