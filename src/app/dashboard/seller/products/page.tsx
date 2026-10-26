import React from 'react';
import type { Metadata } from 'next';
import SellerProductsClient from '@/components/dashboard/seller/SellerProductsClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getSellerProducts } from '@/lib/api/product';
import { getCategories } from '@/lib/api/category';
import { IProduct } from '@/types/Product';
import { ICategory } from '@/types/Category';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'আমার বিক্রয় পণ্য ও ইনভেন্টরি | AgroMart AI',
  description: 'বিক্রেতার আপলোডকৃত কৃষি বীজ, সার, কীটনাশক ও আধুনিক যন্ত্রপাতির তালিকা ও ব্যবস্থাপনা।',
};

export default async function SellerProductsPage() {
  const { token } = await getServerAuth();

  let products: IProduct[] = [];
  let counts = { total: 0, approved: 0, pending: 0, rejected: 0 };
  let categories: ICategory[] = [];

  try {
    const catRes = await getCategories({ status: 'active' }).catch(() => null);
    if (catRes?.categories && catRes.categories.length > 0) {
      categories = catRes.categories;
    }
  } catch (err) {
    console.warn('Server fetch categories error:', err);
  }

  if (token) {
    try {
      const prodRes = await getSellerProducts(undefined, undefined, token).catch((err) => {
        console.warn('Server fetch seller products error:', err);
        return { products: [], counts: { total: 0, approved: 0, pending: 0, rejected: 0 } };
      });
      products = prodRes.products || [];
      if (prodRes.counts) {
        counts = prodRes.counts;
      }
    } catch (err) {
      console.warn('Server-side fetch error in seller products:', err);
    }
  }

  return (
    <SellerProductsClient
      initialProducts={products}
      initialCounts={counts}
      initialCategories={categories}
    />
  );
}
