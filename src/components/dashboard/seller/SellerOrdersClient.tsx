'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  ShoppingCart,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Truck,
  Package,
  RefreshCw,
  MapPin,
  Phone,
  AlertCircle,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IOrder } from '@/types/Order';
import { getSellerOrders, updateOrderStatus } from '@/lib/api/order';

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

const formatBengaliNumber = (num: number) => {
  return Number(num || 0).toLocaleString('bn-BD');
};

interface SellerOrdersClientProps {
  initialOrders: IOrder[];
}

export default function SellerOrdersClient({ initialOrders }: SellerOrdersClientProps) {
  const { token } = useAuth();

  const [orders, setOrders] = useState<IOrder[]>(initialOrders);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<IOrder['status']>('pending');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  useEffect(() => {
    if (token && initialOrders.length === 0) {
      loadOrders(true);
    }
  }, [token]);

  const loadOrders = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      const data = await getSellerOrders(token || undefined);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Failed to load seller orders:', err);
      showNotification('error', err?.message || 'অর্ডার তালিকা লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  const handleManualRefresh = () => {
    setRefreshing(true);
    loadOrders(true);
  };

  const handleOpenStatusModal = (order: IOrder) => {
    setSelectedOrder(order);
    setSelectedStatus(order.status || 'pending');
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      setUpdatingStatus(true);
      await updateOrderStatus(String(selectedOrder._id), selectedStatus, token || undefined);
      showNotification('success', 'অর্ডারের স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে');
      setSelectedOrder(null);
      loadOrders(true);
    } catch (err: any) {
      console.error('Update order status error:', err);
      showNotification('error', err?.message || 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const orderNum = (order.orderNumber || '').toLowerCase();
      const customerName = (order.customerName || order.shippingAddress?.name || '').toLowerCase();
      const phone = (order.customerPhone || order.shippingAddress?.phone || '').toLowerCase();
      const district = (order.shippingAddress?.district || '').toLowerCase();
      return (
        orderNum.includes(q) ||
        customerName.includes(q) ||
        phone.includes(q) ||
        district.includes(q)
      );
    }
    return true;
  });

  const counts = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  const renderOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
            ডেলিভারি সম্পন্ন
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Truck size={13} className="text-blue-600 dark:text-blue-400" />
            কুরিয়ারে হস্তান্তর
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
            <Package size={13} className="text-purple-600 dark:text-purple-400" />
            প্যাকেজিং ও নিশ্চিত
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            <XCircle size={13} className="text-rose-600 dark:text-rose-400" />
            বাতিলকৃত
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Clock size={13} className="text-amber-600 dark:text-amber-400" />
            নতুন অর্ডার
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            কৃষকদের অর্ডার প্রসেসিং করুন, প্যাকেজিং সম্পন্ন হলে কুরিয়ারে হস্তান্তর ও স্ট্যাটাস আপডেট করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            onClick={handleManualRefresh}
            variant="secondary"
            disabled={loading || refreshing}
            className="flex items-center gap-2 text-xs sm:text-sm px-3.5 py-2 cursor-pointer shadow-2xs"
            title="রিফ্রেশ করুন"
          >
            <RefreshCw size={14} className={refreshing || loading ? 'animate-spin text-emerald-600' : ''} />
            <span>{refreshing ? 'আপডেট হচ্ছে...' : 'রিফ্রেশ'}</span>
          </Button>

          <Link href="/dashboard/seller/products">
            <Button className="flex items-center gap-2 text-xs sm:text-sm px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm cursor-pointer transition">
              <Plus size={15} />
              <span>নতুন পণ্য যোগ করুন</span>
            </Button>
          </Link>
        </div>
      </div>

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

      {/* Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">মোট প্রাপ্ত অর্ডার</span>
            <ShoppingCart size={18} className="text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {loading ? '...' : counts.total}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">নতুন অপেক্ষমান অর্ডার</span>
            <Clock size={18} className="text-amber-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
            {loading ? '...' : counts.pending}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">কুরিয়ার ও প্রসেসিং</span>
            <Truck size={18} className="text-blue-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
            {loading ? '...' : counts.confirmed + counts.shipped}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">ডেলিভারি সম্পন্ন</span>
            <CheckCircle2 size={18} className="text-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {loading ? '...' : counts.delivered}
          </p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            }`}
          >
            সকল অর্ডার ({counts.total})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-amber-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            }`}
          >
            নতুন ({counts.pending})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('confirmed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'confirmed'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            }`}
          >
            প্যাকেজিং ({counts.confirmed})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shipped')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'shipped'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            }`}
          >
            কুরিয়ারে ({counts.shipped})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('delivered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'delivered'
                ? 'bg-emerald-700 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            }`}
          >
            সম্পন্ন ({counts.delivered})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cancelled')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'cancelled'
                ? 'bg-rose-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            }`}
          >
            বাতিল ({counts.cancelled})
          </button>
        </div>

        <div className="relative min-w-60 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="অর্ডার নং, ক্রেতার নাম বা ফোন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            <RefreshCw size={24} className="animate-spin mx-auto text-emerald-500 mb-2" />
            <p>অর্ডার তথ্য লোড হচ্ছে...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center px-4 space-y-2">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 flex items-center justify-center mx-auto">
              <ShoppingCart size={22} />
            </div>
            <p className="font-medium text-gray-700 dark:text-gray-300 text-sm">কোনো অর্ডার পাওয়া যায়নি</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {searchTerm || activeTab !== 'all'
                ? 'বর্তমান ফিল্টারের সাথে মিলছে এমন কোনো অর্ডার নেই।'
                : 'আপনার দোকানে এখনো কোনো অর্ডার আসেনি। কৃষকদের অর্ডারের জন্য অপেক্ষা করুন।'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50/80 dark:bg-gray-900/40 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3.5">অর্ডার আইডি</th>
                  <th className="px-4 py-3.5">ক্রেতা (কৃষক)</th>
                  <th className="px-4 py-3.5">গন্তব্য ও ঠিকানা</th>
                  <th className="px-4 py-3.5">আইটেম তালিকা</th>
                  <th className="px-4 py-3.5">মোট মূল্য</th>
                  <th className="px-4 py-3.5">স্ট্যাটাস</th>
                  <th className="px-4 py-3.5 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {filteredOrders.map((order) => {
                  const customerName = order.customerName || order.shippingAddress?.name || 'সম্মানিত কৃষক';
                  const customerPhone = order.customerPhone || order.shippingAddress?.phone || '';
                  const district = order.shippingAddress?.district || order.shippingAddress?.city || 'বাংলাদেশ';
                  const address = order.shippingAddress?.address || '';

                  return (
                    <tr
                      key={String(order._id)}
                      className="hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3.5">
                        <span className="font-bold text-xs text-gray-900 dark:text-white">
                          {order.orderNumber || `#${String(order._id).slice(-6).toUpperCase()}`}
                        </span>
                        <span className="block text-[11px] text-gray-400 mt-0.5">
                          {formatBengaliDate(order.createdAt)}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <p className="font-semibold text-xs text-gray-900 dark:text-white">
                          {customerName}
                        </p>
                        {customerPhone && (
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                            <Phone size={11} className="text-gray-400 shrink-0" />
                            <span>{customerPhone}</span>
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-xs">
                        <p className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1">
                          <MapPin size={12} className="text-emerald-600 shrink-0" />
                          <span>{district}</span>
                        </p>
                        {address && (
                          <p className="text-[11px] text-gray-400 truncate max-w-45 mt-0.5" title={address}>
                            {address}
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-xs">
                        <div className="space-y-1">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span className="text-gray-800 dark:text-gray-200 line-clamp-1">
                                {item.name} × {item.quantity} টি
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 font-bold text-emerald-700 dark:text-emerald-400">
                        ৳ {formatBengaliNumber(order.totalAmount)}
                        <span className="block text-[10px] text-gray-400 font-normal">
                          {order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : 'অনলাইন পেইড'}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        {renderOrderStatusBadge(order.status)}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenStatusModal(order)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-2xs"
                        >
                          স্ট্যাটাস পরিবর্তন
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget && !updatingStatus) {
              setSelectedOrder(null);
            }
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">
                  অর্ডার স্ট্যাটাস আপডেট
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  অর্ডার নং: {selectedOrder.orderNumber || String(selectedOrder._id).slice(-8)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                disabled={updatingStatus}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  বর্তমান স্ট্যাটাস নির্বাচন করুন
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="pending">অপেক্ষমান (নতুন অর্ডার)</option>
                  <option value="confirmed">নিশ্চিতকরণ / প্যাকেজিং চলছে</option>
                  <option value="shipped">কুরিয়ারে হস্তান্তর (ইন ট্রানজিট)</option>
                  <option value="delivered">ডেলিভারি সম্পন্ন</option>
                  <option value="cancelled">অর্ডার বাতিল</option>
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">ক্রেতার নাম:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedOrder.customerName || selectedOrder.shippingAddress?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ফোন নম্বর:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedOrder.customerPhone || selectedOrder.shippingAddress?.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">মোট মূল্য:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ৳ {formatBengaliNumber(selectedOrder.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setSelectedOrder(null)}
                  disabled={updatingStatus}
                  className="text-xs px-4 py-2 cursor-pointer"
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={updatingStatus}
                  className="text-xs px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg cursor-pointer"
                >
                  {updatingStatus ? 'সংরক্ষণ হচ্ছে...' : 'স্ট্যাটাস আপডেট করুন'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
