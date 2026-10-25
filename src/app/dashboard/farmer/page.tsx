'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getMyOrders } from '@/lib/api/order';
import { getMyFavorites } from '@/lib/api/favorite';
import { IOrder } from '@/types/Order';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  ShoppingBag,
  Truck,
  Heart,
  Wallet,
  ArrowRight,
  Sprout,
  FlaskConical,
  Tractor,
  Bug,
  Sparkles,
  Bot,
  ChevronRight,
  ExternalLink,
  Package,
} from 'lucide-react';

interface CategoryShortcut {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  href: string;
}

const CATEGORY_SHORTCUTS: CategoryShortcut[] = [
  {
    title: 'উন্নত জাতের বীজ',
    subtitle: 'উচ্চ ফলনশীল প্রত্যয়িত বীজ',
    icon: Sprout,
    href: '/products?category=seeds',
  },
  {
    title: 'জৈব ও সুষম সার',
    subtitle: 'মাটির উর্বরতা বৃদ্ধিকারী অনুখাদ্য',
    icon: FlaskConical,
    href: '/products?category=fertilizers',
  },
  {
    title: 'আধুনিক কৃষি যন্ত্রপাতি',
    subtitle: 'সেচ পাম্প, স্প্রেয়ার ও পাওয়ার টিলার',
    icon: Tractor,
    href: '/products?category=farm-equipment',
  },
  {
    title: 'নিরাপদ বালাইনাশক',
    subtitle: 'পরিবেশবান্ধব ফসল সুরক্ষা',
    icon: Bug,
    href: '/products?category=pesticides',
  },
];

const AI_TIPS = [
  {
    title: 'রবি ফসল ও আর্দ্রতা সতর্কতা',
    content: 'আগামী সপ্তাহে বাতাসে আর্দ্রতা বৃদ্ধির পূর্বাভাস রয়েছে। আলুর নাবি ধসা রোগ প্রতিরোধে সঠিক ছত্রাকনাশক প্রস্তুত রাখুন।',
    tag: 'মৌসুমি পরামর্শ',
  },
  {
    title: 'সুষম সার প্রয়োগ কৌশল',
    content: 'টমেটো ও সবজিতে ফুল আসার পূর্বে জিংক ও বোরন সমৃদ্ধ তরল অনুখাদ্য ব্যবহার করলে কুঁড়ি ও গুটি ঝরা বন্ধ হয়।',
    tag: 'মাটির পুষ্টি',
  },
];

