'use client';

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useAuth } from '@/contexts/AuthContext';
import {
  BookOpen,
  Plus,
  Search,
  RefreshCw,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  X,
  AlertTriangle,
  Calendar,
  Clock,
  Sparkles,
  Eye,
  Tag,
  Loader2,
  UploadCloud,
  ImageIcon,
} from 'lucide-react';
import { BlogPost } from '@/types/blog';
import {
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
  getBlogImageUrl,
} from '@/lib/api/blog';
import { BLOG_CATEGORIES } from '@/constants/blogData';

interface BlogFormData {
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  image: string;
  readTime: string;
  excerpt: string;
  content: string;
  tagsString: string;
  authorName: string;
  authorRole: string;
  featured: boolean;
  isPublished: boolean;
}

const initialFormData: BlogFormData = {
  title: '',
  subtitle: '',
  slug: '',
  category: 'গবাদিপশু ও ছাগল পালন',
  image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
  readTime: '৫ মিনিট পড়া',
  excerpt: '',
  content: '',
  tagsString: '',
  authorName: '',
  authorRole: 'অ্যাগ্রোমার্ট কৃষি গবেষণা ও কনটেন্ট টিম',
  featured: false,
  isPublished: true,
};

interface AdminBlogsClientProps {
  initialBlogs?: BlogPost[];
}

