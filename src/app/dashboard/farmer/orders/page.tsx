'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCard from '@/components/dashboard/DashboardCard';
import EmptyState from '@/components/dashboard/EmptyState';
import { ShoppingBag, Loader2, Package, Truck, CheckCircle2, Clock } from 'lucide-react';
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

export default function FarmerOrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/farmer' },
    { label: 'আমার ক্রয়কৃত অর্ডারসমূহ' },
  ];

  useEffect(() => {
    let isMounted = true;
    if (token) {
      setIsLoading(true);
      getMyOrders(token)
        .then((data) => {
          if (isMounted) {
            setOrders(Array.isArray(data) ? data : []);
          }
        })
        .catch((err) => {
          console.error('Failed to load farmer orders:', err);
          if (isMounted) setOrders([]);
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
    } else {
      setOrders([]);
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DashboardHeader
          title="আমার ক্রয়কৃত পণ্যের অর্ডার তালিকা"
          breadcrumb={breadcrumb}
        />
        <Link href="/products">
          <Button className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl cursor-pointer gap-2 text-xs transition shadow-xs">
            <ShoppingBag size={15} /> আরও কৃষি পণ্য কিনুন
          </Button>
        </Link>
      </div>

      <DashboardCard title="অর্ডারের বিবরণ ও ডেলিভারি স্ট্যাটাস">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-3" />
            <p className="text-xs sm:text-sm font-medium">অর্ডারসমূহ লোড হচ্ছে...</p>
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="w-12 h-12 text-emerald-600/60" />}
            title="আপনার কোনো অর্ডার পাওয়া যায়নি"
            description="আপনি এখনো পর্যন্ত কোনো পণ্যের অর্ডার করেননি। প্রয়োজনীয় বীজ, সার ও আধুনিক কৃষি যন্ত্রপাতি এখনই ক্যাশ অন ডেলিভারিতে অর্ডার করুন।"
            action={{
              label: 'কৃষি পণ্যসমূহ দেখুন',
              onClick: () => (window.location.href = '/products'),
            }}
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusInfo =
                STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
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