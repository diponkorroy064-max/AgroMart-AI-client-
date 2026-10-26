'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Boxes,
  Package,
  Search,
  PlusCircle,
  Settings2,
  AlertTriangle,
  RefreshCw,
  History,
  FileText,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  ShieldAlert,
} from 'lucide-react';
import {
  InventoryItem,
  InventorySummary,
  StockAdjustPayload,
  InventorySettingsPayload,
  IStockMovement,
  InventoryAlertsResponse,
  InventoryReportResponse,
} from '@/types/Inventory';
import {
  getInventory,
  adjustStock,
  updateInventorySettings,
  getStockMovements,
  getInventoryAlerts,
  getInventoryReport,
} from '@/lib/api/inventory';
import InventorySummaryCards from '@/components/inventory/InventorySummaryCards';
import StockAdjustModal from '@/components/inventory/StockAdjustModal';
import InventorySettingsModal from '@/components/inventory/InventorySettingsModal';
import StockMovementTable from '@/components/inventory/StockMovementTable';
import InventoryAlertsView from '@/components/inventory/InventoryAlertsView';
import InventoryReportView from '@/components/inventory/InventoryReportView';
import { useAuth } from '@/contexts/AuthContext';

const CATEGORIES = [
  'All',
  'বীজ',
  'সার ও অনুখাদ্য',
  'বালাইনাশক ও কীটনাশক',
  'কৃষি যন্ত্রপাতি ও যন্ত্রাংশ',
  'পশুপালন ও ডেইরি উপকরণ',
  'সেচ সরঞ্জাম',
  'অন্যান্য কৃষি পণ্য',
];

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

