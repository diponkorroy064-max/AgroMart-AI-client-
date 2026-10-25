import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Products } from "@/data/home-data";


export default async function FeaturedProducts() {
  // const products = await fetchServerFeaturedProducts();
  const displayProducts = Products.slice(0, 6);

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-gray-100">
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

        {/* Compact Product Cards: ONLY Picture, Name, and Price */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayProducts.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xs hover:border-emerald-300 hover:shadow-xs transition"
            >
              {/* Product Picture */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Name & Price ONLY */}
              <div className="p-2.5 sm:p-3 flex flex-col justify-between grow">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-emerald-700 transition line-clamp-2 leading-snug mb-2">
                  {product.name}
                </h3>

                <p className="text-sm font-bold text-emerald-700">
                  ৳ {product.price}
                </p>
              </div>
            </Link>
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
