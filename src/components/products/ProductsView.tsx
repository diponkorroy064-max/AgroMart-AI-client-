"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  PackageSearch,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { IProduct } from "@/types/Product";
import { getAllProducts } from "@/lib/api/product";
import { getCategories } from "@/lib/api/category";
import { ICategory } from "@/types/Category";
import { ProductList } from "@/components/ui/ProductList";

const sortOptions = [
  { value: "", label: "ডিফল্ট ক্রমানুসার (সর্বশেষ)" },
  { value: "low", label: "মূল্য: কম থেকে বেশি" },
  { value: "high", label: "মূল্য: বেশি থেকে কম" },
  { value: "name", label: "নাম অনুযায়ী (অ - ক্ষ)" },
];

const ITEMS_PER_PAGE = 15;

// Bengali number formatter
const formatBengaliNumber = (num: number) => {
  return Number(num || 0).toLocaleString("bn-BD");
};

export function ProductsView() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [products, setProducts] = useState<IProduct[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("");
  const [sort, setSort] = useState("");

  // Fetch active categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories({ status: "active" });
        if (res?.categories && res.categories.length > 0) {
          setDynamicCategories(res.categories);
        }
      } catch (err) {
        console.error("Failed to load active categories for product filter:", err);
      }
    };
    loadCategories();
  }, []);

  // Sync category from URL parameter directly with dynamic categories
  useEffect(() => {
    if (!urlCategory) {
      setCategory("All");
      return;
    }
    const catLower = urlCategory.toLowerCase().trim();
    if (dynamicCategories.length > 0) {
      const matched = dynamicCategories.find(
        (c) =>
          c.slug.toLowerCase() === catLower ||
          c.name.toLowerCase() === catLower ||
          c.name.toLowerCase().includes(catLower)
      );
      if (matched) {
        setCategory(matched.slug);
      } else {
        setCategory(urlCategory);
      }
    } else {
      setCategory(urlCategory);
    }
    setPage(1);
  }, [urlCategory, dynamicCategories]);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch active categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories({ status: "active" });
        if (res?.categories && res.categories.length > 0) {
          setDynamicCategories(res.categories);
        }
      } catch (err) {
        console.error("Failed to load active categories for product filter:", err);
      }
    };
    loadCategories();
  }, []);

  // Debounce search input to avoid unnecessary requests on every keypress
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch paginated products from server
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProducts({
        search: debouncedSearch.trim(),
        category: category === "All" ? "" : category,
        subcategory: subcategory === "All" || !subcategory ? "" : subcategory,
        sort,
        page,
        limit: ITEMS_PER_PAGE,
      });

      if (data?.products) {
        setProducts(data.products);
        setTotalPages(data.totalPages || 1);
        setTotalProducts(data.total || 0);
      } else {
        setProducts([]);
        setTotalPages(1);
        setTotalProducts(0);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
      setTotalPages(1);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, subcategory, sort, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Active Category & Subcategories
  const activeCategoryObj = useMemo(() => {
    if (category === "All") return null;
    return dynamicCategories.find(
      (c) => c.name.toLowerCase() === category.toLowerCase() || c.slug === category.toLowerCase()
    );
  }, [category, dynamicCategories]);

  const activeSubcategories = useMemo(() => {
    return activeCategoryObj?.subcategories?.filter((s) => s.status !== "inactive") || [];
  }, [activeCategoryObj]);

  // Handle Category Change
  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    setSubcategory("");
    setPage(1);
  };

  // Handle Subcategory Change
  const handleSubcategoryChange = (newSub: string) => {
    setSubcategory(newSub);
    setPage(1);
  };

  // Handle Sort Change
  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(1);
  };

  // Handle Page Change with Smooth Scroll
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  // Calculate current item range (e.g. ১ - ১৫)
  const startItem = totalProducts > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endItem = Math.min(page * ITEMS_PER_PAGE, totalProducts);

  // Generate pagination page numbers array with ellipsis
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    if (page <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
    return pages;
  }, [page, totalPages]);

  const selectClasses =
    "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 px-4 py-3 text-xs sm:text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer";

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-4 sm:p-5 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Search Box (6 cols) */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="পণ্য বা উপকরণের নাম দিয়ে খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 pl-10 pr-9 py-3 text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5 rounded cursor-pointer"
                title="অনুসন্ধান মুছুন"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={selectClasses}
            >
              <option value="All">সকল ক্যাটাগরি</option>
              {dynamicCategories.map((item) => (
                <option key={item._id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className={selectClasses}
            >
              {sortOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Pills Row (if category selected and has subcategories) */}
          {activeSubcategories.length > 0 && (
            <div className="md:col-span-12 flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700/60 animate-in fade-in duration-200">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">
                উপ-ক্যাটাগরি:
              </span>
              <button
                type="button"
                onClick={() => handleSubcategoryChange("")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer shrink-0 ${
                  !subcategory
                    ? "bg-emerald-600 text-white font-semibold shadow-xs"
                    : "bg-gray-100 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                সকল
              </button>
              {activeSubcategories.map((sub) => (
                <button
                  key={sub._id}
                  type="button"
                  onClick={() => handleSubcategoryChange(sub.name)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer shrink-0 ${
                    subcategory === sub.name
                      ? "bg-emerald-600 text-white font-semibold shadow-xs"
                      : "bg-gray-100 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Catalog Header & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          মার্কেটপ্লেসের পণ্যসমূহ
        </h2>
        <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
          <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>
            {totalProducts > 0
              ? `মোট ${formatBengaliNumber(totalProducts)} টি পণ্যের মধ্যে ${formatBengaliNumber(startItem)}–${formatBengaliNumber(endItem)} টি প্রদর্শিত`
              : "০ টি পণ্য"}
          </span>
        </div>
      </div>

      {/* Products Grid / States */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl sm:rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800/60 p-3 sm:p-3.5 space-y-2.5 animate-pulse"
            >
              <div className="aspect-square w-full rounded-lg bg-gray-100 dark:bg-gray-800" />
              <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-4/5" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-12 sm:p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-gray-800">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            অন্য কোনো ক্যাটাগরি নির্বাচন করুন বা সঠিক কীওয়ার্ড দিয়ে পুনরায় অনুসন্ধান করুন।
          </p>
          {(search || category !== "All" || subcategory || sort) && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSubcategory("");
                setSort("");
                setPage(1);
              }}
              className="mt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <ProductList products={products} />

          {/* Minimalist 15-Item Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              {/* Pagination Info */}
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                পৃষ্ঠা <span className="font-bold text-gray-900 dark:text-white">{formatBengaliNumber(page)}</span> এর{" "}
                <span className="font-bold text-gray-900 dark:text-white">{formatBengaliNumber(totalPages)}</span>{" "}
                (প্রতি পৃষ্ঠায় ১৫টি পণ্য)
              </p>

              {/* Page Buttons */}
              <div className="flex items-center gap-1.5 self-center sm:self-auto">
                {/* Previous Page Button */}
                <button
                  type="button"
                  disabled={page <= 1 || loading}
                  onClick={() => handlePageChange(page - 1)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-2xs"
                  title="পূর্ববর্তী পৃষ্ঠা"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">পূর্ববর্তী</span>
                </button>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1">
                  {pageNumbers.map((p, index) =>
                    p === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="w-8 h-8 flex items-center justify-center text-xs text-gray-400 select-none"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={`page-${p}`}
                        type="button"
                        disabled={loading}
                        onClick={() => handlePageChange(Number(p))}
                        className={`w-8.5 h-8.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center ${
                          page === p
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                        }`}
                      >
                        {formatBengaliNumber(Number(p))}
                      </button>
                    )
                  )}
                </div>

                {/* Next Page Button */}
                <button
                  type="button"
                  disabled={page >= totalPages || loading}
                  onClick={() => handlePageChange(page + 1)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/60 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-2xs"
                  title="পরবর্তী পৃষ্ঠা"
                >
                  <span className="hidden sm:inline">পরবর্তী</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
