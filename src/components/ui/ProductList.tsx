'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from './Card';
import { Button } from './Button';
import { IProduct } from '@/types/Product';
import { useCart } from '@/contexts/CartContext';
import { ArrowRight } from 'lucide-react';


interface ProductListProps {
  products: IProduct[];
  onEdit?: (product: IProduct) => void;
  onDelete?: (productId: string) => void;
  showControls?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
  showControls = false,
}) => {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product._id}
          className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          {/* Product Image */}
          <div className="relative h-56 w-full">
            <Image
              src={product.image || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Card Body */}
          <div className="p-5">
            <h3 className="text-xl font-bold text-green-700">
              {product.name}
            </h3>

            <p className="text-gray-600 mt-2 line-clamp-2">
              {product.description}
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Price:</span>{" "}
                <span className="text-green-600 font-bold">
                  ৳ {product.price}
                </span>
              </p>

              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {product.quantity}
              </p>

              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>

              <p>
                <span className="font-semibold">Seller:</span>{" "}
                {product.seller?.name ?? "Unknown Seller"}
              </p>
            </div>

            {/* Farmer Dashboard Buttons */}
            {showControls ? (
              <div className="flex gap-2 mt-6">
                <Button
                  className="flex-1"
                  onClick={() => onEdit?.(product)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => onDelete?.(String(product._id))}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <div className="flex justify-around items-center mt-6">
                <Link href={`/products/${product._id}`} className="block">
                  <Button variant="outline" className="w-35">
                    Details <ArrowRight/>
                  </Button>
                </Link>

                <Button
                  className="w-35 bg-green-600 hover:bg-green-700"
                  onClick={() => addToCart(product, 1)}
                >
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

