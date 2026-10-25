'use client';

import React from 'react';
import {
  Boxes,
  PackageCheck,
  Coins,
  AlertTriangle,
  XCircle,
  CalendarClock,
} from 'lucide-react';
import { InventorySummary } from '@/types/Inventory';

interface InventorySummaryCardsProps {
  summary: InventorySummary;
  activeFilter?: string;
  onFilterClick?: (status: string) => void;
}

export default function InventorySummaryCards({
  summary,
  activeFilter,
  onFilterClick,
}: InventorySummaryCardsProps) {
  const cards = [
    {
      id: 'all',
      title: 'মোট পণ্য',
      fullTitle: 'মোট পণ্য সংখ্যা (সক্রিয়)',
      value: (summary.totalProducts || 0).toLocaleString('bn-BD'),
      subtext: 'সক্রিয় পণ্য সংখ্যা',
      icon: Boxes,
      color: 'emerald',
      bgColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
      activeRing: 'ring-2 ring-emerald-500',
    },
    {
      id: 'units',
      title: 'মোট মজুদ',
      fullTitle: 'মোট মজুদ একক (ফিজিক্যাল স্টক)',
      value: (summary.totalStockUnits || 0).toLocaleString('bn-BD'),
      subtext: 'গোডাউন ফিজিক্যাল স্টক',
      icon: PackageCheck,
      color: 'blue',
      bgColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
      activeRing: '',
    },
    {
      id: 'value',
      title: 'স্টক মূল্য',
      fullTitle: 'মোট ইনভেন্টরি বাজারমূল্য',
      value: `৳ ${(summary.totalStockValue || 0).toLocaleString('bn-BD')}`,
      subtext: 'মোট ইনভেন্টরি ভ্যালু',
      icon: Coins,
      color: 'purple',
      bgColor: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
      activeRing: '',
    },
    {
      id: 'low_stock',
      title: 'স্বল্প স্টক',
      fullTitle: 'স্বল্প স্টক সতর্কতা (থ্রেশহোল্ডের নিচে)',
      value: (summary.lowStockCount || 0).toLocaleString('bn-BD'),
      subtext: 'থ্রেশহোল্ডের নিচে',
      icon: AlertTriangle,
      color: 'amber',
      bgColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
      activeRing: 'ring-2 ring-amber-500',
      clickable: true,
      filterKey: 'low_stock',
    },
    {
      id: 'out_of_stock',
      title: 'স্টক শেষ',
      fullTitle: 'স্টক শেষ (শূন্য স্টক পণ্য)',
      value: (summary.outOfStockCount || 0).toLocaleString('bn-BD'),
      subtext: 'জরুরি রিস্টক প্রয়োজন',
      icon: XCircle,
      color: 'red',
      bgColor: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
      activeRing: 'ring-2 ring-red-500',
      clickable: true,
      filterKey: 'out_of_stock',
    },
    {
      id: 'expiring',
      title: 'মেয়াদ সতর্কতা',
      fullTitle: 'মেয়াদোত্তীর্ণ ও আসন্ন মেয়াদ শেষ',
      value: `${(summary.expiredCount || 0).toLocaleString('bn-BD')} / ${(summary.expiringSoonCount || 0).toLocaleString('bn-BD')}`,
      subtext: 'মেয়াদ শেষ ও আসন্ন',
      icon: CalendarClock,
      color: 'rose',
      bgColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
      activeRing: 'ring-2 ring-rose-500',
      clickable: true,
      filterKey: 'expiring_soon',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = card.filterKey && activeFilter === card.filterKey;

        return (
          <div
            key={card.id}
            onClick={() => {
              if (card.clickable && onFilterClick && card.filterKey) {
                onFilterClick(isActive ? 'all' : card.filterKey);
              }
            }}
            className={`relative p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 shadow-2xs transition-all duration-200 ${
              card.clickable ? 'cursor-pointer hover:shadow-xs hover:border-gray-300 dark:hover:border-gray-600' : ''
            } ${isActive ? card.activeRing : ''}`}
          >
            <div className="flex items-center justify-between mb-1 gap-1">
              <span
                className="text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 truncate"
                title={card.fullTitle || card.title}
              >
                {card.title}
              </span>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${card.bgColor}`}>
                <Icon className="w-3 h-3" />
              </div>
            </div>

            <div className="flex items-baseline gap-1 overflow-hidden my-0.5">
              <span
                className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap truncate tracking-tight"
                title={card.value}
              >
                {card.value}
              </span>
            </div>

            <p
              className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 truncate"
              title={card.subtext}
            >
              {card.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
