'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import DashboardCard from '@/components/dashboard/DashboardCard';
import EmptyState from '@/components/dashboard/EmptyState';
import { ShoppingBag, Package, Truck, CheckCircle2, Clock, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { getMyOrders } from '@/lib/api/order';
import { IOrder } from '@/types/Order';

const STATUS_CONFIG: Record<
  string,
  { label: string; badgeClass: string; icon: React.ElementType }
> = {
  pending: {
    label: 'অপেক্ষমান (Pending)',
    badgeClass: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
    icon: Clock,
  },
  confirmed: {
    label: 'নিশ্চিত হয়েছে',
    badgeClass: 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    icon: Package,
  },
  shipped: {
    label: 'ডেলিভারির পথে',
    badgeClass: 'bg-sky-50 text-sky-800 dark:bg-sky-950/60 dark:text-sky-400 border border-sky-200 dark:border-sky-800',
    icon: Truck,
  },
  delivered: {
    label: 'ডেলিভারি সম্পন্ন',
    badgeClass: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'বাতিলকৃত',
    badgeClass: 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800',
    icon: Clock,
  },
};

interface FarmerOrdersClientProps {
  initialOrders: IOrder[];
}

export default function FarmerOrdersClient({ initialOrders }: FarmerOrdersClientProps) {
  const { token } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Client-side fallback sync if initialOrders was empty but client token exists
  useEffect(() => {
    if (token && initialOrders.length === 0) {
      getMyOrders(token)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setOrders(data);
          }
        })
        .catch(() => {});
    }
  }, [token, initialOrders.length]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const orderId = order.orderNumber || `#ORD-${order._id.slice(-6)}`;
      const matchesSearch =
        !searchTerm.trim() ||
        orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        order.shippingAddress?.address?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchTerm]);

  // Statistics
  const totalCount = orders.length;
  const inTransitCount = orders.filter((o) => o.status === 'shipped' || o.status === 'pending').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xs">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">মোট ক্রয়কৃত অর্ডার</span>
          <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1 block">{totalCount} টি</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xs">
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium block">চলমান ডেলিভারি</span>
          <span className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400 mt-1 block">{inTransitCount} টি</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xs">
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium block">ডেলিভারি সম্পন্ন</span>
          <span className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1 block">{deliveredCount} টি</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xs">
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium block">সর্বমোট ব্যয়</span>
          <span className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1 block">৳ {totalSpent.toLocaleString('bn-BD')}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="অর্ডার নম্বর বা পণ্যের নাম দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'সকল' },
            { id: 'pending', label: 'অপেক্ষমান' },
            { id: 'confirmed', label: 'নিশ্চিত' },
            { id: 'shipped', label: 'চলমান' },
            { id: 'delivered', label: 'সম্পন্ন' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition cursor-pointer whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <DashboardCard title="অর্ডারের বিবরণ ও ডেলিভারি স্ট্যাটাস">
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="w-12 h-12 text-emerald-600/60" />}
            title={orders.length === 0 ? 'আপনার কোনো অর্ডার পাওয়া যায়নি' : 'ফিল্টারে কোনো অর্ডার মিলছে না'}
            description={
              orders.length === 0
                ? 'আপনি এখনো পর্যন্ত কোনো পণ্যের অর্ডার করেননি। প্রয়োজনীয় বীজ, সার ও আধুনিক কৃষি যন্ত্রপাতি এখনই ক্যাশ অন ডেলিভারিতে অর্ডার করুন।'
                : 'অন্য কোনো ফিল্টার বা অনুসন্ধান শব্দ দিয়ে চেষ্টা করুন।'
            }
            action={
              orders.length === 0
                ? {
                    label: 'কৃষি পণ্যসমূহ দেখুন',
                    onClick: () => (window.location.href = '/products'),
                  }
                : undefined
            }
          />
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const StatusIcon = statusInfo.icon;
              const orderId = order.orderNumber || `#ORD-${order._id.slice(-6)}`;
              const orderDate = new Date(order.createdAt).toLocaleDateString('bn-BD', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <div
                  key={order._id}
                  className="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800/80 p-5 shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-600/60 transition-all space-y-4"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-700/70">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-gray-900 dark:text-white text-sm sm:text-base tracking-tight">
                        {orderId}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        • {orderDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.badgeClass}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span>{statusInfo.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-4">
                          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center shrink-0 text-emerald-700 dark:text-emerald-400">
                            <Package className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 truncate">
                            <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-gray-400">
                              পরিমাণ: {item.quantity} টি • একক মূল্য: ৳ {item.price}
                            </p>
                          </div>
                        </div>

                        <span className="font-bold text-gray-800 dark:text-gray-200 shrink-0">
                          ৳ {item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Bottom Info */}
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="text-gray-500 dark:text-gray-400 space-y-0.5">
                      <p>
                        <strong className="text-gray-700 dark:text-gray-300">ডেলিভারি ঠিকানা:</strong>{' '}
                        {order.shippingAddress?.address}
                        {order.shippingAddress?.district ? `, ${order.shippingAddress.district}` : ''}
                      </p>
                      <p>
                        <strong className="text-gray-700 dark:text-gray-300">পেমেন্ট:</strong> ক্যাশ অন ডেলিভারি (মূল্য পরিশোধ পণ্য প্রাপ্তির পর)
                      </p>
                    </div>

                    <div className="text-right sm:text-right">
                      <span className="text-[11px] text-gray-400 block">মোট প্রদেয় মূল্য</span>
                      <span className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-400">
                        ৳ {order.totalAmount}
                      </span>
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