export default function FarmerDashboardPage() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [favoritesCount, setFavoritesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/farmer' },
    { label: 'কৃষক ওভারভিউ' },
  ];

  useEffect(() => {
    let isMounted = true;
    if (token) {
      Promise.all([
        getMyOrders(token).catch(() => []),
        getMyFavorites(token).catch(() => []),
      ]).then(([fetchedOrders, fetchedFavs]) => {
        if (isMounted) {
          setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
          setFavoritesCount(Array.isArray(fetchedFavs) ? fetchedFavs.length : 0);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  // Derived calculation metrics
  const totalOrdersCount = orders.length;
  const inTransitCount = orders.filter(
    (o) => o.status === 'shipped' || o.status === 'pending'
  ).length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const stats = [
    {
      label: 'মোট সম্পন্ন ক্রয়',
      value: `${totalOrdersCount} টি`,
      subtext: 'আপনার অর্ডার সংখ্যা',
      icon: ShoppingBag,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'চলমান ডেলিভারি',
      value: `${inTransitCount} টি পণ্য`,
      subtext: 'বর্তমানে প্রসেসিং / পথে',
      icon: Truck,
      iconBg: 'bg-blue-50 dark:bg-blue-950/60',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'সংরক্ষিত প্রিয় পণ্য',
      value: `${favoritesCount} টি`,
      subtext: 'পছন্দের তালিকায় সংরক্ষিত',
      icon: Heart,
      iconBg: 'bg-rose-50 dark:bg-rose-950/60',
      iconColor: 'text-rose-500 dark:text-rose-400',
    },
    {
      label: 'উপকরণে মোট ব্যয়',
      value: `৳ ${totalSpent.toLocaleString('bn-BD')}`,
      subtext: 'ক্যাশ অন ডেলিভারিতে ক্রয়',
      icon: Wallet,
      iconBg: 'bg-amber-50 dark:bg-amber-950/60',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <DashboardHeader title="কৃষক ড্যাশবোর্ড" breadcrumb={breadcrumb} />

      {/* Hero Welcome Card: Minimalist, Eye-catching & Clean */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 sm:p-8 text-white shadow-sm border border-emerald-600/30">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-semibold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>কৃষি উপকরণ ও ফসল ব্যবস্থাপনা হাব</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              স্বাগতম, {user?.name || 'খামারি বন্ধু'}!
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
              ন্যায্য মূল্যে উন্নত জাতের বীজ, খাঁটি সার ও আধুনিক কৃষি যন্ত্রপাতি সরাসরি বিশ্বস্ত ডিলারদের কাছ থেকে ক্যাশ অন ডেলিভারিতে অর্ডার করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-800 text-xs sm:text-sm font-bold shadow-xs hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <span>পণ্য অনুসন্ধান করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard/farmer/favorites"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900/40 hover:bg-emerald-900/60 text-white text-xs sm:text-sm font-medium border border-white/20 transition-colors"
            >
              <Heart className="w-4 h-4 text-rose-300" />
              <span>প্রিয় তালিকা</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row (Unified & Minimalist) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group p-5 rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-600/60 hover:shadow-xs transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {stat.label}
                </span>
                <div
                  className={`p-2.5 rounded-xl ${stat.iconBg} ${stat.iconColor} transition-transform group-hover:scale-105`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {isLoading ? '...' : stat.value}
                </h3>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  {stat.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Category Discovery Tiles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
            প্রয়োজনীয় উপকরণ সংগ্রহ (ক্যাশ অন ডেলিভারি)
          </h2>
          <Link
            href="/products"
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
          >
            <span>সকল সামগ্রী</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {CATEGORY_SHORTCUTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group p-4 rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xs transition-all duration-200 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                      {item.title}
                    </h3>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Section: Real Recent Orders & AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Purchases Feed (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700/80">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                সাম্প্রতিক ক্রয় ও ডেলিভারি
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                আপনার সর্বশেষ অর্ডারগুলোর চলমান অবস্থা
              </p>
            </div>
            <Link
              href="/dashboard/farmer/orders"
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              সকল অর্ডার দেখুন →
            </Link>
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-xs text-gray-400">
              অর্ডার তালিকা লোড হচ্ছে...
            </div>
          ) : orders.length === 0 ? (
            <div className="py-8 text-center space-y-3">
              <p className="text-xs text-gray-500">
                আপনার কোনো অর্ডার পাওয়া যায়নি। মার্কেটপ্লেস থেকে পণ্য অর্ডার করুন।
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition"
              >
                <span>পণ্য কিনুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {orders.slice(0, 3).map((order) => {
                const orderId = order.orderNumber || `#ORD-${order._id.slice(-6)}`;
                const firstItem = order.items[0];
                const otherItemsCount = order.items.length - 1;

                const statusLabel =
                  order.status === 'delivered'
                    ? 'ডেলিভারি সম্পন্ন'
                    : order.status === 'shipped'
                    ? 'ডেলিভারির পথে'
                    : order.status === 'confirmed'
                    ? 'নিশ্চিত হয়েছে'
                    : 'অপেক্ষমান';

                const statusClass =
                  order.status === 'delivered'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900'
                    : 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900';

                return (
                  <div
                    key={order._id}
                    className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500">
                          {orderId}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusClass}`}
                        >
                          {statusLabel}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {firstItem?.name || 'কৃষি পণ্য'}
                        {otherItemsCount > 0 && ` (+${otherItemsCount} টি অন্যান্য)`}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        ক্যাশ অন ডেলিভারি • {new Date(order.createdAt).toLocaleDateString('bn-BD')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">
                        ৳ {order.totalAmount}
                      </span>
                      <Link
                        href="/dashboard/farmer/orders"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                      >
                        ট্র্যাক করুন
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* AI Krishi Assistant Card (1 Col) */}
        <div className="rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700/80">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  স্মার্ট কৃষি পরামর্শক
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-900">
                সক্রিয়
              </span>
            </div>

            {AI_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 space-y-1.5"
              >
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/70 px-2 py-0.5 rounded">
                  {tip.tag}
                </span>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                  {tip.title}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-700/80">
            <Link
              href="/blog"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-2xs"
            >
              <span>কৃষি ব্লগ ও সমাধান পড়ুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