const AdminBlogsClient = ({ initialBlogs = [] }: AdminBlogsClientProps) => {
  const { user, token } = useAuth();

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/admin' },
    { label: 'কৃষি ব্লগ ব্যবস্থাপনা' },
  ];

  // Data states
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [loading, setLoading] = useState(initialBlogs.length === 0);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);
  const [formError, setFormError] = useState<string | null>(null);

  // File Upload states
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processImageFile = (file: File) => {
    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|gif)$/i)) {
      setFormError('অনুগ্রহ করে শুধুমাত্র PNG, JPG, JPEG, WEBP অথবা GIF ফরম্যাটের ছবি নির্বাচন করুন।');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFormError('ছবির সাইজ সর্বোচ্চ ১০ মেগাবাইট (10MB) হতে পারবে।');
      return;
    }
    setSelectedImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormError(null);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Notification alert
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch blogs from server
  const loadBlogs = useCallback(async () => {
    try {
      const res = await getAdminBlogs(token);
      if (res.success) {
        setBlogs(res.data);
      }
    } catch (err: any) {
      showNotification('error', err.message || 'ব্লগ লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    if (initialBlogs.length === 0) {
      loadBlogs();
    }
  }, [initialBlogs.length, loadBlogs]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadBlogs();
  };

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        !searchTerm.trim() ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.tags && blog.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesCategory =
        categoryFilter === 'all' ||
        blog.category === categoryFilter ||
        blog.categorySlug === categoryFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' && blog.isPublished !== false) ||
        (statusFilter === 'draft' && blog.isPublished === false);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, searchTerm, categoryFilter, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter((b) => b.isPublished !== false).length;
    const drafts = blogs.filter((b) => b.isPublished === false).length;
    const featured = blogs.filter((b) => b.featured).length;
    return { total, published, drafts, featured };
  }, [blogs]);

  // Open Create Modal
  const openCreateModal = () => {
    setEditingBlog(null);
    setSelectedImageFile(null);
    setImagePreview(null);
    setFormData({
      ...initialFormData,
      image: '',
      authorName: user?.name || 'অ্যাডমিন',
    });
    setFormError(null);
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setSelectedImageFile(null);
    setImagePreview(blog.image ? getBlogImageUrl(blog.image) : null);
    setFormData({
      title: blog.title || '',
      subtitle: blog.subtitle || '',
      slug: blog.slug || '',
      category: blog.category || 'গবাদিপশু ও ছাগল পালন',
      image: blog.image || '',
      readTime: blog.readTime || '৫ মিনিট পড়া',
      excerpt: blog.excerpt || '',
      content:
        blog.content ||
        (blog.sections && blog.sections.length > 0
          ? blog.sections.map((s) => `${s.sectionTitle}\n${s.paragraphs.join('\n\n')}`).join('\n\n')
          : ''),
      tagsString: blog.tags ? blog.tags.join(', ') : '',
      authorName: blog.author?.name || user?.name || 'অ্যাডমিন',
      authorRole: blog.author?.role || 'অ্যাগ্রোমার্ট টিম',
      featured: Boolean(blog.featured),
      isPublished: blog.isPublished !== false,
    });
    setFormError(null);
    setModalOpen(true);
  };

  // Handle Form Submit (Add / Edit)
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.title.trim()) {
      setFormError('ব্লগের শিরোনাম প্রদান করা আবশ্যক');
      return;
    }
    if (!formData.category.trim()) {
      setFormError('ক্যাটাগরি নির্বাচন করা আবশ্যক');
      return;
    }
    if (!formData.excerpt.trim()) {
      setFormError('সংক্ষিপ্ত বিবরণ (Excerpt) আবশ্যক');
      return;
    }
    if (!selectedImageFile && !formData.image) {
      setFormError('অনুগ্রহ করে ব্লগের জন্য একটি কভার ছবি আপলোড করুন (PNG/JPG/WEBP)');
      return;
    }

    try {
      setSubmitting(true);

      let finalImageUrl = formData.image;
      if (selectedImageFile) {
        const uploadRes = await uploadBlogImage(selectedImageFile, token);
        finalImageUrl = uploadRes.image;
      }

      const tags = formData.tagsString
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload: Partial<BlogPost> = {
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        slug: formData.slug.trim() || undefined,
        category: formData.category.trim(),
        image: finalImageUrl || initialFormData.image,
        readTime: formData.readTime.trim() || '৫ মিনিট পড়া',
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        tags: tags,
        author: {
          name: formData.authorName.trim() || user?.name || 'অ্যাডমিন',
          role: formData.authorRole.trim() || 'অ্যাগ্রোমার্ট টিম',
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        featured: formData.featured,
        isPublished: formData.isPublished,
      };

      if (editingBlog) {
        const blogId = (editingBlog._id || editingBlog.id) as string;
        await updateBlog(blogId, payload, token);
        showNotification('success', 'ব্লগটি সফলভাবে আপডেট করা হয়েছে');
      } else {
        await createBlog(payload, token);
        showNotification('success', 'নতুন কৃষি ব্লগ সফলভাবে যুক্ত করা হয়েছে');
      }

      setModalOpen(false);
      loadBlogs();
    } catch (err: any) {
      setFormError(err.message || 'অপারেশন সম্পন্ন করতে সমস্যা হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Confirmation
  const confirmDelete = (blog: BlogPost) => {
    setBlogToDelete(blog);
    setDeleteModalOpen(true);
  };

  // Execute Delete
  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;

    try {
      setIsDeleting(true);
      const blogId = (blogToDelete._id || blogToDelete.id) as string;
      await deleteBlog(blogId, token);
      showNotification('success', `"${blogToDelete.title}" ব্লগটি সফলভাবে মুছে ফেলা হয়েছে`);
      setDeleteModalOpen(false);
      setBlogToDelete(null);
      loadBlogs();
    } catch (err: any) {
      showNotification('error', err.message || 'ব্লগটি মুছতে সমস্যা হয়েছে');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Breadcrumbs & Action Button */}
      <DashboardHeader
        title="কৃষি ব্লগ ব্যবস্থাপনা"
        subtitle="অ্যাগ্রোমার্ট কৃষি ব্লগ তৈরি, সম্পাদনা, প্রকাশনা ও মুছে ফেলার সম্পূর্ণ নিয়ন্ত্রণ কেন্দ্র"
        breadcrumb={breadcrumb}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
            title="রিফ্রেশ করুন"
          >
            <RefreshCw className={`w-4.5 h-4.5 ${refreshing ? 'animate-spin text-emerald-600' : ''}`} />
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>নতুন ব্লগ লিখুন</span>
          </button>
        </div>
      </DashboardHeader>

      {/* 2. Notification Banner */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-sm flex items-start gap-3 animate-in fade-in duration-200 ${notification.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
            }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* 3. KPI Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">
            <span>সর্বমোট ব্লগ</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.total}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">
            <span>প্রকাশিত আর্টিকেল</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            {stats.published}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">
            <span>ড্রাফট / অপ্রকাশিত</span>
            <XCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {stats.drafts}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">
            <span>বিশেষ প্রতিবেদন</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            {stats.featured}
          </div>
        </div>
      </div>

      {/* 4. Search and Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="শিরোনাম, বিবরণ বা ট্যাগ দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs sm:text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">সকল বিষয় / ক্যাটাগরি</option>
            {BLOG_CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
              <option key={cat.slug} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs sm:text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="published">প্রকাশিত</option>
            <option value="draft">ড্রাফট</option>
          </select>
        </div>
      </div>

      {/* 5. Blogs Listing Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-7 h-7 animate-spin text-emerald-600" />
            <span className="text-sm">ব্লগ তথ্য লোড হচ্ছে...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <BookOpen className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
              কোনো ব্লগ পাওয়া যায়নি
            </h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'আপনার সার্চ ফিল্টারের সাথে মিলে এমন কোনো ব্লগ পাওয়া যায়নি।'
                : 'বর্তমানে কোনো ব্লগ সংরক্ষিত নেই। নতুন ব্লগ তৈরি করতে উপরের বাটনে ক্লিক করুন।'}
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> নতুন ব্লগ যুক্ত করুন
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700/80 bg-gray-50/50 dark:bg-gray-900/40 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">ব্লগ ও শিরোনাম</th>
                  <th className="py-3.5 px-4">ক্যাটাগরি</th>
                  <th className="py-3.5 px-4">লেখক</th>
                  <th className="py-3.5 px-4">তারিখ ও সময়</th>
                  <th className="py-3.5 px-4">স্ট্যাটাস</th>
                  <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-xs sm:text-sm">
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog._id || blog.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    {/* Blog Info & Image */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 max-w-md">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                          <Image
                            src={getBlogImageUrl(blog.image)}
                            alt={blog.title}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            {blog.featured && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                                <Sparkles className="w-2.5 h-2.5" /> ফিচার্ড
                              </span>
                            )}
                            <span className="text-[10px] text-gray-400 truncate">
                              /{blog.slug}
                            </span>
                          </div>
                          <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 hover:text-emerald-600 transition">
                            {blog.title}
                          </h4>
                          <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-1 mt-0.5">
                            {blog.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/60">
                        {blog.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                          <Image
                            src={blog.author?.avatar || initialFormData.image}
                            alt={blog.author?.name || 'Author'}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
                            {blog.author?.name || 'অ্যাডমিন'}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {blog.author?.role || 'কনটেন্ট টিম'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Date & ReadTime */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{blog.date || 'আজ'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime || '৫ মিনিট'}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {blog.isPublished !== false ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-800/60">
                          <CheckCircle2 className="w-3.5 h-3.5" /> প্রকাশিত
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                          <XCircle className="w-3.5 h-3.5" /> ড্রাফট
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Live Link */}
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-700 transition"
                          title="ব্লগ প্রিভিউ দেখুন"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => openEditModal(blog)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition cursor-pointer"
                          title="সম্পাদনা করুন"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => confirmDelete(blog)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 6. Create / Edit Blog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-800 my-8 space-y-6 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {editingBlog ? 'কৃষি ব্লগ সম্পাদনা করুন' : 'নতুন কৃষি ব্লগ যুক্ত করুন'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    সঠিক তথ্য ও বৈজ্ঞানিক দিকনির্দেশনা প্রদান করে কৃষকদের সহায়তা করুন
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error in modal */}
            {formError && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmitForm} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ব্লগ শিরোনাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: মাচা পদ্ধতিতে উন্নত ছাগল পালন নির্দেশিকা"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              {/* Subtitle & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    উপশিরোনাম (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="সংক্ষিপ্ত ভূমিকা বা মূল হাইলাইট"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    ইউআরএল স্লাগ (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="ফাঁকা রাখলে স্বয়ংক্রিয় তৈরি হবে"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Category & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    ক্যাটাগরি <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 cursor-pointer"
                  >
                    {BLOG_CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                      <option key={cat.slug} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    পড়ার সময় (Read Time)
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="যেমন: ৫ মিনিট পড়া"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  কভার ছবি আপলোড করুন (PNG, JPG, WEBP) <span className="text-red-500">*</span>
                </label>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                  onChange={handleImageFileChange}
                  className="hidden"
                  id="blog-image-file-input"
                />

                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2.5">
                    <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden bg-slate-900/10">
                      <img
                        src={imagePreview}
                        alt="Blog Cover Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>ছবি পরিবর্তন</span>
                        </button>
                        <button
                          type="button"
                          onClick={removeSelectedImage}
                          className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-700 text-white transition cursor-pointer shadow-sm"
                          title="ছবি মুছুন"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
                      <span className="truncate max-w-xs font-medium flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                        {selectedImageFile ? selectedImageFile.name : 'বর্তমান সংরক্ষিত ছবি'}
                      </span>
                      {selectedImageFile && (
                        <span className="text-[11px] font-mono">
                          {(selectedImageFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) processImageFile(file);
                    }}
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-7 transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2.5 group ${
                      isDragging
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-4 ring-emerald-500/10'
                        : 'border-gray-300 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-gray-50/50 dark:bg-gray-800/40 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                      <UploadCloud className="w-6 h-6" />
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
                        {isDragging ? 'ছবি এখানে ছেড়ে দিন' : 'ক্লিক করে ছবি আপলোড করুন'}
                      </p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500">
                        PNG, JPG, JPEG, WEBP অথবা GIF (সর্বোচ্চ ১০MB)
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800/60 mt-1">
                      ডিভাইস থেকে ছবি বেছে নিন
                    </span>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  সংক্ষিপ্ত বিবরণ (Excerpt / Summary) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="ব্লগ কার্ডে প্রদর্শনের জন্য ২-৩ লাইনের সারসংক্ষেপ..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ব্লগের বিস্তারিত তথ্য ও কনটেন্ট
                </label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="বিস্তারিত অনুচ্ছেদ, চাষাবাদ বা খামার পরামর্শ লিখুন..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono text-xs"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)
                </label>
                <input
                  type="text"
                  value={formData.tagsString}
                  onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
                  placeholder="যেমন: ছাগল পালন, মাচা পদ্ধতি, রোগ প্রতিরোধ"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    লেখকের নাম
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    placeholder="যেমন: ডাঃ রফিকুল ইসলাম"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    লেখকের পদবী
                  </label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    placeholder="যেমন: কৃষি ও প্রাণিসম্পদ বিশেষজ্ঞ"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Toggles: Featured & Published */}
              <div className="pt-2 flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> বিশেষ প্রতিবেদন (Featured)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-emerald-600" /> ওয়েবসাইটে সরাসরি প্রকাশ করুন (Published)
                  </span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={submitting}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  বাতিল করুন
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <span>{editingBlog ? 'পরিবর্তন সংরক্ষণ করুন' : 'ব্লগ প্রকাশ করুন'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Delete Confirmation Modal */}
      {deleteModalOpen && blogToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                ব্লগটি মুছে ফেলতে চান?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                আপনি কি নিশ্চিতভাবে <span className="font-semibold text-gray-900 dark:text-white">&ldquo;{blogToDelete.title}&rdquo;</span> ব্লগটি মুছে ফেলতে চান? এই অ্যাকশনটি স্থায়ী এবং বাতিল করা যাবে না।
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                বাতিল
              </button>

              <button
                type="button"
                onClick={handleDeleteBlog}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>মুছে ফেলা হচ্ছে...</span>
                  </>
                ) : (
                  <span>হ্যাঁ, মুছে ফেলুন</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(AdminBlogsClient, ['admin']);
