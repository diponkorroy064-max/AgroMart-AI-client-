'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  PlusCircle,
  MinusCircle,
  AlertOctagon,
  Layers,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { InventoryItem, StockAdjustPayload } from '@/types/Inventory';
import { Button } from '@/components/ui/Button';

interface StockAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: InventoryItem | null;
  onAdjustSubmit: (payload: StockAdjustPayload) => Promise<void>;
}

export default function StockAdjustModal({
  isOpen,
  onClose,
  product,
  onAdjustSubmit,
}: StockAdjustModalProps) {
  const [type, setType] = useState<'restock' | 'damaged' | 'expired' | 'adjustment'>('restock');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [reason, setReason] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setType('restock');
      setQuantity('');
      setReason('');
      setBatchNumber(product.batchNumber || '');
      setExpiryDate(
        product.expiryDate ? new Date(product.expiryDate).toISOString().split('T')[0] : ''
      );
      setError(null);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const currentStock = Number(product.quantity || 0);
  const delta = Number(quantity || 0);

  let calculatedNewStock = currentStock;
  if (type === 'restock') {
    calculatedNewStock = currentStock + delta;
  } else if (type === 'damaged' || type === 'expired') {
    calculatedNewStock = currentStock - delta;
  } else {
    // adjustment
    calculatedNewStock = delta; // User specifies the new exact physical count
  }

  const isInvalid =
    quantity === '' ||
    Number(quantity) <= 0 ||
    calculatedNewStock < 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isInvalid) return;

    setError(null);
    setLoading(true);

    try {
      let finalDelta = Number(quantity);
      if (type === 'damaged' || type === 'expired') {
        finalDelta = -Math.abs(finalDelta);
      } else if (type === 'adjustment') {
        // Delta relative to current stock
        finalDelta = Number(quantity) - currentStock;
      }

      await onAdjustSubmit({
        productId: product._id,
        type,
        quantityChange: finalDelta,
        reason: reason.trim() || undefined,
        batchNumber: batchNumber.trim() || undefined,
        expiryDate: expiryDate || undefined,
      });

      onClose();
    } catch (err: any) {
      setError(err?.message || 'স্টক সমন্বয় করতে ত্রুটি দেখা দিয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const typeOptions = [
    {
      id: 'restock',
      title: 'নতুন স্টক যোগ (Restock)',
      desc: 'নতুন চালান বা ক্রয়ের মাধ্যমে স্টক বৃদ্ধি',
      icon: PlusCircle,
      color: 'emerald',
      activeBorder: 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300',
    },
    {
      id: 'damaged',
      title: 'ক্ষতিগ্রস্থ / নষ্ট স্টক বাদ (Damage)',
      desc: 'পরিবহন, ইঁদুর বা পোকামাকড়ের ক্ষতিতে হ্রাস',
      icon: MinusCircle,
      color: 'amber',
      activeBorder: 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300',
    },
    {
      id: 'expired',
      title: 'মেয়াদোত্তীর্ণ স্টক বাতিল (Expired)',
      desc: 'মেয়াদ শেষ হওয়ায় ইনভেন্টরি থেকে অপসারণ',
      icon: AlertOctagon,
      color: 'rose',
      activeBorder: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300',
    },
    {
      id: 'adjustment',
      title: 'ফিজিক্যাল অডিট গণনা (Audit Count)',
      desc: 'গোডাউন গণনায় প্রকৃত বাস্তব স্টক নির্ধারণ',
      icon: Layers,
      color: 'blue',
      activeBorder: 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              স্টক সমন্বয় ও আপডেট
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              পণ্য: <span className="font-semibold text-emerald-700 dark:text-emerald-400">{product.name}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Stock Banner */}
        <div className="mx-6 mt-5 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/70 border border-gray-200/70 dark:border-gray-700/70 flex items-center justify-between text-xs sm:text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400 block text-xs">বর্তমান মোট মজুদ</span>
            <span className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white">
              {currentStock} {product.unit || 'কেজি'}
            </span>
          </div>

          <div className="text-right">
            <span className="text-gray-500 dark:text-gray-400 block text-xs">সমন্বয়ের পর নতুন মজুদ</span>
            <span
              className={`text-base sm:text-lg font-extrabold ${
                calculatedNewStock < 0
                  ? 'text-red-500'
                  : calculatedNewStock <= (product.lowStockThreshold || 5)
                  ? 'text-amber-500'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {calculatedNewStock < 0 ? 'ত্রুটি (০ এর নিচে)' : `${calculatedNewStock} ${product.unit || 'কেজি'}`}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4.5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              সমন্বয়ের ধরণ নির্বাচন করুন *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {typeOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = type === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setType(opt.id as any)}
                    className={`p-3 rounded-xl border cursor-pointer transition text-left flex items-start gap-2.5 ${
                      isSelected
                        ? opt.activeBorder
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-800/40 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold leading-tight">{opt.title}</h4>
                      <p className="text-[11px] opacity-75 mt-0.5">{opt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              {type === 'adjustment'
                ? `প্রকৃত মোট স্টক পরিমাণ (${product.unit || 'কেজি'}) *`
                : `${type === 'restock' ? 'যোগ করার পরিমাণ' : 'বাদ দেওয়ার পরিমাণ'} (${product.unit || 'কেজি'}) *`}
            </label>
            <input
              type="number"
              min="0"
              step="any"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="পরিমাণ লিখুন..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Batch Number & Expiry Date (Optional Updates) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                ব্যাচ নম্বর (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="যেমন: BATCH-2026-01"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                মেয়াদোত্তীর্ণের তারিখ (ঐচ্ছিক)
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Reason / Note */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              সমন্বয়ের কারণ বা অডিট নোট (ঐচ্ছিক)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="যেমন: চালান নং #৪২২১ থেকে প্রাপ্ত নতুন সরবরাহ"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
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
              disabled={isInvalid || loading}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> সংরক্ষণ হচ্ছে...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> স্টক নিশ্চিত করুন
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
