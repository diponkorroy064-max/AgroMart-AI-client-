'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  FolderTree,
  Plus,
  Search,
  RefreshCw,
  FolderPlus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Package,
  Layers,
  AlertTriangle,
  X,
  ExternalLink,
  Tag,
  ArrowUpDown,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  ICategory,
  ISubcategory,
  CategoryFormData,
  SubcategoryFormData,
  CategoryStatus,
} from '@/types/Category';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  toggleSubcategoryStatus,
} from '@/lib/api/category';

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

interface AdminCategoriesClientProps {
  initialCategories?: ICategory[];
}

const AdminCategoriesClient = ({ initialCategories = [] }: AdminCategoriesClientProps) => {
  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/admin' },
    { label: 'ক্যাটাগরি ও সাব-ক্যাটাগরি' },
  ];

  // Data states
  const [categories, setCategories] = useState<ICategory[]>(initialCategories);
  const [loading, setLoading] = useState(initialCategories.length === 0);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    if (initialCategories.length > 0) {
      const initialExpand: Record<string, boolean> = {};
      initialCategories.slice(0, 3).forEach((c) => {
        initialExpand[c._id] = true;
      });
      return initialExpand;
    }
    return {};
  });

  // Modals
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    image: '',
    status: 'active',
    order: 0,
  });

  const [subcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<ISubcategory | null>(null);
  const [subcategoryForm, setSubcategoryForm] = useState<SubcategoryFormData>({
    categoryId: '',
    name: '',
    slug: '',
    description: '',
    status: 'active',
    order: 0,
  });

  // Safe Delete Modal
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    type: 'category' | 'subcategory';
    id: string;
    name: string;
    productCount: number;
  }>({
    isOpen: false,
    type: 'category',
    id: '',
    name: '',
    productCount: 0,
  });

  // Action feedback
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4500);
  };

  // Fetch all categories
  const loadCategories = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const res = await getCategories({
        status: statusFilter === 'all' ? undefined : statusFilter,
        search: searchTerm.trim() || undefined,
      });

      setCategories(res.categories || []);

      // Auto expand first 2 categories on initial load
      if (!isRefresh && res.categories?.length > 0) {
        const initialExpand: Record<string, boolean> = {};
        res.categories.slice(0, 3).forEach((c) => {
          initialExpand[c._id] = true;
        });
        setExpandedCategories((prev) => ({ ...initialExpand, ...prev }));
      }
    } catch (err: any) {
      showNotification('error', err?.message || 'ক্যাটাগরি লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    if (initialCategories.length === 0 || statusFilter !== 'all' || searchTerm !== '') {
      loadCategories();
    }
  }, [loadCategories, statusFilter, searchTerm, initialCategories.length]);

  // Overall statistics
  const stats = useMemo(() => {
    const totalCategories = categories.length;
    let totalSubcategories = 0;
    let totalProducts = 0;
    let activeCategories = 0;

    categories.forEach((cat) => {
      if (cat.status === 'active') activeCategories++;
      totalSubcategories += cat.subcategories?.length || 0;
      totalProducts += cat.productCount || 0;
    });

    return { totalCategories, totalSubcategories, activeCategories, totalProducts };
  }, [categories]);

  // Slug generator helper
  const handleCategoryNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s\u0980-\u09FF-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setCategoryForm((prev) => ({
      ...prev,
      name,
      slug: editingCategory ? prev.slug : slug,
    }));
  };

  const handleSubcategoryNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s\u0980-\u09FF-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setSubcategoryForm((prev) => ({
      ...prev,
      name,
      slug: editingSubcategory ? prev.slug : slug,
    }));
  };

  // Toggle Category Accordion
  const toggleExpand = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    categories.forEach((c) => (all[c._id] = true));
    setExpandedCategories(all);
  };

  const collapseAll = () => {
    setExpandedCategories({});
  };

  // Open Create Category Modal
  const openCreateCategoryModal = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: '',
      slug: '',
      description: '',
      image: '',
      status: 'active',
      order: categories.length + 1,
    });
    setCategoryModalOpen(true);
  };

  // Open Edit Category Modal
  const openEditCategoryModal = (cat: ICategory) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      status: cat.status,
      order: cat.order || 0,
    });
    setCategoryModalOpen(true);
  };

  // Save Category (Create or Edit)
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      showNotification('error', 'ক্যাটাগরির নাম আবশ্যক');
      return;
    }

    try {
      setSubmitting(true);
      if (editingCategory) {
        await updateCategory(editingCategory._id, categoryForm);
        showNotification('success', 'ক্যাটাগরি সফলভাবে আপডেট করা হয়েছে');
      } else {
        await createCategory(categoryForm);
        showNotification('success', 'নতুন ক্যাটাগরি সফলভাবে তৈরি করা হয়েছে');
      }
      setCategoryModalOpen(false);
      loadCategories(true);
    } catch (err: any) {
      showNotification('error', err?.message || 'সংরক্ষণ ব্যর্থ হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Create Subcategory Modal
  const openCreateSubcategoryModal = (defaultCategoryId?: string) => {
    setEditingSubcategory(null);
    const initialCatId = defaultCategoryId || categories[0]?._id || '';
    setSubcategoryForm({
      categoryId: initialCatId,
      name: '',
      slug: '',
      description: '',
      status: 'active',
      order: 1,
    });
    setSubcategoryModalOpen(true);
  };

  // Open Edit Subcategory Modal
  const openEditSubcategoryModal = (sub: ISubcategory) => {
    setEditingSubcategory(sub);
    setSubcategoryForm({
      categoryId: sub.categoryId,
      name: sub.name,
      slug: sub.slug,
      description: sub.description || '',
      status: sub.status,
      order: sub.order || 0,
    });
    setSubcategoryModalOpen(true);
  };

  // Save Subcategory (Create or Edit)
  const handleSaveSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subcategoryForm.name.trim()) {
      showNotification('error', 'সাব-ক্যাটাগরির নাম আবশ্যক');
      return;
    }
    if (!subcategoryForm.categoryId) {
      showNotification('error', 'প্যারেন্ট ক্যাটাগরি নির্বাচন করা আবশ্যক');
      return;
    }

    try {
      setSubmitting(true);
      if (editingSubcategory) {
        await updateSubcategory(editingSubcategory._id, subcategoryForm);
        showNotification('success', 'সাব-ক্যাটাগরি সফলভাবে আপডেট করা হয়েছে');
      } else {
        await createSubcategory(subcategoryForm.categoryId, subcategoryForm);
        showNotification('success', 'নতুন সাব-ক্যাটাগরি সফলভাবে তৈরি করা হয়েছে');
      }
      setSubcategoryModalOpen(false);
      loadCategories(true);
    } catch (err: any) {
      showNotification('error', err?.message || 'সংরক্ষণ ব্যর্থ হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle Category Status (Active / Inactive)
  const handleToggleCatStatus = async (cat: ICategory) => {
    const newStatus: CategoryStatus = cat.status === 'active' ? 'inactive' : 'active';
    try {
      await toggleCategoryStatus(cat._id, newStatus);
      showNotification('success', `ক্যাটাগরি ${newStatus === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে`);
      setCategories((prev) =>
        prev.map((c) => (c._id === cat._id ? { ...c, status: newStatus } : c))
      );
    } catch (err: any) {
      showNotification('error', err?.message || 'স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে');
    }
  };

  // Toggle Subcategory Status
  const handleToggleSubStatus = async (sub: ISubcategory) => {
    const newStatus: CategoryStatus = sub.status === 'active' ? 'inactive' : 'active';
    try {
      await toggleSubcategoryStatus(sub._id, newStatus);
      showNotification('success', `সাব-ক্যাটাগরি ${newStatus === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে`);
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          subcategories: cat.subcategories?.map((s) =>
            s._id === sub._id ? { ...s, status: newStatus } : s
          ),
        }))
      );
    } catch (err: any) {
      showNotification('error', err?.message || 'স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে');
    }
  };

  // Safe Delete Handler Trigger
  const promptDelete = (type: 'category' | 'subcategory', id: string, name: string, productCount = 0) => {
    setDeleteModalState({
      isOpen: true,
      type,
      id,
      name,
      productCount,
    });
  };

  // Confirm Delete or Deactivate
  const handleConfirmDelete = async () => {
    try {
      setSubmitting(true);
      if (deleteModalState.type === 'category') {
        await deleteCategory(deleteModalState.id);
        showNotification('success', 'ক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে');
      } else {
        await deleteSubcategory(deleteModalState.id);
        showNotification('success', 'সাব-ক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে');
      }
      setDeleteModalState((prev) => ({ ...prev, isOpen: false }));
      loadCategories(true);
    } catch (err: any) {
      showNotification('error', err?.message || 'মুছে ফেলতে সমস্যা হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeactivateInstead = async () => {
    try {
      setSubmitting(true);
      if (deleteModalState.type === 'category') {
        await toggleCategoryStatus(deleteModalState.id, 'inactive');
        showNotification('success', 'ক্যাটাগরিটি নিষ্ক্রিয় (Inactive) করা হয়েছে');
      } else {
        await toggleSubcategoryStatus(deleteModalState.id, 'inactive');
        showNotification('success', 'সাব-ক্যাটাগরিটি নিষ্ক্রিয় (Inactive) করা হয়েছে');
      }
      setDeleteModalState((prev) => ({ ...prev, isOpen: false }));
      loadCategories(true);
    } catch (err: any) {
      showNotification('error', err?.message || 'নিষ্ক্রিয় করতে সমস্যা হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header with Breadcrumb & Top Actions */}
      <DashboardHeader title="ক্যাটাগরি ও সাব-ক্যাটাগরি ব্যবস্থাপনা" breadcrumb={breadcrumb} />

      {/* Top Banner Feedback */}
      {notification && (
        <div
          className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-all duration-300 ${
            notification.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Action Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-2xs">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            কৃষি পণ্য বিভাগ ও উপ-বিভাগ কন্ট্রোল
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            কৃষি পণ্যের মূল ক্যাটাগরি ও সাব-ক্যাটাগরি তৈরি, সম্পাদনা, সক্রিয়/নিষ্ক্রিয় ও ক্রম পরিচালনা করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => loadCategories(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-emerald-600' : ''}`} />
            রিফ্রেশ
          </button>

          <button
            type="button"
            onClick={() => openCreateSubcategoryModal()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            নতুন সাব-ক্যাটাগরি
          </button>

          <button
            type="button"
            onClick={openCreateCategoryModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            নতুন ক্যাটাগরি
          </button>
        </div>
      </div>

      {/* 2. KPI Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">মোট ক্যাটাগরি</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <FolderTree className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {stats.totalCategories.toLocaleString('bn-BD')} টি
          </span>
          <p className="text-[11px] text-gray-400 mt-0.5">প্রধান কৃষি বিভাগসমূহ</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">মোট সাব-ক্যাটাগরি</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {stats.totalSubcategories.toLocaleString('bn-BD')} টি
          </span>
          <p className="text-[11px] text-gray-400 mt-0.5">অন্তর্ভুক্ত উপ-বিভাগসমূহ</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">সক্রিয় ক্যাটাগরি</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {stats.activeCategories.toLocaleString('bn-BD')} টি
          </span>
          <p className="text-[11px] text-gray-400 mt-0.5">মার্কেটপ্লেসে দৃশ্যমান</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">মোট সংযুক্ত পণ্য</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {stats.totalProducts.toLocaleString('bn-BD')} টি
          </span>
          <p className="text-[11px] text-gray-400 mt-0.5">শ্রেণিভুক্ত কৃষিপণ্য</p>
        </div>
      </div>

      {/* 3. Filters & Search Controls */}
      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ক্যাটাগরি বা সাব-ক্যাটাগরির নাম বা স্লাগ দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs sm:text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">সকল অবস্থা (All Status)</option>
              <option value="active">শুধুমাত্র সক্রিয় (Active)</option>
              <option value="inactive">শুধুমাত্র নিষ্ক্রিয় (Inactive)</option>
            </select>
          </div>

          <div className="sm:col-span-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={expandAll}
              className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer"
            >
              সব খুলুন
            </button>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer"
            >
              সব বন্ধ করুন
            </button>
          </div>
        </div>
      </div>

      {/* 4. Category Tree / Accordion List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/80">
            <div className="inline-flex items-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-emerald-600" />
              <span>ক্যাটাগরি ডেটা লোড হচ্ছে...</span>
            </div>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 text-gray-500">
            <FolderTree className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">কোনো ক্যাটাগরি পাওয়া যায়নি</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              {searchTerm
                ? 'আপনার সার্চ ফিল্টারের সাথে মিলে এমন কোনো ক্যাটাগরি নেই।'
                : 'নতুন ক্যাটাগরি তৈরি করতে উপরের "+ নতুন ক্যাটাগরি" বাটনে চাপুন।'}
            </p>
          </div>
        ) : (
          categories.map((category) => {
            const isExpanded = Boolean(expandedCategories[category._id]);
            const subCount = category.subcategories?.length || 0;
            const prodCount = category.productCount || 0;

            return (
              <div
                key={category._id}
                className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-2xs overflow-hidden transition-all duration-200"
              >
                {/* Category Header Row */}
                <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    {/* Category Thumbnail */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200/60 dark:border-gray-700/60 shrink-0">
                      {category.image ? (
                        <Image
                          src={resolveImageUrl(category.image)}
                          alt={category.name}
                          fill
                          unoptimized={true}
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40">
                          <FolderTree className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Name & Badges */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                          {category.name}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          slug: {category.slug}
                        </span>
                        {category.order > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold">
                            ক্রম: {category.order}
                          </span>
                        )}
                      </div>

                      {category.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1 max-w-xl">
                          {category.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900">
                          {subCount} টি সাব-ক্যাটাগরি
                        </span>
                        <span className="text-[11px] font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-0.5 rounded-full border border-purple-100 dark:border-purple-900">
                          {prodCount} টি পণ্য
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status Pill */}
                  <div className="flex items-center justify-between md:justify-end gap-2.5 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 dark:border-gray-800">
                    {/* Status Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleCatStatus(category)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                        category.status === 'active'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {category.status === 'active' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>সক্রিয়</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-gray-400" />
                          <span>নিষ্ক্রিয়</span>
                        </>
                      )}
                    </button>

                    {/* Add Subcategory CTA */}
                    <button
                      type="button"
                      onClick={() => openCreateSubcategoryModal(category._id)}
                      className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 cursor-pointer transition"
                      title="এই ক্যাটাগরিতে সাব-ক্যাটাগরি যোগ করুন"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">+ সাব-ক্যাটাগরি</span>
                    </button>

                    {/* Edit Category CTA */}
                    <button
                      type="button"
                      onClick={() => openEditCategoryModal(category)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                      title="ক্যাটাগরি সম্পাদনা"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete Category CTA */}
                    <button
                      type="button"
                      onClick={() => promptDelete('category', category._id, category.name, prodCount)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                      title="ক্যাটাগরি মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Accordion Expand/Collapse */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(category._id)}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                      title={isExpanded ? 'উপ-বিভাগ লুকান' : 'উপ-বিভাগ দেখুন'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Subcategories Accordion Content */}
                {isExpanded && (
                  <div className="bg-gray-50/75 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        {category.name} - এর অন্তর্ভুক্ত সাব-ক্যাটাগরি ({subCount} টি)
                      </h4>

                      <button
                        type="button"
                        onClick={() => openCreateSubcategoryModal(category._id)}
                        className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        নতুন সাব-ক্যাটাগরি যোগ করুন
                      </button>
                    </div>

                    {subCount === 0 ? (
                      <div className="p-6 text-center border border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-400">
                        এই ক্যাটাগরিতে এখনও কোনো সাব-ক্যাটাগরি যোগ করা হয়নি।
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {category.subcategories?.map((sub) => (
                          <div
                            key={sub._id}
                            className="bg-white dark:bg-gray-800 p-3.5 rounded-xl border border-gray-200/70 dark:border-gray-700/70 shadow-2xs flex flex-col justify-between transition hover:border-emerald-300 dark:hover:border-emerald-600/80"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                                  {sub.name}
                                </h5>
                                <button
                                  type="button"
                                  onClick={() => handleToggleSubStatus(sub)}
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition ${
                                    sub.status === 'active'
                                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                  }`}
                                  title="স্ট্যাটাস পরিবর্তন করুন"
                                >
                                  {sub.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                                </button>
                              </div>

                              <span className="text-[10px] font-mono text-gray-400 block truncate">
                                slug: {sub.slug}
                              </span>

                              {sub.description && (
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                  {sub.description}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700/60 pt-2.5 mt-2.5">
                              <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md">
                                {sub.productCount || 0} টি পণ্য
                              </span>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => openEditSubcategoryModal(sub)}
                                  className="p-1 text-gray-400 hover:text-emerald-600 rounded transition cursor-pointer"
                                  title="সাব-ক্যাটাগরি সম্পাদনা"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    promptDelete('subcategory', sub._id, sub.name, sub.productCount || 0)
                                  }
                                  className="p-1 text-gray-400 hover:text-rose-600 rounded transition cursor-pointer"
                                  title="সাব-ক্যাটাগরি মুছুন"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 5. Category Modal (Create / Edit) */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs select-none">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-emerald-600" />
                {editingCategory ? 'ক্যাটাগরি সম্পাদনা করুন' : 'নতুন ক্যাটাগরি তৈরি করুন'}
              </h3>
              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ক্যাটাগরির নাম * (বাংলা ও ইংরেজি)
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: সার ও অনুখাদ্য (Fertilizers)"
                  value={categoryForm.name}
                  onChange={(e) => handleCategoryNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ইউনিক স্লাগ (Slug) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: fertilizers"
                  value={categoryForm.slug || ''}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none font-mono text-xs focus:border-emerald-500"
                />
                <span className="text-[11px] text-gray-400 mt-0.5 block">
                  ইউআরএল ফিল্টারিং ও এসইও (SEO) এর জন্য ব্যবহৃত হবে।
                </span>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ক্যাটাগরি বিবরণ (Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="ক্যাটাগরির সংক্ষিপ্ত বিবরণ লিখুন..."
                  value={categoryForm.description || ''}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  আইকন বা ছবি ইউআরএল (Image URL)
                </label>
                <input
                  type="url"
                  placeholder="https://... অথবা /uploads/..."
                  value={categoryForm.image || ''}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none text-xs focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    ক্রম সংখ্যা (Order)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={categoryForm.order || 0}
                    onChange={(e) => setCategoryForm({ ...categoryForm, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    স্ট্যাটাস (Status)
                  </label>
                  <select
                    value={categoryForm.status}
                    onChange={(e) => setCategoryForm({ ...categoryForm, status: e.target.value as CategoryStatus })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="active">সক্রিয় (Active)</option>
                    <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {submitting ? 'সংরক্ষণ হচ্ছে...' : editingCategory ? 'আপডেট করুন' : 'তৈরি করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Subcategory Modal (Create / Edit) */}
      {subcategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs select-none">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-emerald-600" />
                {editingSubcategory ? 'সাব-ক্যাটাগরি সম্পাদনা' : 'নতুন সাব-ক্যাটাগরি তৈরি করুন'}
              </h3>
              <button
                type="button"
                onClick={() => setSubcategoryModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubcategory} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  প্যারেন্ট ক্যাটাগরি (Parent Category) *
                </label>
                <select
                  required
                  value={subcategoryForm.categoryId}
                  onChange={(e) => setSubcategoryForm({ ...subcategoryForm, categoryId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="" disabled>ক্যাটাগরি নির্বাচন করুন</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name} ({cat.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  সাব-ক্যাটাগরির নাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ইউরিয়া ও নাইট্রোজেন সার"
                  value={subcategoryForm.name}
                  onChange={(e) => handleSubcategoryNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ইউনিক স্লাগ (Slug) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: urea-nitrogen"
                  value={subcategoryForm.slug || ''}
                  onChange={(e) => setSubcategoryForm({ ...subcategoryForm, slug: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none font-mono text-xs focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  সংক্ষিপ্ত বিবরণ (Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="সাব-ক্যাটাগরির বিবরণ লিখুন..."
                  value={subcategoryForm.description || ''}
                  onChange={(e) => setSubcategoryForm({ ...subcategoryForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    ক্রম সংখ্যা (Order)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={subcategoryForm.order || 0}
                    onChange={(e) => setSubcategoryForm({ ...subcategoryForm, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    স্ট্যাটাস (Status)
                  </label>
                  <select
                    value={subcategoryForm.status}
                    onChange={(e) => setSubcategoryForm({ ...subcategoryForm, status: e.target.value as CategoryStatus })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="active">সক্রিয় (Active)</option>
                    <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setSubcategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {submitting ? 'সংরক্ষণ হচ্ছে...' : editingSubcategory ? 'আপডেট করুন' : 'তৈরি করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Safe Delete Confirmation Modal */}
      {deleteModalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs select-none">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 dark:border-gray-700 space-y-4">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h4 className="text-base font-bold text-gray-900 dark:text-white">
                {deleteModalState.type === 'category' ? 'ক্যাটাগরি' : 'সাব-ক্যাটাগরি'} মুছতে চান?
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                আপনি কি নিশ্চিত যে <span className="font-bold text-gray-800 dark:text-gray-200">"{deleteModalState.name}"</span> মুছে ফেলতে চান?
              </p>
            </div>

            {deleteModalState.productCount > 0 ? (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <p className="font-bold">সতর্কতা (Data Integrity Protection):</p>
                <p>
                  এই বিভাগের অধীনে বর্তমানে <strong>{deleteModalState.productCount} টি পণ্য</strong> যুক্ত রয়েছে। পণ্য থাকা অবস্থায় এটি স্থায়ীভাবে মুছে ফেলা যাবে না।
                </p>
                <p className="pt-1 text-[11px] text-amber-700 dark:text-amber-300">
                  সুপারিশ: মার্কেটপ্লেসে প্রদর্শন বন্ধ রাখতে এটি <strong>নিষ্ক্রিয় (Inactive)</strong> করুন।
                </p>
              </div>
            ) : null}

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setDeleteModalState((prev) => ({ ...prev, isOpen: false }))}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 cursor-pointer"
              >
                বাতিল
              </button>

              {deleteModalState.productCount > 0 ? (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleDeactivateInstead}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white cursor-pointer transition shadow-xs"
                >
                  {submitting ? 'প্রসেসিং...' : 'নিষ্ক্রিয় (Inactive) করুন'}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleConfirmDelete}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer transition shadow-xs"
                >
                  {submitting ? 'মুছে ফেলা হচ্ছে...' : 'স্থায়ীভাবে মুছুন'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(AdminCategoriesClient, ['admin']);
