'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  Truck,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
  MapPin,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IProduct, ProductStatus } from '@/types/Product';
import {
  getAdminStats,
  updateProductStatusByAdmin,
  AdminDashboardStats,
} from '@/lib/api/admin';

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

// Bengali date formatter
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

// Bengali number formatter
const formatBengaliNumber = (num: number) => {
  return Number(num || 0).toLocaleString('bn-BD');
};

function AdminDashboardPage() {
  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/admin' },
    { label: 'অ্যাডমিন ওভারভিউ' },
  ];

  // Dynamic States
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [pendingProducts, setPendingProducts] = useState<IProduct[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Fetch Admin Stats
  const loadStats = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      const res = await getAdminStats();
      if (res.success && res.stats) {
        setStats(res.stats);
        setPendingProducts(res.recentPendingProducts || []);
        setRecentOrders(res.recentOrders || []);
      }
    } catch (err: any) {
      console.error('Failed to load admin stats:', err);
      showNotification('error', err?.message || 'অ্যাডমিন ড্যাশবোর্ড তথ্য লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleManualRefresh = () => {
    setRefreshing(true);
    loadStats(true);
  };

  // Quick 1-click approve or reject
  const handleQuickStatusUpdate = async (productId: string, newStatus: ProductStatus) => {
    try {
      setActionInProgress(productId);
      await updateProductStatusByAdmin(productId, newStatus);
      showNotification(
        'success',
        newStatus === 'approved' ? 'পণ্য সফলভাবে অনুমোদন করা হয়েছে' : 'পণ্য বাতিল করা হয়েছে'
      );
      // Optimistically remove from pending list
      setPendingProducts((prev) => prev.filter((p) => String(p._id) !== productId));
      // Refresh stats in background
      loadStats(true);
    } catch (err: any) {
      console.error('Failed to update product status:', err);
      showNotification('error', err?.message || 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
    } finally {
      setActionInProgress(null);
    }
  };

  // Reusable Order Status Badge (DRY)
  const renderOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={12} /> ডেলিভারি সম্পন্ন
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Truck size={12} /> কুরিয়ারে
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
            <Package size={12} /> নিশ্চিতকৃত
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            <XCircle size={12} /> বাতিল
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Clock size={12} /> অপেক্ষমান
          </span>
        );
    }
  };

  // User distribution calculations
  const totalUsers = stats?.users?.total || 0;
  const farmerPercent = totalUsers > 0 ? Math.round(((stats?.users?.farmers || 0) / totalUsers) * 100) : 0;
  const sellerPercent = totalUsers > 0 ? Math.round(((stats?.users?.sellers || 0) / totalUsers) * 100) : 0;
  const adminPercent = totalUsers > 0 ? Math.max(0, 100 - farmerPercent - sellerPercent) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Minimalist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <DashboardHeader title="অ্যাডমিন কন্ট্রোল ড্যাশবোর্ড" breadcrumb={breadcrumb} />
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            প্ল্যাটফর্মের সার্বিক ব্যবহারকারী, পণ্য অনুমোদন ও রিয়েল-টাইম লেনদেনের সংক্ষিপ্ত চিত্র।
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
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
            href="/dashboard/admin/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm cursor-pointer transition"
          >
            <CheckCircle2 size={15} />
            <span>পণ্য যাচাই ও অনুমোদন ({stats?.products?.pending || 0})</span>
          </Link>
        </div>
      </div>

      {/* 2. Notification Toast */}
      {notification && (
        <div
          className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-medium transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle size={18} className="text-rose-600 dark:text-rose-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 3. Minimalist 4-KPI Metric Cards Grid (No horizontal overflow!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Metric 1: Total Users */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">প্ল্যাটফর্ম ব্যবহারকারী</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {loading ? '...' : formatBengaliNumber(stats?.users?.total || 0)}{' '}
            <span className="text-xs font-normal text-gray-500">জন</span>
          </p>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/60 pt-2">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {stats?.users?.farmers || 0} কৃষক
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {stats?.users?.sellers || 0} বিক্রেতা
            </span>
          </div>
        </div>

        {/* Metric 2: Marketplace Products */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">মার্কেটপ্লেস পণ্য</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Package size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {loading ? '...' : formatBengaliNumber(stats?.products?.total || 0)}{' '}
            <span className="text-xs font-normal text-gray-500">টি</span>
          </p>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/60 pt-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {stats?.products?.approved || 0} লাইভ
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              {stats?.products?.pending || 0} অপেক্ষমান
            </span>
          </div>
        </div>

        {/* Metric 3: Total Orders */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">সার্বিক গ্রাহক অর্ডার</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <ShoppingCart size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {loading ? '...' : formatBengaliNumber(stats?.orders?.total || 0)}{' '}
            <span className="text-xs font-normal text-gray-500">টি</span>
          </p>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/60 pt-2">
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              {stats?.orders?.pending || 0} অপেক্ষমান
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {stats?.orders?.delivered || 0} ডেলিভার্ড
            </span>
          </div>
        </div>

        {/* Metric 4: Platform Revenue Volume */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">মোট প্ল্যাটফর্ম লেনদেন</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DollarSign size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            ৳ {loading ? '...' : formatBengaliNumber(stats?.orders?.revenue || 0)}
          </p>
          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700/60 pt-2">
            <span>ক্যাশ অন ডেলিভারি</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">সরাসরি লেনদেন</span>
          </div>
        </div>
      </div>

      {/* 4. Main 2-Column Minimalist Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column (2 cols): Pending Approvals & Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Product Approvals Box */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock size={18} className="text-amber-500" />
                  <span>পণ্য অনুমোদন ও নিরীক্ষা (Pending Reviews)</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  বিক্রেতাদের আপলোড করা নতুন কৃষি পণ্যের মান ও তথ্য যাচাই করুন
                </p>
              </div>

              <Link
                href="/dashboard/admin/products"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:underline"
              >
                <span>সকল পণ্য নিয়ন্ত্রণ</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                <RefreshCw size={24} className="animate-spin mx-auto text-emerald-500 mb-2" />
                <p>পণ্য যাচাই তালিকা লোড হচ্ছে...</p>
              </div>
            ) : pendingProducts.length === 0 ? (
              <div className="p-10 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  সব পণ্য পর্যালোচিত হয়েছে
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                  বর্তমানে অনুমোদনের অপেক্ষায় কোনো পণ্য নেই। বিক্রেতারা নতুন পণ্য যোগ করলে সরাসরি এখানে তালিকাভুক্ত হবে।
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {pendingProducts.map((product) => {
                  const imageSrc = product.image ? resolveImageUrl(product.image) : '/placeholder.png';
                  const isProcessing = actionInProgress === String(product._id);

                  return (
                    <div
                      key={String(product._id)}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
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
                          <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-medium text-emerald-700 dark:text-emerald-400">
                              ৳ {formatBengaliNumber(product.price)}
                            </span>
                            <span>•</span>
                            <span>মজুত: {product.quantity} টি</span>
                            <span>•</span>
                            <span className="text-gray-400">
                              বিক্রেতা: {product.seller?.name || 'অননুমোদিত'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 1-Click Action Buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => handleQuickStatusUpdate(String(product._id), 'approved')}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-2xs disabled:opacity-50"
                          title="সরাসরি অনুমোদন করুন"
                        >
                          <Check size={14} />
                          <span>অনুমোদন</span>
                        </button>

                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => handleQuickStatusUpdate(String(product._id), 'rejected')}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-300 rounded-lg text-xs font-semibold transition cursor-pointer disabled:opacity-50 border border-rose-200 dark:border-rose-800"
                          title="বাতিল করুন"
                        >
                          <X size={14} />
                          <span>বাতিল</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Orders Tracking Table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <ShoppingCart size={18} className="text-emerald-600" />
                  <span>সার্বিক প্ল্যাটফর্ম অর্ডার ট্র্যাকিং</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  কৃষক ও গ্রাহকদের করা সর্বশেষ অর্ডারসমূহ
                </p>
              </div>

              <Link
                href="/dashboard/admin/orders"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 hover:underline"
              >
                <span>সকল অর্ডার ({stats?.orders?.total || 0})</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                <RefreshCw size={24} className="animate-spin mx-auto text-emerald-500 mb-2" />
                <p>অর্ডার লোড হচ্ছে...</p>
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">
                এখনো কোনো অর্ডার সম্পন্ন হয়নি।
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                  <thead className="bg-gray-50/80 dark:bg-gray-900/40 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      <th className="px-4 py-3">অর্ডার আইডি</th>
                      <th className="px-4 py-3">ক্রেতা ও জেলা</th>
                      <th className="px-4 py-3">পণ্য</th>
                      <th className="px-4 py-3">মোট মূল্য</th>
                      <th className="px-4 py-3">স্ট্যাটাস</th>
                      <th className="px-4 py-3 text-right">তারিখ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                    {recentOrders.slice(0, 5).map((order) => {
                      const customerName = order.customerName || order.shippingAddress?.name || 'সম্মানিত কৃষক';
                      const district = order.shippingAddress?.district || order.shippingAddress?.city || 'বাংলাদেশ';
                      const firstItem = order.items?.[0]?.name || 'কৃষি পণ্য';
                      const extraCount = (order.items?.length || 1) - 1;

                      return (
                        <tr
                          key={String(order._id)}
                          className="hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="px-4 py-3 font-bold text-xs text-gray-900 dark:text-white">
                            {order.orderNumber || `#${String(order._id).slice(-6).toUpperCase()}`}
                          </td>

                          <td className="px-4 py-3">
                            <p className="font-semibold text-xs text-gray-900 dark:text-white">
                              {customerName}
                            </p>
                            <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                              <MapPin size={11} className="text-gray-400 shrink-0" />
                              <span>{district}</span>
                            </p>
                          </td>

                          <td className="px-4 py-3 text-xs">
                            <p className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
                              {firstItem}
                            </p>
                            {extraCount > 0 && (
                              <span className="text-[10px] text-gray-400">
                                + আরও {extraCount} টি পণ্য
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-3 font-bold text-xs text-emerald-700 dark:text-emerald-400">
                            ৳ {formatBengaliNumber(order.totalAmount)}
                          </td>

                          <td className="px-4 py-3">
                            {renderOrderStatusBadge(order.status)}
                          </td>

                          <td className="px-4 py-3 text-right text-xs text-gray-400">
                            {formatBengaliDate(order.createdAt)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): User Ratio & Quick Navigation */}
        <div className="space-y-6">
          {/* User Distribution Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                <span>ব্যবহারকারী অনুপাত</span>
              </h3>
              <span className="text-xs font-semibold text-gray-400">
                মোট: {totalUsers} জন
              </span>
            </div>

            {/* Distribution Visual Bars */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-gray-700 dark:text-gray-300">নিবন্ধিত কৃষক (Farmers)</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {stats?.users?.farmers || 0} জন ({farmerPercent}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${farmerPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-gray-700 dark:text-gray-300">সক্রিয় বিক্রেতা (Sellers)</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {stats?.users?.sellers || 0} জন ({sellerPercent}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${sellerPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-gray-700 dark:text-gray-300">অ্যাডমিন (Administrators)</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    {stats?.users?.admins || 0} জন ({adminPercent}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${adminPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/admin/users"
              className="block pt-2 text-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              সকল ব্যবহারকারী পরিচালনা করুন →
            </Link>
          </div>

          {/* Minimalist Administrative Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs p-5 space-y-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>প্রশাসনিক নেভিগেশন</span>
            </h3>

            <div className="space-y-2 pt-1">
              <Link href="/dashboard/admin/products" className="block group">
                <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-500/50 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                      <Package size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition">
                        পণ্য যাচাই ও নিয়ন্ত্রণ
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        {stats?.products?.pending || 0} টি অপেক্ষমান আবেদন
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/dashboard/admin/users" className="block group">
                <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                      <Users size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition">
                        ব্যবহারকারী ব্যবস্থাপনা
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        কৃষক ও বিক্রেতা প্রোফাইল
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/dashboard/admin/orders" className="block group">
                <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-purple-500/50 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 transition flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                      <ShoppingCart size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition">
                        সার্বিক অর্ডার ট্র্যাকিং
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        ডেলিভারি ও ট্রানজেকশন
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/dashboard/admin/profile" className="block group">
                <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-500/50 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition">
                        অ্যাডমিন প্রোফাইল
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        নিরাপত্তা ও সেটিংস
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboardPage, ['admin']);
