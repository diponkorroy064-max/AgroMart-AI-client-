'use client';
import { useEffect, useState, useCallback } from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  ShoppingCart,
  Search,
  RefreshCw,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  XCircle,
  AlertCircle,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getAdminOrders } from '@/lib/api/admin';

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

interface AdminOrdersClientProps {
  initialOrders?: any[];
}

function AdminOrdersClient({ initialOrders = [] }: AdminOrdersClientProps) {
  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/admin' },
    { label: 'সকল অর্ডার ট্র্যাকিং' },
  ];

  const [orders, setOrders] = useState<any[]>(initialOrders);
  const [loading, setLoading] = useState(initialOrders.length === 0);
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAdminOrders(activeStatus === 'all' ? undefined : activeStatus, search);
      const orderList = Array.isArray(res) ? res : res.orders || [];
      setOrders(orderList);
    } catch (err: any) {
      console.error('Failed to load orders:', err);
      setError(err?.message || 'অর্ডার তালিকা লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  }, [activeStatus, search]);

  useEffect(() => {
    if (initialOrders.length === 0 || activeStatus !== 'all' || search !== '') {
      loadOrders();
    }
  }, [loadOrders, activeStatus, search, initialOrders.length]);

  const renderStatusBadge = (status: string) => {
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <DashboardHeader title="সার্বিক প্ল্যাটফর্ম অর্ডার ট্র্যাকিং" breadcrumb={breadcrumb} />
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            সমগ্র দেশের কৃষকদের দেওয়া সার্বিক অর্ডারের লাইভ ট্র্যাকিং ও ডেলিভারি স্ট্যাটাস।
          </p>
        </div>

        <Button
          onClick={loadOrders}
          variant="secondary"
          disabled={loading}
          className="flex items-center gap-2 text-xs sm:text-sm px-3.5 py-2 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-emerald-600' : ''} />
          <span>রিফ্রেশ</span>
        </Button>
      </div>

      {/* Error notification */}
      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'সকল অর্ডার' },
            { id: 'pending', label: 'অপেক্ষমান' },
            { id: 'confirmed', label: 'নিশ্চিতকৃত' },
            { id: 'shipped', label: 'কুরিয়ারে' },
            { id: 'delivered', label: 'ডেলিভার্ড' },
            { id: 'cancelled', label: 'বাতিল' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeStatus === tab.id
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="অর্ডার আইডি বা জেলা খুঁজুন..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            <RefreshCw size={24} className="animate-spin mx-auto text-emerald-500 mb-2" />
            <p>অর্ডার তালিকা লোড হচ্ছে...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400 space-y-2">
            <ShoppingCart size={28} className="mx-auto text-gray-300" />
            <p className="font-semibold text-gray-700 dark:text-gray-300">কোনো অর্ডার পাওয়া যায়নি</p>
            <p className="text-gray-400">ফিল্টার বা সার্চ পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50/80 dark:bg-gray-900/40 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-5 py-3.5">অর্ডার আইডি</th>
                  <th className="px-5 py-3.5">ক্রেতা ও জেলা</th>
                  <th className="px-5 py-3.5">অর্ডারকৃত পণ্য</th>
                  <th className="px-5 py-3.5">মোট মূল্য</th>
                  <th className="px-5 py-3.5">পেমেন্ট</th>
                  <th className="px-5 py-3.5">স্ট্যাটাস</th>
                  <th className="px-5 py-3.5 text-right">তারিখ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {orders.map((order) => {
                  const customerName = order.customerName || order.shippingAddress?.name || 'সম্মানিত কৃষক';
                  const district = order.shippingAddress?.district || order.shippingAddress?.city || 'বাংলাদেশ';
                  const phone = order.customerPhone || order.shippingAddress?.phone || '';
                  const firstItem = order.items?.[0]?.name || 'কৃষি পণ্য';
                  const extraCount = (order.items?.length || 1) - 1;

                  return (
                    <tr
                      key={String(order._id)}
                      className="hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-bold text-xs text-gray-900 dark:text-white">
                        {order.orderNumber || `#${String(order._id).slice(-6).toUpperCase()}`}
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <User size={13} className="text-gray-400 shrink-0" />
                          <span className="font-semibold text-xs text-gray-900 dark:text-white">
                            {customerName}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={11} className="text-gray-400 shrink-0" />
                          <span>{district}</span>
                          {phone && <span>• {phone}</span>}
                        </p>
                      </td>

                      <td className="px-5 py-3.5 text-xs">
                        <p className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
                          {firstItem}
                        </p>
                        {extraCount > 0 && (
                          <span className="text-[10px] text-gray-400">
                            + আরও {extraCount} টি পণ্য
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 font-bold text-xs text-emerald-700 dark:text-emerald-400">
                        ৳ {formatBengaliNumber(order.totalAmount)}
                      </td>

                      <td className="px-5 py-3.5 text-xs text-gray-500 capitalize">
                        {order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : order.paymentMethod || 'ক্যাশ'}
                      </td>

                      <td className="px-5 py-3.5">
                        {renderStatusBadge(order.status)}
                      </td>

                      <td className="px-5 py-3.5 text-right text-xs text-gray-400 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <Calendar size={12} className="text-gray-400 shrink-0" />
                          <span>{formatBengaliDate(order.createdAt)}</span>
                        </div>
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
  );
}

export default withAuth(AdminOrdersClient, ['admin']);
