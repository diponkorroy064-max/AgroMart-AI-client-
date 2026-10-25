import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  RefreshCw,
  PackageSearch,
} from "lucide-react";
import { getProductById } from "@/lib/api/product";
import { IProduct } from "@/types/Product";
import { ProductAddToCart } from "@/components/products/ProductAddToCart";
import { FavoriteButton } from "@/components/products/FavoriteButton";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const categoryNameMap: Record<string, string> = {
  vegetables: "তাজা শাকসবজি",
  fruits: "মৌসুমি ফলমূল",
  grains: "শস্য ও খাদ্যশস্য",
  seeds: "উন্নত জাতের বীজ",
  fertilizers: "সার ও অনুখাদ্য",
  pesticides: "কীটনাশক ও বালাইনাশক",
  "farm-equipment": "আধুনিক কৃষি যন্ত্রপাতি",
  "organic-products": "খাঁটি অর্গানিক পণ্য",
};

const trustBadges = [
  { icon: ShieldCheck, text: "১০০% খাঁটি পণ্য" },
  { icon: Truck, text: "সারা দেশে দ্রুত ডেলিভারি" },
  { icon: RefreshCw, text: "সহজ রিটার্ন পলিসি" },
];

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProductById(id);
    if (product) {
      return {
        title: `${product.name} | AgroMart AI`,
        description:
          product.description ||
          "অ্যাগ্রোমার্ট মার্কেটপ্লেস থেকে খাঁটি ও তাজা কৃষিপণ্য সংগ্রহ করুন।",
        openGraph: {
          title: `${product.name} | AgroMart AI`,
          description: product.description,
          images: product.image ? [{ url: product.image }] : [],
          type: "website",
        },
      };
    }
  } catch {
    // fallback if API is unreachable
  }

  return {
    title: "পণ্যের বিবরণ | AgroMart AI",
    description: "অ্যাগ্রোমার্ট কৃষি মার্কেটপ্লেসের পণ্যের বিস্তারিত বিবরণ।",
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  let product: IProduct | null = null;
  try {
    product = await getProductById(id);
  } catch {
    product = null;
  }

  // Not Found State
  if (!product) {
    return (
      <div className="container mx-auto py-20 px-4 text-center max-w-lg">
        <div className="bg-white dark:bg-gray-800/60 p-8 sm:p-10 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-gray-800">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            পণ্যটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
            পণ্যটি বর্তমানে অনুপলব্ধ অথবা মার্কেটপ্লেস থেকে সরানো হয়েছে।
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            সকল পণ্য দেখুন
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabel =
    categoryNameMap[product.category?.toLowerCase()] || product.category;

  const availableQty =
    product.availableStock !== undefined
      ? product.availableStock
      : product.quantity || 0;
  const isExpired = Boolean(product.isExpired);

  const productAttributes = [
    {
      label: "মজুত অবস্থা",
      value: isExpired
        ? "মেয়াদোত্তীর্ণ (অনুপলব্ধ)"
        : availableQty > 0
          ? `${availableQty} ${product.unit || "টি"} উপলব্ধ`
          : "মজুত শেষ",
      isAlert: availableQty <= 0 || isExpired,
    },
    {
      label: "বিক্রেতা / খামারি",
      value:
        product.seller?.name ||
        product.farmer?.name ||
        "অনুমোদিত বিশ্বস্ত খামারি",
    },
    ...(product.subcategory
      ? [
        {
          label: "উপ-বিভাগ (Subcategory)",
          value: product.subcategory,
          isAlert: false,
        },
      ]
      : []),
    ...(product.batchNumber
      ? [
        {
          label: "লট / ব্যাচ নম্বর",
          value: product.batchNumber,
          isAlert: false,
        },
      ]
      : []),
    ...(product.expiryDate
      ? [
        {
          label: "মেয়াদোত্তীর্ণের তারিখ",
          value: new Date(product.expiryDate).toLocaleDateString("bn-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          isAlert: isExpired,
        },
      ]
      : []),
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        {/* Back Navigation Link */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> পণ্যের তালিকায় ফিরে যান
          </Link>
        </div>

        {/* Product Card Container */}
        <div className="bg-white dark:bg-gray-800/60 rounded-3xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-10 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Product Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-200/70 dark:border-gray-700/70">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 right-4 z-10">
                <FavoriteButton productId={product._id} variant="circle" />
              </div>
            </div>

            {/* Right: Product Information */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Subcategory Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900">
                    {categoryLabel}
                  </span>
                  {product.subcategory && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      উপ-বিভাগ: {product.subcategory}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-snug">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
                    ৳ {product.price}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    / প্রতি ইউনিট
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-y border-gray-100 dark:border-gray-800 py-4">
                  {product.description ||
                    "এই পণ্যটির জন্য কোনো অতিরিক্ত বিবরণ দেওয়া হয়নি।"}
                </p>

                {/* Attributes (Mapped) */}
                <div className="mt-5 space-y-2 text-xs sm:text-sm">
                  {productAttributes.map((attr, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <span className="font-semibold text-gray-900 dark:text-white min-w-32">
                        {attr.label}:
                      </span>
                      <span
                        className={
                          attr.isAlert
                            ? "text-red-500 font-semibold"
                            : "text-gray-700 dark:text-gray-200"
                        }
                      >
                        {attr.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart Interactive Component */}
              <div className="pt-2">
                <ProductAddToCart product={product} />
              </div>

              {/* Trust Badges (Mapped) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
                {trustBadges.map((badge, idx) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <BadgeIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{badge.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
