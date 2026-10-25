'use client';

import React from 'react';
import {
  Printer,
  PieChart,
  TrendingUp,
} from 'lucide-react';
import { InventoryReportResponse } from '@/types/Inventory';

interface InventoryReportViewProps {
  report: InventoryReportResponse | null;
  loading?: boolean;
}

export default function InventoryReportView({
  report,
  loading = false,
}: InventoryReportViewProps) {
  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500">
        রিপোর্ট প্রস্তুত হচ্ছে...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-12 text-center text-gray-500">
        কোনো রিপোর্ট ডেটা পাওয়া যায়নি।
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Print CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
            ইনভেন্টরি ভ্যালুয়েশন ও সামগ্রিক রিপোর্ট
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            সর্বশেষ প্রস্তুত: {new Date(report.reportDate).toLocaleDateString('bn-BD', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition cursor-pointer"
        >
          <Printer className="w-4 h-4" /> প্রিন্ট / PDF সংরক্ষণ
        </button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block mb-1">
            মোট ইনভেন্টরি বাজারমূল্য
          </span>
          <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
            ৳ {Number(report.grandValuation || 0).toLocaleString('bn-BD')}
          </span>
          <span className="text-xs text-emerald-600/80 block mt-1">
            মোট {Number(report.totalProducts || 0).toLocaleString('bn-BD')} টি পণ্যের সামগ্রিক মূল্য
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <span className="text-xs font-semibold text-blue-800 dark:text-blue-300 block mb-1">
            মোট ফিজিক্যাল স্টক একক
          </span>
          <span className="text-2xl font-black text-blue-700 dark:text-blue-400">
            {Number(report.grandUnits || 0).toLocaleString('bn-BD')}
          </span>
          <span className="text-xs text-blue-600/80 block mt-1">
            গোডাউনে সুরক্ষিত মোট কৃষিপণ্যের পরিমাণ
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
          <span className="text-xs font-semibold text-purple-800 dark:text-purple-300 block mb-1">
            সর্বশেষ ৩০ দিনের বিক্রয় একক
          </span>
          <span className="text-2xl font-black text-purple-700 dark:text-purple-400">
            {Number(report.movementSummary?.soldUnits || 0).toLocaleString('bn-BD')}
          </span>
          <span className="text-xs text-purple-600/80 block mt-1">
            অর্ডারের মাধ্যমে গ্রাহকদের কাছে সরবরাহকৃত
          </span>
        </div>
      </div>

      {/* 30-Day Movement Stats */}
      <div className="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 shadow-2xs">
        <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" /> গত ৩০ দিনের ইনভেন্টরি মুভমেন্ট সারসংক্ষেপ
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
            <span className="text-[11px] text-gray-500 block">নতুন সরবরাহ (Restocked)</span>
            <span className="text-base font-extrabold text-emerald-600">
              +{Number(report.movementSummary?.restockedUnits || 0).toLocaleString('bn-BD')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
            <span className="text-[11px] text-gray-500 block">মোট বিক্রয় (Sold)</span>
            <span className="text-base font-extrabold text-purple-600">
              -{Number(report.movementSummary?.soldUnits || 0).toLocaleString('bn-BD')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
            <span className="text-[11px] text-gray-500 block">অর্ডার বাতিল স্টক ফেরত</span>
            <span className="text-base font-extrabold text-teal-600">
              +{Number(report.movementSummary?.returnedUnits || 0).toLocaleString('bn-BD')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
            <span className="text-[11px] text-gray-500 block">ক্ষতিগ্রস্থ বা মেয়াদোত্তীর্ণ বাদ</span>
            <span className="text-base font-extrabold text-rose-600">
              -{Number(report.movementSummary?.damagedUnits || 0).toLocaleString('bn-BD')}
            </span>
          </div>
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
            ক্যাটাগরিভিত্তিক স্টক মূল্যায়ন ও হিস্যা
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50/75 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 font-semibold">
              <tr>
                <th className="py-3 px-4">ক্যাটাগরি</th>
                <th className="py-3 px-4 text-center">পণ্যের সংখ্যা</th>
                <th className="py-3 px-4 text-center">মোট মজুদ একক</th>
                <th className="py-3 px-4 text-right">মূল্যায়ন (Valuation)</th>
                <th className="py-3 px-4 text-right">ইনভেন্টরি হিস্যা (%)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {report.categoryBreakdown.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    কোনো ক্যাটাগরি ডেটা নেই।
                  </td>
                </tr>
              ) : (
                report.categoryBreakdown.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                    <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">
                      {cat.category}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">
                      {cat.productCount} টি
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-medium text-gray-800 dark:text-gray-200">
                      {cat.totalUnits.toLocaleString('bn-BD')}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-emerald-700 dark:text-emerald-400">
                      ৳ {cat.valuation.toLocaleString('bn-BD')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${Math.min(100, Number(cat.valuationSharePercentage))}%` }}
                          />
                        </div>
                        <span className="font-semibold text-gray-700 dark:text-gray-300 w-12 text-right">
                          {cat.valuationSharePercentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
