import React from 'react';
import type { Metadata } from 'next';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FarmerOverviewClient from '@/components/dashboard/farmer/FarmerOverviewClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getMyOrders } from '@/lib/api/order';
import { getMyFavorites } from '@/lib/api/favorite';
import { IOrder } from '@/types/Order';
import { IProduct } from '@/types/Product';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'কৃষক ড্যাশবোর্ড ওভারভিউ | AgroMart AI',
  description: 'খামারিদের কৃষি উপকরণ, ক্রয়কৃত অর্ডার ও সার-বীজ সহায়তার কেন্দ্রীয় ড্যাশবোর্ড।',
};

export default async function FarmerDashboardPage() {
  const { token, user } = await getServerAuth();

  let orders: IOrder[] = [];
  let favorites: IProduct[] = [];

  if (token) {
    try {
      const [fetchedOrders, fetchedFavs] = await Promise.all([
        getMyOrders(token).catch(() => []),
        getMyFavorites(token).catch(() => []),
      ]);
      orders = Array.isArray(fetchedOrders) ? fetchedOrders : [];
      favorites = Array.isArray(fetchedFavs) ? fetchedFavs : [];
    } catch (err) {
      console.warn('Server-side fetch error in farmer overview:', err);
    }
  }

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/farmer' },
    { label: 'কৃষক ওভারভিউ' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header - Rendered on Server */}
      <DashboardHeader title="কৃষক ড্যাশবোর্ড" breadcrumb={breadcrumb} />

      {/* Main Overview Dashboard Component with Initial Server Data */}
      <FarmerOverviewClient
        initialOrders={orders}
        initialFavoritesCount={favorites.length}
        initialUser={user}
      />
    </div>
  );
}
