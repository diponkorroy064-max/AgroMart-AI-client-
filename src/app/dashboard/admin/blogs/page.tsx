import type { Metadata } from 'next';
import AdminBlogsClient from '@/components/dashboard/admin/AdminBlogsClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getAdminBlogs } from '@/lib/api/blog';
import { BlogPost } from '@/types/blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'কৃষি ব্লগ ও কনটেন্ট পরিচালনা | AgroMart AI',
  description: 'কৃষি গবেষণা, ফসল চাষ পদ্ধতি, রোগবালাই দমন ও আধুনিক প্রযুক্তির ব্লগ আর্টিকেল ব্যবস্থাপনা।',
};

export default async function AdminBlogsPage() {
  const { token } = await getServerAuth();

  let blogs: BlogPost[] = [];

  if (token) {
    try {
      const res = await getAdminBlogs(token).catch((err) => {
        console.warn('Server fetch admin blogs error:', err);
        return { success: false, count: 0, data: [] };
      });
      if (res?.success && Array.isArray(res.data)) {
        blogs = res.data;
      }
    } catch (err) {
      console.warn('Server-side fetch error in admin blogs:', err);
    }
  }

  return <AdminBlogsClient initialBlogs={blogs} />;
}
