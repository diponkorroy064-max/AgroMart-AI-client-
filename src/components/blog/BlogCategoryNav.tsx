import Link from "next/link";

interface CategoryItem {
  name: string;
  slug: string;
}

interface BlogCategoryNavProps {
  categories: CategoryItem[];
  activeCategory?: string;
  currentSearch?: string;
}

export function BlogCategoryNav({
  categories,
  activeCategory = "all",
  currentSearch = "",
}: BlogCategoryNavProps) {
  return (
    <nav aria-label="ব্লগ ক্যাটাগরি" className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive =
            activeCategory === cat.slug ||
            (!activeCategory && cat.slug === "all");

          // Construct target URL preserving search query
          const params = new URLSearchParams();
          if (cat.slug !== "all") {
            params.set("category", cat.slug);
          }
          if (currentSearch.trim()) {
            params.set("q", currentSearch.trim());
          }
          const queryString = params.toString();
          const href = queryString ? `/blog?${queryString}` : "/blog";

          return (
            <Link
              key={cat.slug}
              href={href}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                isActive
                  ? "bg-emerald-700 text-white shadow-xs font-semibold"
                  : "bg-white text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 border border-slate-200/80"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
