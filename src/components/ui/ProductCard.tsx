import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/Product";
import { getFileUrl } from "@/lib/api/auth";

interface ProductCardProps {
  product: IProduct;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const productId = String(product._id);
  const imageSrc = getFileUrl(product.image) || product.image || "/placeholder.png";

  return (
    <Link
      href={`/products/${productId}`}
      className={`group flex flex-col bg-white dark:bg-gray-800/60 rounded-xl sm:rounded-2xl border border-gray-200/80 dark:border-gray-700/80 overflow-hidden hover:border-emerald-300 dark:hover:border-emerald-600/80 hover:shadow-xs transition-all duration-200 ${className}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Stock Availability Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.isExpired ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-600/90 text-white backdrop-blur-xs shadow-xs">
              মেয়াদ শেষ
            </span>
          ) : (product.quantity || 0) <= 0 ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-600/90 text-white backdrop-blur-xs shadow-xs">
              স্টক শেষ
            </span>
          ) : (product.quantity || 0) <= (product.lowStockThreshold || 5) ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/90 text-white backdrop-blur-xs shadow-xs">
              স্বল্প স্টক: {product.quantity} {product.unit || "টি"}
            </span>
          ) : null}
        </div>
      </div>

      {/* Product Details: Name, Unit Price & Availability */}
      <div className="p-3 sm:p-3.5 flex flex-col justify-between grow">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          {product.name}
        </h3>

        <div className="mt-1 flex items-baseline justify-between">
          <p className="text-sm sm:text-base font-extrabold text-emerald-700 dark:text-emerald-400">
            ৳ {product.price}
            <span className="text-[11px] font-normal text-gray-400 ml-1">
              /{product.unit || "কেজি"}
            </span>
          </p>
          {(product.quantity || 0) > 0 && !product.isExpired && (
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              স্টকে আছে
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
