'use client';
import { useEffect, useState, useCallback } from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { CheckCircle2, XCircle, Clock, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IProduct, ProductStatus } from '@/types/Product';
import { getAdminProducts, updateProductStatusByAdmin } from '@/lib/api/admin';

interface AdminProductsClientProps {
  initialProducts?: IProduct[];
  initialTotal?: number;
}

function AdminProductsClient({ initialProducts = [], initialTotal = 0 }: AdminProductsClientProps) {
  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/admin' },
    { label: 'পণ্য অনুমোদন ও তালিকা' },
  ];

  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAdminProducts(activeTab === 'all' ? undefined : activeTab, search);
      setProducts(res.products || []);
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'পণ্য লোড করতে ব্যর্থ হয়েছে' });
    } finally {
      setLoading(false);
    }
  }, [activeTab, search]);

  useEffect(() => {
    if (initialProducts.length === 0 || activeTab !== 'all' || search !== '') {
      loadProducts();
    }
  }, [loadProducts, activeTab, search, initialProducts.length]);

  const handleStatusChange = async (productId: string, newStatus: ProductStatus) => {
    try {
      setUpdatingId(productId);
      await updateProductStatusByAdmin(productId, newStatus);
      setMessage({
        type: 'success',
        text: newStatus === 'approved' ? 'পণ্য অনুমোদন করা হয়েছে' : 'পণ্য বাতিল করা হয়েছে',
      });
      loadProducts();
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে' });
    } finally {
      setUpdatingId(null);
    }
  };

  const renderBadge = (status?: ProductStatus) => {
    const s = status || 'approved';
    switch (s) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400">
            <CheckCircle2 size={12} />
            অনুমোদিত ও সক্রিয়
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
            <Clock size={12} />
            পর্যালোচনাধীন
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400">
            <XCircle size={12} />
            বাতিলকৃত
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DashboardHeader title="মার্কেটপ্লেস পণ্য তালিকা ও অনুমোদন" breadcrumb={breadcrumb} />
        <Button
          onClick={loadProducts}
          variant="secondary"
          className="flex items-center gap-2 text-xs sm:text-sm px-3 py-2 cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>রিফ্রেশ</span>
        </Button>
      </div>

      {message && (
        <div
          className={`p-3 rounded-xl text-sm font-medium flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <span>{message.text}</span>
          <button
            onClick={() => setMessage(null)}
            className="text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700/80">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer capitalize ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab === 'all'
                ? 'সকল পণ্য'
                : tab === 'pending'
                ? 'পর্যালোচনাধীন (Pending)'
                : tab === 'approved'
                ? 'অনুমোদিত (Approved)'
                : 'বাতিলকৃত (Rejected)'}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="পণ্য বা বিক্রেতা খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <DashboardCard title="সকল কৃষি পণ্য ও উপকরণের তালিকা">
        {loading ? (
          <div className="py-12 text-center text-sm text-gray-500 flex flex-col items-center justify-center gap-2">
            <RefreshCw size={20} className="animate-spin text-emerald-600" />
            <span>পণ্য তালিকা লোড হচ্ছে...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-500">
            কোনো পণ্য পাওয়া যায়নি
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-700/60 text-xs text-gray-700 dark:text-gray-200 uppercase font-bold">
                <tr>
                  <th className="px-4 py-3">পণ্য আইডি ও নাম</th>
                  <th className="px-4 py-3">ক্যাটাগরি</th>
                  <th className="px-4 py-3">বিক্রেতা</th>
                  <th className="px-4 py-3">মূল্য</th>
                  <th className="px-4 py-3">মজুত</th>
                  <th className="px-4 py-3">স্ট্যাটাস</th>
                  <th className="px-4 py-3 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {products.map((item) => (
                  <tr
                    key={String(item._id)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-400">আইডি: {String(item._id).slice(-6)}</p>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{item.category}</span>
                      {item.subcategory && (
                        <span className="block text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                          ↳ {item.subcategory}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                      {item.seller?.name || item.farmer?.name || 'বিক্রেতা'}
                    </td>
                    <td className="px-4 py-3 font-bold text-green-700">৳ {item.price}</td>
                    <td className="px-4 py-3 text-xs">{item.quantity} টি</td>
                    <td className="px-4 py-3">{renderBadge(item.status)}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {item.status !== 'approved' && (
                        <button
                          type="button"
                          disabled={updatingId === String(item._id)}
                          onClick={() => handleStatusChange(String(item._id), 'approved')}
                          className="px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 transition cursor-pointer"
                        >
                          অনুমোদন
                        </button>
                      )}
                      {item.status !== 'rejected' && (
                        <button
                          type="button"
                          disabled={updatingId === String(item._id)}
                          onClick={() => handleStatusChange(String(item._id), 'rejected')}
                          className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 transition cursor-pointer"
                        >
                          বাতিল
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DashboardCard>
    </div>
  );
}

export default withAuth(AdminProductsClient, ['admin']);
