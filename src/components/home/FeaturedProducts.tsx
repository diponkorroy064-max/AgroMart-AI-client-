"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/api/product';
import { ProductList } from '@/components/ui/ProductList';
import { IProduct } from '@/types/Product';
import { Button } from '@/components/ui/Button';

// Placeholder for a Skeleton Loading Card component if not already defined
const SkeletonCard: React.FC = () => (
  <div className="bg-gray-200 rounded-xl shadow-lg p-4 animate-pulse h-64">
    <div className="h-3/5 bg-gray-300 rounded-lg mb-2"></div>
    <div className="h-4 bg-gray-300 rounded-lg mb-2"></div>
    <div className="h-4 bg-gray-300 rounded-lg w-3/4"></div>
  </div>
);

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        // console.log('data', data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, []);

  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800">Featured Products</h2>
          <p className="mt-3 text-lg text-gray-600">Discover fresh agricultural products from trusted sellers.</p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 text-lg py-8">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-600 text-lg py-8">
            <p>No featured products available at the moment. Please check back later!</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <ProductList products={products.slice(0, 6)} />
            <div className="text-center mt-12">
              <Link href="/products" passHref>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                  View All Products
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
