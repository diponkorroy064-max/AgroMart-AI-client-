import React from 'react';
import type { Metadata } from 'next';
import AdminProductsClient from '@/components/dashboard/admin/AdminProductsClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getAdminProducts } from '@/lib/api/admin';
import { IProduct } from '@/types/Product';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'পণ্য অনুমোদন ও নিরীক্ষা | AgroMart AI',
  description: 'মার্কেটপ্লেসে আপলোডকৃত নতুন পণ্যের মান যাচাই, অনুমোদন এবং বাতিলকরণ ব্যবস্থাপনা।',
};

export default async function AdminProductsPage() {
  const { token } = await getServerAuth();

  let products: IProduct[] = [];
  let total = 0;

  if (token) {
    try {
      const res = await getAdminProducts(undefined, undefined, token).catch((err) => {
        console.warn('Server fetch admin products error:', err);
        return { products: [], total: 0 };
      });
      products = res?.products || [];
      total = res?.total || 0;
    } catch (err) {
      console.warn('Server-side fetch error in admin products:', err);
    }
  }

  return <AdminProductsClient initialProducts={products} initialTotal={total} />;
}
