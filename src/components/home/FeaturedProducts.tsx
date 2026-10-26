import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Products } from "@/data/home-data";
import { getAllProducts } from "@/lib/api/product";
import { ProductCard } from "@/components/ui/ProductCard";
import { IProduct } from "@/types/Product";

export default async function FeaturedProducts() {
  let displayProducts: IProduct[] = [];
  try {
    const res = await getAllProducts({ limit: 6 });
    if (res?.products && res.products.length > 0) {
      displayProducts = res.products.slice(0, 6);
    }
  } catch (err) {
    console.error("[FeaturedProducts] Failed to load server products:", err);
  }

  // Fallback to static products if server returned no products
  if (displayProducts.length === 0) {
    displayProducts = Products.slice(0, 6);
  }

  return (
    <section className="py-6 md:py-8 lg:py-10 bg-white border-b border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>কৃষক ও খামারিদের পছন্দের পণ্য</span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            জনপ্রিয় কৃষি পণ্য ও উপকরণ
          </h2>

          <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            সেরা মানের সার, বীজ, কীটনাশক ও আধুনিক খামার যন্ত্রপাতি
          </p>
        </div>

        {/* Product Cards using shared ProductCard component */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayProducts.map((product) => (
            <ProductCard key={String(product._id)} product={product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition shadow-sm cursor-pointer"
          >
            সকল পণ্য দেখুন
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
