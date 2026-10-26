'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import EmptyState from '@/components/dashboard/EmptyState';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { getMyFavorites, removeFavorite } from '@/lib/api/favorite';
import {
  Heart,
  ShoppingCart,
  Search,
  Package,
  Sprout,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { IProduct } from '@/types/Product';

interface FarmerFavoritesClientProps {
  initialFavorites: IProduct[];
}

export default function FarmerFavoritesClient({
  initialFavorites,
}: FarmerFavoritesClientProps) {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState<IProduct[]>(initialFavorites);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সকল');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const { addToCart } = useCart();

  // Fallback sync if server rendered with empty list but client token exists
  useEffect(() => {
    if (token && initialFavorites.length === 0) {
      getMyFavorites(token)
        .then((items) => {
          if (Array.isArray(items) && items.length > 0) {
            setFavorites(items);
          }
        })
        .catch(() => {});
    }
  }, [token, initialFavorites.length]);

  const categories = useMemo(() => {
    const cats = ['সকল', ...Array.from(new Set(favorites.map((p) => p.category)))];
    return cats;
  }, [favorites]);

  const filteredProducts = useMemo(() => {
    return favorites.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === 'সকল' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [favorites, search, selectedCategory]);

  const handleAddToCart = (product: IProduct) => {
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product._id]: false }));
    }, 2000);
  };

  const handleRemoveFavorite = async (id: string) => {
    setFavorites((prev) => prev.filter((p) => p._id !== id));
    if (token) {
      try {
        await removeFavorite(id, token);
      } catch (err) {
        console.error('Failed to remove favorite:', err);
      }
    }
  };

  const totalValue = favorites.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="মোট সংরক্ষিত প্রিয় সামগ্রী"
          value={`${favorites.length} টি পণ্য`}
          icon={<Heart className="text-rose-500 fill-rose-500/20" size={24} />}
        />
        <StatCard
          label="ইন-স্টক সক্রিয় উপকরণ"
          value={`${favorites.filter((p) => p.quantity > 0).length} টি আইটেম`}
          icon={<Package className="text-emerald-600" size={24} />}
        />
        <StatCard
          label="সংরক্ষিত পণ্যের মোট প্রাক্কলিত মূল্য"
          value={`৳ ${totalValue.toLocaleString('bn-BD')}`}
          icon={<Sparkles className="text-amber-500" size={24} />}
        />
      </div>

      {/* Main Content Card */}
      <DashboardCard title="আপনার পছন্দের কৃষি উপকরণের তালিকা">
        {/* Search and Category Filter Strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 pt-2">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="পছন্দের পণ্যের নাম খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Favorite Products Grid */}
        {filteredProducts.length === 0 ? (
          <EmptyState
            icon={<Heart className="w-12 h-12 text-rose-300 dark:text-rose-900" />}
            title="কোনো প্রিয় পণ্য পাওয়া যায়নি"
            description={
              search
                ? 'আপনার সার্চের সাথে মিলে এমন কোনো সংরক্ষিত পণ্য নেই।'
                : 'আপনার পছন্দের তালিকায় এখনো কোনো পণ্য যোগ করেননি। মূল মার্কেটপ্লেসে গিয়ে প্রয়োজনীয় বীজ ও সার সেভ করে রাখুন।'
            }
            action={{
              label: 'মার্কেটপ্লেস ব্রাউজ করুন',
              onClick: () => (window.location.href = '/products'),
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProducts.map((product) => {
              const isAdded = addedIds[product._id];

              return (
                <div
                  key={product._id}
                  className="group relative flex flex-col rounded-2xl border border-gray-200/90 dark:border-gray-700/80 bg-white dark:bg-gray-800/90 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300"
                >
                  {/* Product Image & Badges */}
                  <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <Image
                      width={400}
                      height={300}
                      src={product.image || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/90 backdrop-blur-xs text-emerald-800 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200/80 dark:border-emerald-800 shadow-xs">
                      {product.category}
                    </span>

                    {/* Remove from favorites button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveFavorite(product._id)}
                      title="তালিকা থেকে মুছুন"
                      aria-label="তালিকা থেকে মুছুন"
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors shadow-xs cursor-pointer group/btn"
                    >
                      <Heart className="w-4 h-4 fill-rose-500" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                        <span>বিক্রেতা: {product.seller?.name || 'অনুমোদিত ডিলার'}</span>
                      </div>

                      <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug line-clamp-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Action Row */}
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/80 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 block">বর্তমান মূল্য</span>
                        <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                          ৳ {product.price.toLocaleString('bn-BD')}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.quantity === 0}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold gap-1.5 transition-all shadow-xs cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : product.quantity === 0
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>যোগ হয়েছে</span>
                          </>
                        ) : product.quantity === 0 ? (
                          <span>স্টক শেষ</span>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>কার্টে নিন</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DashboardCard>
    </div>
  );
}