function ProductThumbnail({ name, image }: { name: string; image?: string }) {
  const [hasError, setHasError] = useState(false);
  const src = image && !hasError ? resolveImageUrl(image) : null;

  return (
    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200/60 dark:border-gray-700/60 shrink-0">
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          unoptimized={true}
          sizes="40px"
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <Package className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}

interface SellerInventoryClientProps {
  initialItems?: InventoryItem[];
  initialSummary?: InventorySummary;
  initialPagination?: { total: number; totalPages: number; page: number; limit: number };
}

export default function SellerInventoryClient({
  initialItems = [],
  initialSummary = {
    totalProducts: 0,
    totalStockUnits: 0,
    totalStockValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    expiredCount: 0,
    expiringSoonCount: 0,
  },
  initialPagination,
}: SellerInventoryClientProps) {
  const { token } = useAuth();

  // Active view tab
  const [activeTab, setActiveTab] = useState<'stock' | 'movements' | 'alerts' | 'reports'>('stock');

  // Inventory Table States
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [summary, setSummary] = useState<InventorySummary>(initialSummary);
  const [loading, setLoading] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(initialPagination?.page || 1);
  const [totalPages, setTotalPages] = useState(initialPagination?.totalPages || 1);
  const [totalCount, setTotalCount] = useState(initialPagination?.total || initialItems.length);

  // Movements Audit Log States
  const [movements, setMovements] = useState<IStockMovement[]>([]);
  const [movementsLoading, setMovementsLoading] = useState(false);
  const [movementTypeFilter, setMovementTypeFilter] = useState('all');
  const [movementsPage, setMovementsPage] = useState(1);
  const [movementsTotalPages, setMovementsTotalPages] = useState(1);
  const [movementsTotal, setMovementsTotal] = useState(0);

  // Alerts & Reports States
  const [alerts, setAlerts] = useState<InventoryAlertsResponse | null>(null);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [report, setReport] = useState<InventoryReportResponse | null>(null);
  const [reportLoading, setReportLoading] = useState(false);

  // Modal States
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);

  // Notification State
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load Inventory Data
  const loadInventory = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      const res = await getInventory({
        search: debouncedSearch.trim(),
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        status: selectedStatus === 'all' ? undefined : selectedStatus,
        sort: sortBy,
        page,
        limit: 10,
      });

      setItems(res.items || []);
      setSummary(res.summary);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotalCount(res.pagination?.total || 0);
    } catch (err: any) {
      showNotification('error', err?.message || 'ইনভেন্টরি ডেটা লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedCategory, selectedStatus, sortBy, page]);

  // Load Movements Data
  const loadMovements = useCallback(async () => {
    try {
      setMovementsLoading(true);
      const res = await getStockMovements({
        type: movementTypeFilter === 'all' ? undefined : movementTypeFilter,
        page: movementsPage,
        limit: 15,
      });
      setMovements(res.movements || []);
      setMovementsTotalPages(res.pagination?.totalPages || 1);
      setMovementsTotal(res.pagination?.total || 0);
    } catch (err: any) {
      console.error('Failed to load movements:', err);
    } finally {
      setMovementsLoading(false);
    }
  }, [movementTypeFilter, movementsPage]);

  // Load Alerts Data
  const loadAlerts = useCallback(async () => {
    try {
      setAlertsLoading(true);
      const res = await getInventoryAlerts();
      setAlerts(res);
    } catch (err: any) {
      console.error('Failed to load alerts:', err);
    } finally {
      setAlertsLoading(false);
    }
  }, []);

  // Load Reports Data
  const loadReport = useCallback(async () => {
    try {
      setReportLoading(true);
      const res = await getInventoryReport();
      setReport(res);
    } catch (err: any) {
      console.error('Failed to load report:', err);
    } finally {
      setReportLoading(false);
    }
  }, []);

  // Effect triggers based on active tab & filters
  const [initialMounted, setInitialMounted] = useState(false);

  useEffect(() => {
    if (!initialMounted) {
      setInitialMounted(true);
      return;
    }
    if (activeTab === 'stock') {
      loadInventory();
    }
  }, [activeTab, debouncedSearch, selectedCategory, selectedStatus, sortBy, page, initialMounted, loadInventory]);

  useEffect(() => {
    if (activeTab === 'movements') {
      loadMovements();
    } else if (activeTab === 'alerts') {
      loadAlerts();
    } else if (activeTab === 'reports') {
      loadReport();
    }
  }, [activeTab, loadMovements, loadAlerts, loadReport]);

  // Handle Stock Adjust Submit
  const handleStockAdjustSubmit = async (payload: StockAdjustPayload) => {
    await adjustStock(payload);
    showNotification('success', 'পণ্যটির স্টক সফলভাবে সমন্বয় করা হয়েছে');
    loadInventory(true);
    if (activeTab === 'movements') loadMovements();
  };

  // Handle Inventory Settings Submit
  const handleSettingsSubmit = async (productId: string, payload: InventorySettingsPayload) => {
    await updateInventorySettings(productId, payload);
    showNotification('success', 'ইনভেন্টরি সেটিংস সফলভাবে আপডেট করা হয়েছে');
    loadInventory(true);
  };

  const handleOpenAdjust = (product: InventoryItem) => {
    setSelectedProduct(product);
    setAdjustModalOpen(true);
  };

  const handleOpenSettings = (product: InventoryItem) => {
    setSelectedProduct(product);
    setSettingsModalOpen(true);
  };

  const hasUrgentAlerts = summary.outOfStockCount > 0 || summary.expiredCount > 0;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all shadow-md ${notification.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/80 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
            }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertOctagon className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Urgent Alert Banner */}
      {hasUrgentAlerts && activeTab === 'stock' && (
        <div className="p-4 sm:p-4.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold">
                জরুরি স্টক অ্যালার্ট সংকেত
              </h4>
              <p className="text-xs opacity-85">
                {summary.outOfStockCount > 0 && `${summary.outOfStockCount} টি পণ্যের স্টক শূন্য`}
                {summary.outOfStockCount > 0 && summary.expiredCount > 0 && ' এবং '}
                {summary.expiredCount > 0 && `${summary.expiredCount} টি পণ্য মেয়াদোত্তীর্ণ হয়েছে`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('alerts')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition shadow-2xs whitespace-nowrap cursor-pointer"
          >
            অ্যালার্টসমূহ দেখুন
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('stock')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition border-b-2 cursor-pointer ${activeTab === 'stock'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-gray-800/60'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
        >
          <Boxes className="w-4 h-4" />
          <span>স্টক নিয়ন্ত্রণ ও তালিকা</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('movements')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition border-b-2 cursor-pointer ${activeTab === 'movements'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-gray-800/60'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
        >
          <History className="w-4 h-4" />
          <span>স্টক মুভমেন্ট ও অডিট হিস্ট্রি</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('alerts')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition border-b-2 cursor-pointer ${activeTab === 'alerts'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-gray-800/60'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>সতর্কবার্তা ও অ্যালার্ট</span>
          {(summary.outOfStockCount > 0 || summary.expiredCount > 0) && (
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition border-b-2 cursor-pointer ${activeTab === 'reports'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-gray-800/60'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
        >
          <FileText className="w-4 h-4" />
          <span>মূল্যায়ন ও রিপোর্ট</span>
        </button>
      </div>

      {/* Tab 1: Stock Management List */}
      {activeTab === 'stock' && (
        <div className="space-y-6">
          {/* Summary KPI Cards */}
          <InventorySummaryCards
            summary={summary}
            activeFilter={selectedStatus}
            onFilterClick={(status) => {
              setSelectedStatus(status);
              setPage(1);
            }}
          />

          {/* Filters & Search Controls */}
          <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-4 shadow-2xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Search Bar */}
              <div className="sm:col-span-5 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="পণ্য, ব্যাচ নম্বর বা গোডাউন দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Category Filter */}
              <div className="sm:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="All">সকল ক্যাটাগরি</option>
                  {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock Status Filter */}
              <div className="sm:col-span-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="all">সকল অবস্থা</option>
                  <option value="in_stock">স্টকে আছে</option>
                  <option value="low_stock">স্বল্প স্টক</option>
                  <option value="out_of_stock">স্টক শেষ</option>
                  <option value="expiring_soon">মেয়াদ আসন্ন (৩০ দিন)</option>
                  <option value="expired">মেয়াদোত্তীর্ণ</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="sm:col-span-2">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="newest">সর্বশেষ</option>
                  <option value="stock_asc">স্টক: কম থেকে বেশি</option>
                  <option value="stock_desc">স্টক: বেশি থেকে কম</option>
                  <option value="price_asc">মূল্য: কম থেকে বেশি</option>
                  <option value="price_desc">মূল্য: বেশি থেকে কম</option>
                  <option value="expiry_asc">মেয়াদোত্তীর্ণ তারিখ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stock Table */}
          <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-50/75 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">পণ্য ও ছবি</th>
                    <th className="py-3 px-4">ক্যাটাগরি</th>
                    <th className="py-3 px-4">ব্যাচ ও ওয়্যারহাউজ</th>
                    <th className="py-3 px-4 text-center">বর্তমান মজুদ</th>
                    <th className="py-3 px-4 text-center">রিজার্ভড</th>
                    <th className="py-3 px-4 text-center">বিক্রয়যোগ্য (Avail.)</th>
                    <th className="py-3 px-4">মেয়াদোত্তীর্ণের তারিখ</th>
                    <th className="py-3 px-4">স্ট্যাটাস</th>
                    <th className="py-3 px-4 text-right">পদক্ষেপ</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-400 dark:text-gray-500">
                        <div className="inline-flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                          <span>ইনভেন্টরি লোড হচ্ছে...</span>
                        </div>
                      </td>
                    </tr>
                  ) : items.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-400 dark:text-gray-500">
                        কোনো ইনভেন্টরি পণ্য খুঁজে পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    items.map((product) => {
                      const isOutOfStock = product.quantity <= 0;
                      const isLowStock =
                        product.quantity > 0 &&
                        product.quantity <= (product.lowStockThreshold || 5);
                      const isExpired = product.isExpired;
                      const isExpiringSoon = product.isExpiringSoon;

                      return (
                        <tr
                          key={product._id}
                          className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors"
                        >
                          {/* Image & Name */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <ProductThumbnail name={product.name} image={product.image} />
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 max-w-xs">
                                  {product.name}
                                </h4>
                                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                                  ৳ {product.price} / {product.unit || 'কেজি'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3 px-4 whitespace-nowrap text-xs text-gray-600 dark:text-gray-300">
                            {product.category}
                          </td>

                          {/* Batch & Warehouse Location */}
                          <td className="py-3 px-4 whitespace-nowrap text-xs">
                            <div className="flex flex-col">
                              <span className="font-mono text-gray-700 dark:text-gray-300">
                                {product.batchNumber || 'N/A'}
                              </span>
                              <span className="text-[11px] text-gray-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                {product.warehouseLocation || 'প্রধান গোডাউন'}
                              </span>
                            </div>
                          </td>

                          {/* Current Stock */}
                          <td className="py-3 px-4 whitespace-nowrap text-center">
                            <span
                              className={`text-sm font-extrabold ${isOutOfStock
                                  ? 'text-red-500'
                                  : isLowStock
                                    ? 'text-amber-500'
                                    : 'text-gray-900 dark:text-white'
                                }`}
                            >
                              {product.quantity}
                            </span>
                            <span className="text-[11px] text-gray-400 ml-1">
                              {product.unit || 'কেজি'}
                            </span>
                          </td>

                          {/* Reserved Stock */}
                          <td className="py-3 px-4 whitespace-nowrap text-center text-xs font-mono text-gray-500 dark:text-gray-400">
                            {product.reservedStock || 0}
                          </td>

                          {/* Available Stock */}
                          <td className="py-3 px-4 whitespace-nowrap text-center">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${product.availableStock <= 0
                                  ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                }`}
                            >
                              {product.availableStock} {product.unit || 'কেজি'}
                            </span>
                          </td>

                          {/* Expiry Date */}
                          <td className="py-3 px-4 whitespace-nowrap text-xs">
                            {product.expiryDate ? (
                              <div className="flex flex-col">
                                <span
                                  className={`font-semibold ${isExpired
                                      ? 'text-rose-600 dark:text-rose-400 font-bold'
                                      : isExpiringSoon
                                        ? 'text-amber-600 dark:text-amber-400 font-bold'
                                        : 'text-gray-600 dark:text-gray-300'
                                    }`}
                                >
                                  {new Date(product.expiryDate).toLocaleDateString('bn-BD')}
                                </span>
                                {isExpired && (
                                  <span className="text-[10px] text-rose-500 font-bold">
                                    (মেয়াদোত্তীর্ণ)
                                  </span>
                                )}
                                {!isExpired && isExpiringSoon && (
                                  <span className="text-[10px] text-amber-500 font-semibold">
                                    (মেয়াদ আসন্ন)
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400">প্রযোজ্য নয়</span>
                            )}
                          </td>

                          {/* Status Badge */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            {isExpired ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                                <XCircle className="w-3 h-3" /> মেয়াদ শেষ
                              </span>
                            ) : isOutOfStock ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                                <XCircle className="w-3 h-3" /> স্টক শূন্য
                              </span>
                            ) : isLowStock ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                <AlertTriangle className="w-3 h-3" /> স্বল্প স্টক
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                <CheckCircle2 className="w-3 h-3" /> পর্যাপ্ত
                              </span>
                            )}
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3 px-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                title="স্টক সমন্বয় করুন"
                                onClick={() => handleOpenAdjust(product)}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 transition flex items-center gap-1 cursor-pointer"
                              >
                                <PlusCircle className="w-3.5 h-3.5" />
                                <span>স্টক সমন্বয়</span>
                              </button>

                              <button
                                type="button"
                                title="ইনভেন্টরি সেটিংস"
                                onClick={() => handleOpenSettings(product)}
                                className="p-1.5 rounded-xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition cursor-pointer"
                              >
                                <Settings2 className="w-4 h-4" />
                              </button>
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
                  মোট {totalCount} টির মধ্যে পৃষ্ঠা {page} / {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    পূর্ববর্তী
                  </button>
                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    পরবর্তী
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Stock Movements Audit Log */}
      {activeTab === 'movements' && (
        <StockMovementTable
          movements={movements}
          loading={movementsLoading}
          typeFilter={movementTypeFilter}
          onTypeFilterChange={(type) => {
            setMovementTypeFilter(type);
            setMovementsPage(1);
          }}
          page={movementsPage}
          totalPages={movementsTotalPages}
          total={movementsTotal}
          onPageChange={(p) => setMovementsPage(p)}
        />
      )}

      {/* Tab 3: Alerts & Urgent Actions */}
      {activeTab === 'alerts' && (
        <InventoryAlertsView
          alerts={alerts}
          loading={alertsLoading}
          onQuickRestockClick={(item) => {
            const matched = items.find((p) => p._id === item._id);
            if (matched) {
              handleOpenAdjust(matched);
            }
          }}
        />
      )}

      {/* Tab 4: Reports & Valuation */}
      {activeTab === 'reports' && (
        <InventoryReportView report={report} loading={reportLoading} />
      )}

      {/* Modals */}
      <StockAdjustModal
        isOpen={adjustModalOpen}
        onClose={() => setAdjustModalOpen(false)}
        product={selectedProduct}
        onAdjustSubmit={handleStockAdjustSubmit}
      />

      <InventorySettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        product={selectedProduct}
        onSettingsSubmit={handleSettingsSubmit}
      />
    </div>
  );
}
