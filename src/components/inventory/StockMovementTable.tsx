'use client';

import React from 'react';
import {
  History,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  User,
  ShoppingBag,
  RotateCcw,
  AlertTriangle,
  Package,
} from 'lucide-react';
import { IStockMovement, StockMovementType } from '@/types/Inventory';

interface StockMovementTableProps {
  movements: IStockMovement[];
  loading?: boolean;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

const MOVEMENT_TYPE_CONFIG: Record<
  StockMovementType,
  { label: string; bg: string; text: string; icon: React.ElementType; isPositive: boolean }
> = {
  initial: {
    label: 'প্রাথমিক এন্ট্রি',
    bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    icon: Package,
    isPositive: true,
  },
  restock: {
    label: 'নতুন স্টক যোগ',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: ArrowUpRight,
    isPositive: true,
  },
  adjustment: {
    label: 'অডিট সমন্বয়',
    bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800',
    text: 'text-indigo-700 dark:text-indigo-300',
    icon: RefreshCw,
    isPositive: true,
  },
  order_placed: {
    label: 'অর্ডারে কর্তন',
    bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
    icon: ShoppingBag,
    isPositive: false,
  },
  order_cancelled: {
    label: 'অর্ডার বাতিল ফেরত',
    bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800',
    text: 'text-teal-700 dark:text-teal-300',
    icon: RotateCcw,
    isPositive: true,
  },
  damaged: {
    label: 'ক্ষতিগ্রস্থ বাদ',
    bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-300',
    icon: AlertTriangle,
    isPositive: false,
  },
  expired: {
    label: 'মেয়াদোত্তীর্ণ বাদ',
    bg: 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800',
    text: 'text-red-700 dark:text-red-300',
    icon: ArrowDownRight,
    isPositive: false,
  },
};

export default function StockMovementTable({
  movements,
  loading = false,
  typeFilter,
  onTypeFilterChange,
  page,
  totalPages,
  total,
  onPageChange,
}: StockMovementTableProps) {
  const filterTabs = [
    { key: 'all', label: 'সকল মুভমেন্ট' },
    { key: 'restock', label: 'রিস্টক (+)' },
    { key: 'order_placed', label: 'বিক্রয় (-)' },
    { key: 'order_cancelled', label: 'বাতিল ফেরত (+)' },
    { key: 'damaged', label: 'ক্ষতিগ্রস্থ (-)' },
    { key: 'expired', label: 'মেয়াদোত্তীর্ণ (-)' },
    { key: 'adjustment', label: 'সমন্বয়' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-2xs overflow-hidden">
      {/* Header and Filter Tabs */}
      <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center border border-purple-500/20">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              স্টক মুভমেন্ট ও অডিট হিস্ট্রি
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              প্রতিটি স্টক পরিবর্তন, বিক্রয় ও পুনরুদ্ধারের নির্ভরযোগ্য ট্র্যাকিং
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTypeFilterChange(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                typeFilter === tab.key
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-gray-50/75 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 font-semibold">
            <tr>
              <th className="py-3 px-4">তারিখ ও সময়</th>
              <th className="py-3 px-4">পণ্যের নাম ও ব্যাচ</th>
              <th className="py-3 px-4">মুভমেন্টের ধরণ</th>
              <th className="py-3 px-4 text-center">পরিবর্তন (Change)</th>
              <th className="py-3 px-4 text-center">পূর্ববর্তী → পরবর্তী</th>
              <th className="py-3 px-4">কারণ / রেফারেন্স</th>
              <th className="py-3 px-4">ব্যবহারকারী</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-400 dark:text-gray-500">
                  <div className="inline-flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                    <span>লোড হচ্ছে...</span>
                  </div>
                </td>
              </tr>
            ) : movements.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-400 dark:text-gray-500">
                  কোনো স্টক মুভমেন্ট রেকর্ড পাওয়া যায়নি।
                </td>
              </tr>
            ) : (
              movements.map((m) => {
                const config =
                  MOVEMENT_TYPE_CONFIG[m.type] || {
                    label: m.type,
                    bg: 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700',
                    text: 'text-gray-700 dark:text-gray-300',
                    icon: Package,
                    isPositive: m.quantityChange >= 0,
                  };
                const Icon = config.icon;
                const isPositive = m.quantityChange > 0;

                return (
                  <tr
                    key={m._id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    {/* Timestamp */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                      {new Date(m.createdAt).toLocaleString('bn-BD', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Product Name & Batch */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {m.productName}
                      </div>
                      {m.batchNumber && (
                        <span className="inline-block text-[11px] font-mono text-gray-400 dark:text-gray-500">
                          লট: {m.batchNumber}
                        </span>
                      )}
                    </td>

                    {/* Movement Type Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text}`}
                      >
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </td>

                    {/* Quantity Change (+/-) */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-center font-extrabold text-sm">
                      <span
                        className={
                          isPositive
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }
                      >
                        {isPositive ? `+${m.quantityChange}` : m.quantityChange}
                      </span>
                    </td>

                    {/* Previous -> New Stock */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-center text-xs text-gray-600 dark:text-gray-300 font-mono">
                      <span>{m.previousStock}</span>
                      <span className="text-gray-400 mx-1.5">→</span>
                      <span className="font-bold text-gray-900 dark:text-white">{m.newStock}</span>
                    </td>

                    {/* Reason / Reference */}
                    <td className="py-3.5 px-4 text-xs text-gray-600 dark:text-gray-300 max-w-xs truncate">
                      {m.orderNumber ? (
                        <span className="inline-flex items-center gap-1 font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md text-[11px]">
                          {m.orderNumber}
                        </span>
                      ) : (
                        m.reason || '—'
                      )}
                    </td>

                    {/* Actor */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>{m.performedBy?.name || 'সিস্টেম'}</span>
                        <span className="text-[10px] text-gray-400 uppercase">
                          ({m.performedBy?.role || 'system'})
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>
            মোট {total} টির মধ্যে পৃষ্ঠা {page} / {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              পূর্ববর্তী
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              পরবর্তী
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
