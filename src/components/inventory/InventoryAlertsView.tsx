'use client';

import React from 'react';
import {
  AlertTriangle,
  XCircle,
  CalendarClock,
  PlusCircle,
  Package,
} from 'lucide-react';
import { InventoryAlertsResponse, InventoryAlertItem } from '@/types/Inventory';

interface InventoryAlertsViewProps {
  alerts: InventoryAlertsResponse | null;
  loading?: boolean;
  onQuickRestockClick: (item: InventoryAlertItem) => void;
}

export default function InventoryAlertsView({
  alerts,
  loading = false,
  onQuickRestockClick,
}: InventoryAlertsViewProps) {
  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500">
        অ্যালার্ট তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (!alerts || alerts.counts.totalAlerts === 0) {
    return (
      <div className="p-10 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-3">
          <Package className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-gray-900 dark:text-white">
          ইনভেন্টরি সম্পূর্ণ নিরাপদ!
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
          বর্তমানে কোনো স্টক স্বল্পতা, স্টক সংকট বা মেয়াদোত্তীর্ণ হওয়ার জরুরি সতর্কতা নেই।
        </p>
      </div>
    );
  }

  const { outOfStockItems, lowStockItems, expiredItems, expiringSoonItems } = alerts;

  return (
    <div className="space-y-6">
      {/* 1. Critical: Out of Stock */}
      {outOfStockItems.length > 0 && (
        <div className="bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-800/60 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h4 className="text-sm sm:text-base font-bold text-red-900 dark:text-red-200">
              জরুরি: স্টক শূন্য পণ্যসমূহ ({outOfStockItems.length} টি)
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {outOfStockItems.map((item) => (
              <div
                key={item._id}
                className="p-3.5 rounded-xl bg-white dark:bg-gray-800 border border-red-100 dark:border-red-900/60 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-bold text-red-600 bg-red-100/70 dark:bg-red-950 px-2 py-0.5 rounded-md">
                      ০ {item.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    ক্যাটাগরি: {item.category} • {item.warehouseLocation || 'গোডাউন'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onQuickRestockClick(item)}
                  className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> এখনই স্টক যোগ করুন
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Critical: Expired Products */}
      {expiredItems.length > 0 && (
        <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800/60 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h4 className="text-sm sm:text-base font-bold text-rose-900 dark:text-rose-200">
              জরুরি: মেয়াদোত্তীর্ণ পণ্যসমূহ ({expiredItems.length} টি)
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {expiredItems.map((item) => (
              <div
                key={item._id}
                className="p-3.5 rounded-xl bg-white dark:bg-gray-800 border border-rose-100 dark:border-rose-900/60 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-100/70 dark:bg-rose-950 px-2 py-0.5 rounded-md">
                      মেয়াদ শেষ
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    মেয়াদ: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('bn-BD') : 'N/A'} • লট: {item.batchNumber || 'N/A'}
                  </p>
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">
                    গ্রাহকদের সুরক্ষার্থে এই পণ্যটির বিক্রয় বন্ধ রাখা হয়েছে।
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onQuickRestockClick(item)}
                  className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 border border-rose-200 dark:border-rose-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  স্টক সমন্বয় বা বাতিল করুন
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Warning: Low Stock */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800/60 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-200">
              সতর্কতা: স্বল্প স্টক পণ্যসমূহ ({lowStockItems.length} টি)
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockItems.map((item) => (
              <div
                key={item._id}
                className="p-3.5 rounded-xl bg-white dark:bg-gray-800 border border-amber-100 dark:border-amber-900/60 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-100/70 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                      অবশিষ্ট: {item.quantity} {item.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    অ্যালার্ট সীমা: {item.lowStockThreshold} {item.unit} • {item.warehouseLocation || 'গোডাউন'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onQuickRestockClick(item)}
                  className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> পুনরায় স্টক যোগ করুন
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Warning: Expiring Soon in 30 Days */}
      {expiringSoonItems.length > 0 && (
        <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-800/60 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <CalendarClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="text-sm sm:text-base font-bold text-blue-900 dark:text-blue-200">
              মেয়াদ আসন্ন: আগামী ৩০ দিনের মধ্যে মেয়াদ শেষ হবে ({expiringSoonItems.length} টি)
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {expiringSoonItems.map((item) => (
              <div
                key={item._id}
                className="p-3.5 rounded-xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900/60 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-100/70 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                      আর {item.daysLeft} দিন
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    মেয়াদোত্তীর্ণ: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('bn-BD') : 'N/A'} • মজুদ: {item.quantity} {item.unit}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onQuickRestockClick(item)}
                  className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 border border-blue-200 dark:border-blue-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  স্টক চেক করুন
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
