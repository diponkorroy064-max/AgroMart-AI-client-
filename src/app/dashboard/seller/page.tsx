import React from 'react';
import type { Metadata } from 'next';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SellerOverviewClient from '@/components/dashboard/seller/SellerOverviewClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getSellerProducts } from '@/lib/api/product';
import { getSellerOrders } from '@/lib/api/order';
import { IProduct, SellerProductStats } from '@/types/Product';
import { IOrder } from '@/types/Order';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'বিক্রেতা ড্যাশবোর্ড ওভারভিউ | AgroMart AI',
  description: 'বিক্রেতার সামগ্রিক বিক্রয় তথ্য, অর্ডার অবস্থা ও মজুত পণ্যের কেন্দ্রীয় ওভারভিউ।',
};

export default async function SellerDashboardPage() {
  const { token, user } = await getServerAuth();

  let products: IProduct[] = [];
  let counts: SellerProductStats = {
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  };
  let orders: IOrder[] = [];

  if (token) {
    try {
      const [productRes, orderRes] = await Promise.all([
        getSellerProducts('all', undefined, token).catch((err) => {
          console.warn('Server fetch seller products error:', err);
          return { products: [], counts: { total: 0, approved: 0, pending: 0, rejected: 0 } };
        }),
        getSellerOrders(token).catch((err) => {
          console.warn('Server fetch seller orders error:', err);
          return [];
        }),
      ]);

      products = productRes.products || [];
      if (productRes.counts) {
        counts = productRes.counts;
      }
      orders = Array.isArray(orderRes) ? orderRes : [];
    } catch (err) {
      console.warn('Server-side fetch error in seller overview:', err);
    }
  }

  return (
    <SellerOverviewClient
      initialProducts={products}
      initialCounts={counts}
      initialOrders={orders}
      initialUser={user}
    />
  );
}
