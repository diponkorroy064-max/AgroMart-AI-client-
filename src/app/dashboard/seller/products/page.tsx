'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  Package,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Edit2,
  Trash2,
  Boxes,
  Upload,
  X,
  AlertCircle,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IProduct, ProductFormData, ProductStatus } from '@/types/Product';
import {
  getSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from '@/lib/api/product';
import { getCategories } from '@/lib/api/category';
import { ICategory } from '@/types/Category';

export const resolveProductImageUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '')
    : 'http://localhost:5000';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

const CATEGORIES = [
  'বীজ',
  'সার ও অনুখাদ্য',
  'বালাইনাশক ও কীটনাশক',
  'কৃষি যন্ত্রপাতি ও যন্ত্রাংশ',
  'পশুপালন ও ডেইরি উপকরণ',
  'সেচ সরঞ্জাম',
  'অন্যান্য কৃষি পণ্য',
];

const SellerProductsPage = () => {
  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/seller' },
    { label: 'আমার বিক্রয় পণ্য' },
  ];

  // Data states
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categoriesList, setCategoriesList] = useState<ICategory[]>([]);
  const [counts, setCounts] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: CATEGORIES[0],
    subcategory: '',
    categoryId: undefined,
    subcategoryId: undefined,
    image: '',
  });

  // Action states
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Auto-dismiss notification after 4 seconds
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Fetch active categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories({ status: 'active' });
        if (res?.categories && res.categories.length > 0) {
          setCategoriesList(res.categories);
        }
      } catch (err) {
        console.error('Failed to load categories for seller:', err);
      }
    };
    loadCategories();
  }, []);

  // Fetch seller products
  const loadSellerProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getSellerProducts(activeTab === 'all' ? undefined : activeTab, searchTerm);
      setProducts(res.products);
      if (res.counts) {
        setCounts(res.counts);
      }
    } catch (err: any) {
      showNotification('error', err?.message || 'পণ্য লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchTerm]);

  useEffect(() => {
    loadSellerProducts();
  }, [loadSellerProducts]);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setPreviewUrl('');
    const defaultCat = categoriesList[0]?.name || CATEGORIES[0];
    const defaultCatId = categoriesList[0]?._id;
    setFormData({
      name: '',
      description: '',
      price: 0,
      quantity: 1,
      category: defaultCat,
      categoryId: defaultCatId,
      subcategory: '',
      subcategoryId: undefined,
      image: '',
    });
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (product: IProduct) => {
    setEditingProduct(product);
    setPreviewUrl('');
    const matchedCat = categoriesList.find(
      (c) => c._id === product.categoryId || c.name === product.category
    );
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      categoryId: product.categoryId || matchedCat?._id,
      subcategory: product.subcategory || '',
      subcategoryId: product.subcategoryId,
      image: product.image || '',
    });
    setIsModalOpen(true);
  };

  // Handle image upload with immediate local preview and robust error recovery
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      showNotification('error', 'ছবির আকার ১৫ মেগাবাইটের বেশি হতে পারবে না');
      if (e.target) e.target.value = '';
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    try {
      setUploadingImage(true);
      const data = new FormData();
      data.append('image', file);
      data.append('file', file);
      const result = await uploadProductImage(data);
      const finalImage = result.image || result.url;
      setFormData((prev) => ({ ...prev, image: finalImage }));
      showNotification('success', 'ছবি সফলভাবে আপলোড হয়েছে');
    } catch (err: any) {
      console.error('Image upload error:', err);
      setPreviewUrl('');
      showNotification('error', err?.message || 'ছবি আপলোড করতে ব্যর্থ হয়েছে');
    } finally {
      setUploadingImage(false);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  // Save (Create or Update)
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || formData.price <= 0) {
      showNotification('error', 'পণ্যের নাম, বিবরণ এবং সঠিক মূল্য প্রদান করুন');
      return;
    }

    try {
      setSubmitting(true);
      if (editingProduct?._id) {
        await updateProduct(String(editingProduct._id), formData);
        showNotification('success', 'পণ্য সফলভাবে আপডেট করা হয়েছে');
      } else {
        await createProduct(formData);
        showNotification('success', 'নতুন পণ্য সফলভাবে যোগ করা হয়েছে (অনুমোদনের অপেক্ষায়)');
      }
      setIsModalOpen(false);
      loadSellerProducts();
    } catch (err: any) {
      showNotification('error', err?.message || 'পণ্য সংরক্ষণ করা সম্ভব হয়নি');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      showNotification('success', 'পণ্য সফলভাবে মুছে ফেলা হয়েছে');
      setDeleteConfirmId(null);
      loadSellerProducts();
    } catch (err: any) {
      showNotification('error', err?.message || 'পণ্য মুছতে সমস্যা হয়েছে');
    }
  };

  // Render Status Badge
  const renderStatusBadge = (status?: ProductStatus) => {
    const currentStatus = status || 'approved'; // Legacy or approved
    switch (currentStatus) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
            অনুমোদিত
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Clock size={13} className="text-amber-600 dark:text-amber-400" />
            অনুমোদনের অপেক্ষায়
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            <XCircle size={13} className="text-rose-600 dark:text-rose-400" />
            বাতিলকৃত
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Breadcrumb and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DashboardHeader title="আমার বিক্রয় পণ্য" breadcrumb={breadcrumb} />
        <div className="flex items-center gap-2">
          <Button
            onClick={loadSellerProducts}
            variant="secondary"
            className="flex items-center gap-2 text-xs sm:text-sm px-3 py-2 cursor-pointer"
            title="রিফ্রেশ করুন"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">রিফ্রেশ</span>
          </Button>

          <Button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 text-xs sm:text-sm px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm cursor-pointer transition"
          >
            <Plus size={16} />
            <span>নতুন পণ্য যোগ করুন</span>
          </Button>
        </div>
      </div>

      {/* 2. Notification Toast */}
      {notification && (
        <div
          className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-medium transition-all ${notification.type === 'success'
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

      {/* 3. Minimalist Metric Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">মোট বিক্রয় পণ্য</span>
            <Package size={18} className="text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{counts.total}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">অনুমোদিত পণ্য</span>
            <CheckCircle2 size={18} className="text-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">{counts.approved}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">অনুমোদনের অপেক্ষায়</span>
            <Clock size={18} className="text-amber-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">{counts.pending}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-500 dark:text-rose-400">বাতিলকৃত পণ্য</span>
            <XCircle size={18} className="text-rose-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-rose-600 dark:text-rose-400">{counts.rejected}</p>
        </div>
      </div>

      {/* 4. Filter Tabs & Search Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700/80 p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Minimalist Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${activeTab === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              সকল পণ্য ({counts.total})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('approved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${activeTab === 'approved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              অনুমোদিত ({counts.approved})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${activeTab === 'pending'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              অপেক্ষমান ({counts.pending})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rejected')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${activeTab === 'rejected'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              বাতিলকৃত ({counts.rejected})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="পণ্য খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* 5. Product Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center gap-2">
            <RefreshCw size={24} className="animate-spin text-emerald-600" />
            <span>পণ্য তালিকা লোড হচ্ছে...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Boxes size={24} className="text-gray-400" />
            </div>
            <p className="font-medium text-gray-700 dark:text-gray-300">কোনো পণ্য পাওয়া যায়নি</p>
            <p className="text-xs text-gray-400 max-w-sm">
              {searchTerm || activeTab !== 'all'
                ? 'বর্তমান ফিল্টারের সাথে মিলে এমন কোনো পণ্য পাওয়া যায়নি।'
                : 'আপনার দোকানে এখনো কোনো পণ্য যোগ করা হয়নি। উপরে থাকা "নতুন পণ্য যোগ করুন" বাটনে ক্লিক করুন।'}
            </p>
            {activeTab !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold underline cursor-pointer"
              >
                সকল পণ্য দেখুন
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50/80 dark:bg-gray-900/40 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3.5">পণ্য</th>
                  <th className="px-4 py-3.5">ক্যাটাগরি</th>
                  <th className="px-4 py-3.5">মূল্য</th>
                  <th className="px-4 py-3.5">মজুত স্টক</th>
                  <th className="px-4 py-3.5">অ্যাডমিন স্ট্যাটাস</th>
                  <th className="px-4 py-3.5 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {products.map((product) => {
                  const imageSrc = product.image ? resolveProductImageUrl(product.image) : '/placeholder.png';
                  return (
                    <tr
                      key={String(product._id)}
                      className="hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      {/* Product Thumbnail & Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                            {product.image ? (
                              <Image
                                src={imageSrc}
                                alt={product.name}
                                fill
                                unoptimized={true}
                                sizes="44px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Package size={18} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category & Subcategory */}
                      <td className="px-4 py-3.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                        <span className="inline-block bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                          {product.category}
                        </span>
                        {product.subcategory && (
                          <span className="block text-[11px] text-gray-500 dark:text-gray-400 font-normal mt-1">
                            ↳ {product.subcategory}
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3.5 font-bold text-emerald-700 dark:text-emerald-400">
                        ৳ {product.price}
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-3.5 text-xs">
                        <span
                          className={`font-semibold ${product.quantity <= 5
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-gray-800 dark:text-gray-200'
                            }`}
                        >
                          {product.quantity} টি
                        </span>
                        {product.quantity <= 5 && (
                          <span className="block text-[10px] text-rose-500 font-medium">স্টক সীমিত</span>
                        )}
                      </td>

                      {/* Admin Approval Status */}
                      <td className="px-4 py-3.5">
                        {renderStatusBadge(product.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(product)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:bg-gray-700/60 transition cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(String(product._id))}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:text-gray-400 dark:hover:bg-gray-700/60 transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 size={15} />
                          </button>
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

      {/* 6. Minimalist Add / Edit Product Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget && !submitting && !uploadingImage) {
              setIsModalOpen(false);
            }
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                {editingProduct ? 'পণ্য তথ্য আপডেট করুন' : 'নতুন পণ্য যোগ করুন'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={submitting || uploadingImage}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition cursor-pointer disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="p-6 space-y-4 max-h-[calc(88vh-80px)] overflow-y-auto">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  পণ্যের নাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: উন্নত জাতের মরিচ বীজ"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Category & Subcategory Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    ক্যাটাগরি *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const selectedName = e.target.value;
                      const matched = categoriesList.find((c) => c.name === selectedName);
                      setFormData({
                        ...formData,
                        category: selectedName,
                        categoryId: matched?._id,
                        subcategory: '',
                        subcategoryId: undefined,
                      });
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {categoriesList.length > 0 ? (
                      categoriesList.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))
                    ) : (
                      CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    উপ-ক্যাটাগরি (ঐচ্ছিক)
                  </label>
                  {(() => {
                    const currentCategoryObj = categoriesList.find(
                      (c) => c._id === formData.categoryId || c.name === formData.category
                    );
                    const availableSubs =
                      currentCategoryObj?.subcategories?.filter((s) => s.status !== 'inactive') || [];

                    return (
                      <select
                        value={formData.subcategory || ''}
                        disabled={availableSubs.length === 0}
                        onChange={(e) => {
                          const subName = e.target.value;
                          const matchedSub = availableSubs.find((s) => s.name === subName);
                          setFormData({
                            ...formData,
                            subcategory: subName,
                            subcategoryId: matchedSub?._id,
                          });
                        }}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                      >
                        <option value="">
                          {availableSubs.length === 0
                            ? 'কোনো উপ-ক্যাটাগরি নেই'
                            : '-- উপ-ক্যাটাগরি নির্বাচন করুন --'}
                        </option>
                        {availableSubs.map((sub) => (
                          <option key={sub._id} value={sub.name}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    );
                  })()}
                </div>
              </div>

              {/* Price & Quantity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    মূল্য (৳) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="৳ ০"
                    value={formData.price || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Math.max(0, Number(e.target.value)) })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    মজুত পরিমাণ (স্টক সংখ্যা) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="যেমন: ৫০"
                    value={formData.quantity || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: Math.max(0, Number(e.target.value)) })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Product Image Upload & Preview */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  পণ্যের ছবি
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {(previewUrl || formData.image) && (
                    <div className="relative w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700 shadow-xs">
                      <Image
                        src={resolveProductImageUrl(previewUrl || formData.image)}
                        alt="Product Preview"
                        fill
                        unoptimized={true}
                        sizes="56px"
                        className="object-cover"
                      />
                      {uploadingImage && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 size={16} className="animate-spin text-white" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hidden file input controlled via fileInputRef */}
                  <input
                    ref={fileInputRef}
                    id="product-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={uploadingImage}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer transition shadow-2xs disabled:opacity-50"
                  >
                    {uploadingImage ? (
                      <Loader2 size={14} className="animate-spin text-emerald-600" />
                    ) : (
                      <Upload size={14} className="text-emerald-600" />
                    )}
                    <span>{uploadingImage ? 'ছবি আপলোড হচ্ছে...' : 'ছবি নির্বাচন করুন'}</span>
                  </button>

                  {(formData.image || previewUrl) && !uploadingImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, image: '' }));
                        setPreviewUrl('');
                      }}
                      className="text-xs text-rose-500 hover:underline cursor-pointer"
                    >
                      ছবি মুছুন
                    </button>
                  )}
                </div>

                {/* Direct Image URL input option */}
                <div className="mt-1">
                  <input
                    type="url"
                    placeholder="অথবা ছবির ওয়েব লিংক পেস্ট করুন (যেমন: https://...)"
                    value={formData.image && !formData.image.startsWith('/uploads/') ? formData.image : ''}
                    onChange={(e) => {
                      setPreviewUrl('');
                      setFormData((prev) => ({ ...prev, image: e.target.value.trim() }));
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  পণ্যের বিস্তারিত বিবরণ *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="পণ্যটির বিশেষত্ব, ব্যবহার বিধি ও পরিমাপ লিখুন..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                  className="text-xs sm:text-sm px-4 py-2 cursor-pointer"
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="text-xs sm:text-sm px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg cursor-pointer"
                >
                  {submitting ? 'সংরক্ষণ হচ্ছে...' : editingProduct ? 'আপডেট করুন' : 'যোগ করুন'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Minimalist Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs select-none">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 shadow-xl border border-gray-100 dark:border-gray-700 space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Trash2 size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">
                পণ্যটি মুছে ফেলতে চান?
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                এই পণ্যটি ড্যাশবোর্ড ও মার্কেটপ্লেস থেকে স্থায়ীভাবে মুছে ফেলা হবে।
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                onClick={() => setDeleteConfirmId(null)}
                className="text-xs px-3 py-1.5 cursor-pointer"
              >
                বাতিল
              </Button>
              <button
                type="button"
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="text-xs px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition cursor-pointer"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(SellerProductsPage);
