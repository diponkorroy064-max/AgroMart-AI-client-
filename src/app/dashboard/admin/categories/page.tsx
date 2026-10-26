import React from 'react';
import type { Metadata } from 'next';
import AdminCategoriesClient from '@/components/dashboard/admin/AdminCategoriesClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getCategories } from '@/lib/api/category';
import { ICategory } from '@/types/Category';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ক্যাটাগরি ও সাব-ক্যাটাগরি পরিচালনা | AgroMart AI',
  description: 'কৃষি পণ্য, বীজ, সার, কীটনাশক ও আধুনিক যন্ত্রপাতির হায়ারার্কিক্যাল শ্রেণীবিন্যাস ব্যবস্থাপনা।',
};

export default async function AdminCategoriesPage() {
  const { token } = await getServerAuth();

  let categories: ICategory[] = [];

  try {
    const res = await getCategories({}, token || undefined).catch((err) => {
      console.warn('Server fetch categories error:', err);
      return { success: false, total: 0, categories: [] };
    });
    categories = res?.categories || [];
  } catch (err) {
    console.warn('Server-side fetch error in admin categories:', err);
  }

  return <AdminCategoriesClient initialCategories={categories} />;
}
