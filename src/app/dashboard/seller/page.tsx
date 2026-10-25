'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Plus,
  Boxes,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Store,
  MapPin,
  AlertCircle,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IProduct, SellerProductStats, ProductStatus } from '@/types/Product';
import { IOrder } from '@/types/Order';
import { getSellerProducts } from '@/lib/api/product';
import { getSellerOrders } from '@/lib/api/order';

// Safe image URL resolver
const resolveImageUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '')
    : 'http://localhost:5000';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

// Bengali date formatting
const formatBengaliDate = (dateInput?: string | Date) => {
  if (!dateInput) return 'তারিখ অনুপলব্ধ';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(dateInput);
  }
};

// Bengali number formatting
const formatBengaliNumber = (num: number) => {
  return Number(num || 0).toLocaleString('bn-BD');
};

function SellerDashboardPage() {
  const { user, token } = useAuth();

  // Dynamic States
  const [products, setProducts] = useState<IProduct[]>([]);
  const [counts, setCounts] = useState<SellerProductStats>({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/seller' },
    { label: 'বিক্রেতা ওভারভিউ' },
  ];

  // Fetch all dynamic data for the seller
  const loadDashboardData = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      setError(null);

      const [productRes, orderRes] = await Promise.all([
        getSellerProducts('all').catch((err) => {
          console.error('Error fetching seller products:', err);
          return { products: [], counts: { total: 0, approved: 0, pending: 0, rejected: 0 } };
        }),
        getSellerOrders(token || undefined).catch((err) => {
          console.error('Error fetching seller orders:', err);
          return [];
        }),
      ]);

      setProducts(productRes.products || []);
      if (productRes.counts) {
        setCounts(productRes.counts);
      }
      setOrders(Array.isArray(orderRes) ? orderRes : []);
    } catch (err: any) {
      console.error('Failed to load seller dashboard data:', err);
      setError(err?.message || 'ড্যাশবোর্ড ডাটা লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleManualRefresh = () => {
    setRefreshing(true);
    loadDashboardData(true);
  };

  // Dynamic Metrics Derived Calculations
  const totalProducts = counts.total || products.length;
  const approvedProducts = counts.approved;
  const pendingProducts = counts.pending;

  // Real Low Stock items (quantity <= 5)
  const lowStockProducts = products.filter(
    (p) => p.quantity !== undefined && Number(p.quantity) <= 5
  );

  // Total inventory stock units
  const totalStockUnits = products.reduce((acc, p) => acc + (Number(p.quantity) || 0), 0);

  // Total inventory monetary value
  const totalInventoryValue = products.reduce(
    (acc, p) => acc + (Number(p.price) || 0) * (Number(p.quantity) || 0),
    0
  );

  // Orders Calculations
  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const confirmedOrders = orders.filter((o) => o.status === 'confirmed' || o.status === 'shipped');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');

  // Total sales volume from orders
  const totalOrderRevenue = orders.reduce((acc, o) => acc + (Number(o.totalAmount) || 0), 0);

  // Status Badge for Orders
  const renderOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
            ডেলিভারি সম্পন্ন
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Truck size={12} className="text-blue-600 dark:text-blue-400" />
            কুরিয়ারে হস্তান্তর
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
            <Package size={12} className="text-purple-600 dark:text-purple-400" />
            প্রসেসিং চলছে
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            <XCircle size={12} className="text-rose-600 dark:text-rose-400" />
            বাতিলকৃত
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Clock size={12} className="text-amber-600 dark:text-amber-400" />
            অপেক্ষমান
          </span>
        );
    }
  };

  // Status Badge for Products
  const renderProductStatusBadge = (status?: ProductStatus) => {
    const current = status || 'approved';
    switch (current) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={11} /> লাইভ
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Clock size={11} /> অপেক্ষায়
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            <XCircle size={11} /> বাতিল
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb & Refresh Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <DashboardHeader title="বিক্রেতা ড্যাশবোর্ড" breadcrumb={breadcrumb} />
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            স্বাগতম,{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {user?.name || 'সম্মানিত বিক্রেতা'}
            </span>
            ! আপনার দোকানের ইনভেন্টরি ও সাম্প্রতিক বিক্রয় তথ্য এখানে প্রদর্শিত হচ্ছে।
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            onClick={handleManualRefresh}
            variant="secondary"
            disabled={loading || refreshing}
            className="flex items-center gap-2 text-xs sm:text-sm px-3.5 py-2 cursor-pointer shadow-2xs"
            title="লাইভ ডাটা রিফ্রেশ করুন"
          >
            <RefreshCw size={14} className={refreshing || loading ? 'animate-spin text-emerald-600' : ''} />
            <span>{refreshing ? 'আপডেট হচ্ছে...' : 'রিফ্রেশ'}</span>
          </Button>

          <Link
            href="/dashboard/seller/products"
            className="flex items-center gap-2 text-xs sm:text-sm px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm cursor-pointer transition"
          >
            <Plus size={15} />
            <span>নতুন পণ্য যোগ করুন</span>
          </Link>
        </div>
      </div>

      {/* 2. Error Notification Banner */}
      {error && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800 text-sm">
          <div className="flex items-center gap-2.5">
            <AlertCircle size={18} className="text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => loadDashboardData()}
            className="text-xs font-semibold text-rose-700 dark:text-rose-300 underline hover:no-underline cursor-pointer"
          >
            পুনরায় চেষ্টা করুন
          </button>
        </div>
      )}

      {/* 3. Hero Store Summary Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-800 via-teal-800 to-green-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-emerald-100 border border-white/20">
              <Sparkles size={13} className="text-yellow-300" />
              <span>লাইভ বিক্রেতা প্যানেল • এগ্রোমার্ট মার্কেটপ্লেস</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              দোকান ওভারভিউ ও ব্যবসায়িক বিশ্লেষণ
            </h2>

            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
              সরাসরি কৃষকদের সাথে যুক্ত থেকে বীজ, সার ও কৃষি সরঞ্জাম বিক্রয় পরিচালনা করুন। আপনার ইনভেন্টরির সঠিক হিসাব রাখুন এবং গ্রাহকের অর্ডার দ্রুত ডেলিভারি করুন।
            </p>

            {/* Quick Stats Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs">
                <Package size={14} className="text-emerald-300" />
                <span>
                  অনুমোদিত পণ্য: <strong className="text-white font-bold">{approvedProducts}</strong> টি
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs">
                <ShoppingCart size={14} className="text-amber-300" />
                <span>
                  নতুন অর্ডার: <strong className="text-white font-bold">{pendingOrders.length}</strong> টি
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs">
                <Boxes size={14} className="text-blue-300" />
                <span>
                  মোট মজুত ইউনিট: <strong className="text-white font-bold">{totalStockUnits}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 sm:min-w-57.5">
            <Link
              href="/dashboard/seller/products"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-emerald-50 text-emerald-950 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <Plus size={16} className="text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>পণ্য তালিকা ও ইনভেন্টরি</span>
            </Link>

            <Link
              href="/dashboard/seller/orders"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-xs group"
            >
              <Truck size={16} className="text-emerald-300 group-hover:scale-110 transition-transform" />
              <span>অর্ডার ব্যবস্থাপনা ({pendingOrders.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Dynamic KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1: Total Products */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">দোকানের মোট পণ্য</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Package size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {loading ? '...' : totalProducts} <span className="text-xs font-normal text-gray-500">টি</span>
          </p>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/60 pt-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {approvedProducts} লাইভ
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              {pendingProducts} অপেক্ষমান
            </span>
          </div>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">গ্রাহকদের মোট অর্ডার</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShoppingCart size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {loading ? '...' : totalOrdersCount} <span className="text-xs font-normal text-gray-500">টি</span>
          </p>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/60 pt-2">
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              {pendingOrders.length} টি প্রসেসিং বাকি
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {confirmedOrders.length} টি কুরিয়ারে
            </span>
          </div>
        </div>

        {/* Metric 3: Total Sales Revenue */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">মোট অর্ডার মূল্য</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <DollarSign size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            ৳ {loading ? '...' : formatBengaliNumber(totalOrderRevenue)}
          </p>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/60 pt-2">
            <span>ক্যাশ অন ডেলিভারি</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {deliveredOrders.length} সম্পন্ন
            </span>
          </div>
        </div>

        {/* Metric 4: Low Stock Alert */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">স্বল্প মজুত সতর্কতা</span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                lowStockProducts.length > 0
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
              }`}
            >
              <AlertTriangle size={18} />
            </div>
          </div>
          <p
            className={`mt-3 text-2xl sm:text-3xl font-extrabold ${
              lowStockProducts.length > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'
            }`}
          >
            {loading ? '...' : lowStockProducts.length} <span className="text-xs font-normal text-gray-500">টি পণ্য</span>
          </p>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/60 pt-2">
            <span>স্টক সীমা: ≤ ৫ টি</span>
            {lowStockProducts.length > 0 ? (
              <span className="text-rose-600 dark:text-rose-400 font-bold">রিফিল প্রয়োজন</span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">স্টক সন্তোষজনক</span>
            )}
          </div>
        </div>
      </div>

      {/* 5. Main Content: Recent Orders & Side Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column: Recent Orders (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Orders Box */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <ShoppingCart size={18} className="text-emerald-600" />
                  <span>গ্রাহক ও কৃষকদের সাম্প্রতিক অর্ডার</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  আপনার বিক্রয় পণ্যের সর্বশেষ অর্ডারসমূহ
                </p>
              </div>

              <Link
                href="/dashboard/seller/orders"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:underline"
              >
                <span>সকল অর্ডার</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                <RefreshCw size={24} className="animate-spin mx-auto text-emerald-500 mb-2" />
                <p>অর্ডার তথ্য লোড হচ্ছে...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3">
                  <ShoppingBag size={24} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  এখনো কোনো নতুন অর্ডার আসেনি
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-1 leading-relaxed">
                  আপনার দোকানের অনুমোদিত পণ্যগুলো কৃষকদের মার্কেটপ্লেসে প্রদর্শিত হচ্ছে। কোনো অর্ডার এলে তাৎক্ষণিকভাবে এখানে দেখতে পাবেন।
                </p>
                <div className="mt-4">
                  <Link
                    href="/dashboard/seller/products"
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer transition"
                  >
                    পণ্য তালিকা চেক করুন
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                  <thead className="bg-gray-50/80 dark:bg-gray-900/40 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      <th className="px-4 py-3">অর্ডার নং</th>
                      <th className="px-4 py-3">ক্রেতা ও জেলা</th>
                      <th className="px-4 py-3">পণ্য সংখ্যা</th>
                      <th className="px-4 py-3">মোট মূল্য</th>
                      <th className="px-4 py-3">স্ট্যাটাস</th>
                      <th className="px-4 py-3 text-right">পদক্ষেপ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                    {orders.slice(0, 5).map((order) => {
                      const itemCount = order.items?.reduce((sum, it) => sum + (it.quantity || 1), 0) || 1;
                      const firstItemName = order.items?.[0]?.name || 'কৃষি পণ্য';
                      const extraItemsCount = (order.items?.length || 1) - 1;

                      return (
                        <tr
                          key={String(order._id)}
                          className="hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="px-4 py-3.5">
                            <span className="font-bold text-xs text-gray-900 dark:text-white">
                              {order.orderNumber || `#${String(order._id).slice(-6).toUpperCase()}`}
                            </span>
                            <span className="block text-[10px] text-gray-400">
                              {formatBengaliDate(order.createdAt)}
                            </span>
                          </td>

                          <td className="px-4 py-3.5">
                            <p className="font-semibold text-xs text-gray-900 dark:text-white">
                              {order.customerName || order.shippingAddress?.name || 'সম্মানিত কৃষক'}
                            </p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                              <MapPin size={11} className="text-gray-400 shrink-0" />
                              <span>{order.shippingAddress?.district || order.shippingAddress?.city || 'বাংলাদেশ'}</span>
                            </p>
                          </td>

                          <td className="px-4 py-3.5 text-xs">
                            <p className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
                              {firstItemName}
                            </p>
                            <span className="text-[10px] text-gray-400">
                              মোট {itemCount} টি ইউনিট {extraItemsCount > 0 ? `(+${extraItemsCount} টি পণ্য)` : ''}
                            </span>
                          </td>

                          <td className="px-4 py-3.5 font-bold text-xs text-emerald-700 dark:text-emerald-400">
                            ৳ {formatBengaliNumber(order.totalAmount)}
                          </td>

                          <td className="px-4 py-3.5">
                            {renderOrderStatusBadge(order.status)}
                          </td>

                          <td className="px-4 py-3.5 text-right">
                            <Link href="/dashboard/seller/orders">
                              <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-2xs">
                                প্রসেস
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Products Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <Package size={18} className="text-emerald-600" />
                  <span>দোকানের সম্প্রতি যুক্ত পণ্যসমূহ</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  সর্বশেষ আপলোড করা পণ্যের অনুমোদন ও মজুত পরিস্থিতি
                </p>
              </div>

              <Link
                href="/dashboard/seller/products"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:underline"
              >
                <span>ইনভেন্টরি দেখুন</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                <RefreshCw size={24} className="animate-spin mx-auto text-emerald-500 mb-2" />
                <p>পণ্য লোড হচ্ছে...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  আপনার দোকানে এখনো কোনো পণ্য যোগ করা হয়নি।
                </p>
                <Link
                  href="/dashboard/seller/products"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-2xs transition cursor-pointer"
                >
                  <Plus size={14} /> প্রথম পণ্য যোগ করুন
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {products.slice(0, 4).map((product) => {
                  const imageSrc = product.image ? resolveImageUrl(product.image) : '/placeholder.png';
                  return (
                    <div
                      key={String(product._id)}
                      className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700 shadow-2xs">
                          {product.image ? (
                            <Image
                              src={imageSrc}
                              alt={product.name}
                              fill
                              unoptimized={true}
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package size={20} />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            <span>{product.category}</span>
                            <span>•</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              ৳ {formatBengaliNumber(product.price)}
                            </span>
                            <span>•</span>
                            <span className={Number(product.quantity) <= 5 ? 'text-rose-500 font-semibold' : ''}>
                              মজুত: {product.quantity} টি
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {renderProductStatusBadge(product.status)}
                        <Link href="/dashboard/seller/products">
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-700 transition cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <ExternalLink size={14} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Low Stock Alerts & Quick Operations (1 col) */}
        <div className="space-y-6">
          {/* Low Stock Alerts Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <AlertTriangle
                  size={16}
                  className={lowStockProducts.length > 0 ? 'text-rose-600' : 'text-emerald-600'}
                />
                <span>মজুত সতর্কতা (Low Stock)</span>
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  lowStockProducts.length > 0
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                }`}
              >
                {lowStockProducts.length} টি পণ্য
              </span>
            </div>

            <div className="p-4 space-y-3">
              {lowStockProducts.length > 0 ? (
                <>
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
                    <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      নিচের পণ্যগুলোর স্টক ৫ বা তার কম। নিরবচ্ছিন্ন বিক্রয় নিশ্চিত করতে দ্রুত মজুত বাড়ান।
                    </p>
                  </div>

                  <div className="space-y-2">
                    {lowStockProducts.slice(0, 4).map((item) => (
                      <div
                        key={String(item._id)}
                        className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/40 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400">
                            ক্যাটাগরি: {item.category}
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                            মজুত: {item.quantity} টি
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/dashboard/seller/products"
                    className="block pt-1 text-center py-2 px-3 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition cursor-pointer"
                  >
                    ইনভেন্টরি রিফিল করুন
                  </Link>
                </>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-2">
                    <CheckCircle2 size={22} />
                  </div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                    পর্যাপ্ত মজুত রয়েছে
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    আপনার সব পণ্যে পর্যাপ্ত স্টক বিদ্যমান। কোনো পণ্য স্বল্প মজুত তালিকায় নেই।
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Operations & Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs p-5 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Store size={16} className="text-emerald-600" />
              <span>বিক্রেতা অপারেশন ও শর্টকাট</span>
            </h3>

            <div className="space-y-2.5">
              <Link href="/dashboard/seller/products" className="block group">
                <div className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                      <Plus size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition">
                        নতুন পণ্য যোগ করুন
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        বীজ, সার বা কৃষি যন্ত্রপাতি আপলোড
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/dashboard/seller/products" className="block group">
                <div className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                      <Boxes size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition">
                        ইনভেন্টরি ও মূল্য ব্যবস্থাপনা
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        পণ্যের মূল্য ও মজুত সংখ্যা আপডেট
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/dashboard/seller/orders" className="block group">
                <div className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-purple-500/50 hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                      <Truck size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition">
                        ক্রেতাদের অর্ডার ও শিপমেন্ট
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        অর্ডার প্রসেস ও কুরিয়ার হস্তান্তর
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/dashboard/seller/profile" className="block group">
                <div className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-amber-500/50 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                      <Store size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-amber-600 transition">
                        দোকান ও বিক্রেতা প্রোফাইল
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        ব্যবসার ঠিকানা ও যোগাযোগের তথ্য
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(SellerDashboardPage, ['seller']);
