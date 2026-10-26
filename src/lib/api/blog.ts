import { BlogPost } from '@/types/blog';
import { BLOG_POSTS } from '@/constants/blogData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = (token?: string | null) => {
  const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  return {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };
};

/**
 * Normalize blog object from MongoDB
 */
const normalizeBlog = (raw: any): BlogPost => {
  const id = raw._id ? String(raw._id) : (raw.id || `blog-${Date.now()}`);
  return {
    ...raw,
    _id: id,
    id: id,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    keyTakeaways: Array.isArray(raw.keyTakeaways) ? raw.keyTakeaways : [],
    sections: Array.isArray(raw.sections) ? raw.sections : [],
    subtitle: raw.subtitle || '',
    author: raw.author || {
      name: 'অ্যাডমিন',
      role: 'অ্যাগ্রোমার্ট টিম',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
  };
};

/**
 * Helper to filter static fallback blogs
 */
const filterStaticBlogs = (params: {
  category?: string;
  search?: string;
  limit?: number;
  featured?: boolean;
} = {}): BlogPost[] => {
  let filtered = [...BLOG_POSTS];
  if (params.category && params.category !== 'all') {
    filtered = filtered.filter((p) => p.categorySlug === params.category || p.category === params.category);
  }
  if (params.search && params.search.trim()) {
    const q = params.search.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (params.featured) {
    filtered = filtered.filter((p) => p.featured);
  }
  if (params.limit) {
    filtered = filtered.slice(0, params.limit);
  }
  return filtered;
};

/**
 * Public: Fetch published blogs from MongoDB API with fallback
 */
export const getBlogs = async (params: {
  category?: string;
  search?: string;
  limit?: number;
  featured?: boolean;
} = {}): Promise<BlogPost[]> => {
  try {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.search && params.search.trim()) query.append('search', params.search.trim());
    if (params.limit) query.append('limit', String(params.limit));
    if (params.featured) query.append('featured', 'true');

    const res = await fetch(`${API_URL}/blogs?${query.toString()}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data.map(normalizeBlog);
      }
      // If DB has no blogs yet and it is not a search query, fall back to static data
      if (data.success && Array.isArray(data.data) && data.data.length === 0 && !params.search) {
        return filterStaticBlogs(params);
      }
      if (data.success && Array.isArray(data.data)) {
        return [];
      }
    }
    throw new Error(`Failed to fetch blogs: ${res.statusText}`);
  } catch (err) {
    console.warn('API getBlogs error, falling back to static data:', err);
    return filterStaticBlogs(params);
  }
};

/**
 * Public: Fetch single blog by slug or ID
 */
export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  const decodedSlug = decodeURIComponent(slug);
  try {
    const res = await fetch(`${API_URL}/blogs/slug/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return normalizeBlog(data.data);
      }
    } else {
      console.warn(`API getBlogBySlug returned status ${res.status} for slug "${slug}", checking static data`);
    }
  } catch (err) {
    console.warn('API getBlogBySlug error, falling back to static:', err);
  }

  // Always fall back to static constants if API returned 404, not found, or error
  return (
    BLOG_POSTS.find(
      (p) =>
        p.slug === slug ||
        p.slug === decodedSlug ||
        String(p.id) === slug ||
        String(p.id) === decodedSlug ||
        String(p._id) === slug ||
        String(p._id) === decodedSlug
    ) || null
  );
};

/**
 * Admin: Fetch all blogs (including unpublished/drafts)
 */
export const getAdminBlogs = async (
  token?: string | null,
  params: { search?: string; category?: string } = {}
): Promise<{ success: boolean; count: number; data: BlogPost[] }> => {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'all') query.append('category', params.category);
  if (params.search && params.search.trim()) query.append('search', params.search.trim());

  const res = await fetch(`${API_URL}/blogs/admin/all?${query.toString()}`, {
    headers: getAuthHeaders(token),
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'অ্যাডমিন ব্লগ লোড করতে ব্যর্থ হয়েছে');
  }

  const data = await res.json();
  return {
    success: true,
    count: data.count || 0,
    data: Array.isArray(data.data) ? data.data.map(normalizeBlog) : [],
  };
};

/**
 * Admin: Create new blog in MongoDB
 */
export const createBlog = async (
  blogData: Partial<BlogPost>,
  token?: string | null
): Promise<{ success: boolean; message: string; data: BlogPost }> => {
  const res = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(blogData),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'ব্লগ তৈরি করতে সমস্যা হয়েছে');
  }

  return {
    success: true,
    message: data.message,
    data: normalizeBlog(data.data),
  };
};

/**
 * Admin: Update blog in MongoDB
 */
export const updateBlog = async (
  id: string,
  blogData: Partial<BlogPost>,
  token?: string | null
): Promise<{ success: boolean; message: string; data: BlogPost }> => {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(blogData),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'ব্লগ আপডেট করতে সমস্যা হয়েছে');
  }

  return {
    success: true,
    message: data.message,
    data: normalizeBlog(data.data),
  };
};

/**
 * Admin: Delete blog from MongoDB
 */
export const deleteBlog = async (
  id: string,
  token?: string | null
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'ব্লগ মুছতে সমস্যা হয়েছে');
  }

  return {
    success: true,
    message: data.message,
  };
};

/**
 * Resolve blog image URL (handling relative /uploads/ paths vs remote URLs)
 */
export const getBlogImageUrl = (url?: string): string => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80';
  }
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('blob:') ||
    url.startsWith('data:')
  ) {
    return url;
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '')
    : 'http://localhost:5000';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

/**
 * Admin: Upload blog cover image (PNG, JPG, WEBP, GIF)
 */
export const uploadBlogImage = async (
  file: File,
  token?: string | null
): Promise<{ success: boolean; message: string; image: string }> => {
  const formData = new FormData();
  formData.append('image', file);

  const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  const res = await fetch(`${API_URL}/blogs/upload`, {
    method: 'POST',
    headers: {
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'ছবি আপলোড করতে ব্যর্থ হয়েছে');
  }

  return data;
};

