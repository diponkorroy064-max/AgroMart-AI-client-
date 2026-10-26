import React from 'react';
import type { Metadata } from 'next';
import AdminOverviewClient from '@/components/dashboard/admin/AdminOverviewClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getAdminStats } from '@/lib/api/admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'অ্যাডমিন ড্যাশবোর্ড ওভারভিউ | AgroMart AI',
  description: 'কেন্দ্রীয় প্ল্যাটফর্ম পরিসংখ্যান, পণ্য অনুমোদন, অর্ডার নিরীক্ষা ও প্রশাসনিক নিয়ন্ত্রণ প্যানেল।',
};

export default async function AdminDashboardPage() {
  const { token, user } = await getServerAuth();

  let stats = null;
  let recentPendingProducts: any[] = [];
  let recentOrders: any[] = [];

  if (token) {
    try {
      const res = await getAdminStats(token).catch((err) => {
        console.warn('Server fetch admin stats error:', err);
        return null;
      });
      if (res?.success && res?.stats) {
        stats = res.stats;
        recentPendingProducts = res.recentPendingProducts || [];
        recentOrders = res.recentOrders || [];
      }
    } catch (err) {
      console.warn('Server-side fetch error in admin overview:', err);
    }
  }

  return (
    <AdminOverviewClient
      initialStats={stats}
      initialPendingProducts={recentPendingProducts}
      initialRecentOrders={recentOrders}
      initialUser={user}
    />
  );
}
