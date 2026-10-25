'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Settings2,
  Calendar,
  Layers,
  MapPin,
  Scale,
  Bell,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { InventoryItem, InventorySettingsPayload } from '@/types/Inventory';
import { Button } from '@/components/ui/Button';

interface InventorySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: InventoryItem | null;
  onSettingsSubmit: (productId: string, payload: InventorySettingsPayload) => Promise<void>;
}

const COMMON_UNITS = [
  'কেজি',
  'গ্রাম',
  'বস্তা',
  'প্যাকেট',
  'লিটার',
  'মিলি',
  'টি / পিস',
  'মণ',
  'টন',
];

export default function InventorySettingsModal({
  isOpen,
  onClose,
  product,
  onSettingsSubmit,
}: InventorySettingsModalProps) {
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(5);
  const [batchNumber, setBatchNumber] = useState('');
  const [unit, setUnit] = useState('কেজি');
  const [warehouseLocation, setWarehouseLocation] = useState('');
  const [mfgDate, setMfgDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setLowStockThreshold(product.lowStockThreshold || 5);
      setBatchNumber(product.batchNumber || '');
      setUnit(product.unit || 'কেজি');
      setWarehouseLocation(product.warehouseLocation || '');
      setMfgDate(
        product.mfgDate ? new Date(product.mfgDate).toISOString().split('T')[0] : ''
      );
      setExpiryDate(
        product.expiryDate ? new Date(product.expiryDate).toISOString().split('T')[0] : ''
      );
      setError(null);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSettingsSubmit(product._id, {
        lowStockThreshold: Number(lowStockThreshold),
        batchNumber: batchNumber.trim() || undefined,
        unit: unit.trim() || undefined,
        warehouseLocation: warehouseLocation.trim() || undefined,
        mfgDate: mfgDate || undefined,
        expiryDate: expiryDate || undefined,
      });

      onClose();
    } catch (err: any) {
      setError(err?.message || 'ইনভেন্টরি সেটিংস সংরক্ষণ করতে ত্রুটি হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
              <Settings2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                ইনভেন্টরি সেটিংস ও ব্যাচ তথ্য
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {product.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Unit & Low Stock Threshold */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-emerald-600" /> পরিমাপের একক (Unit)
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                {COMMON_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                <Bell className="w-3.5 h-3.5 text-amber-500" /> স্বল্প স্টক অ্যালার্ট সীমা
              </label>
              <input
                type="number"
                min="0"
                required
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                placeholder="যেমন: ৫"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
              <span className="text-[11px] text-gray-400 mt-0.5 block">
                স্টক এই সংখ্যার নিচে নামলে সতর্কবার্তা দেবে
              </span>
            </div>
          </div>

          {/* Batch Number & Warehouse Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-blue-500" /> ব্যাচ / লট নম্বর
              </label>
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="যেমন: BATCH-2026-001"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> গোডাউন / ওয়্যারহাউজ
              </label>
              <input
                type="text"
                value={warehouseLocation}
                onChange={(e) => setWarehouseLocation(e.target.value)}
                placeholder="যেমন: গোডাউন-১, র‍্যাক-সি"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Manufacturing / Packing Date & Expiry Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" /> উৎপাদন / প্যাকিং তারিখ
              </label>
              <input
                type="date"
                value={mfgDate}
                onChange={(e) => setMfgDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-500" /> মেয়াদোত্তীর্ণের তারিখ
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              বাতিল
            </button>
            <Button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> সংরক্ষণ হচ্ছে...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> সেটিংস সংরক্ষণ করুন
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
