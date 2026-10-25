"use client";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";

interface BlogSearchProps {
  initialSearch?: string;
  currentCategory?: string;
}

export function BlogSearch({
  initialSearch = "",
  currentCategory = "all",
}: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    startTransition(() => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      if (term.trim()) {
        params.set("q", term.trim());
      } else {
        params.delete("q");
      }

      // Preserve category if already selected
      if (currentCategory && currentCategory !== "all") {
        params.set("category", currentCategory);
      }

      const queryString = params.toString();
      router.push(queryString ? `/blog?${queryString}` : "/blog", {
        scroll: false,
      });
    });
  };

  const handleClear = () => {
    setSearchTerm("");
    startTransition(() => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.delete("q");
      if (currentCategory && currentCategory !== "all") {
        params.set("category", currentCategory);
      }
      const queryString = params.toString();
      router.push(queryString ? `/blog?${queryString}` : "/blog", {
        scroll: false,
      });
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="relative w-full max-w-xl mx-auto"
    >
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-slate-400 pointer-events-none">
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </span>

        <input
          type="search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="বিষয় খুঁজুন (উদাঃ ছাগল পালন, সার প্রয়োগ, স্প্রিংকলার)..."
          className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition-all shadow-2xs"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="অনুসন্ধান মুছুন"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </form>
  );
}
