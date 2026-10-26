import type { Metadata } from 'next';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SellerInventoryClient from '@/components/dashboard/seller/SellerInventoryClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getInventory } from '@/lib/api/inventory';
import { InventoryItem, InventorySummary } from '@/types/Inventory';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ইনভেন্টরি ও স্টক ব্যবস্থাপনা | AgroMart AI',
  description: 'গুদামে সংরক্ষিত বীজ, সার, কীটনাশকের সঠিক স্টক গণনা, মেয়াদ ট্র্যাকিং ও অডিট হিস্ট্রি।',
};

export default async function SellerInventoryPage() {
  const { token } = await getServerAuth();

  let items: InventoryItem[] = [];
  let summary: InventorySummary = {
    totalProducts: 0,
    totalStockUnits: 0,
    totalStockValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    expiredCount: 0,
    expiringSoonCount: 0,
  };
  let pagination: { total: number; totalPages: number; page: number; limit: number } | undefined = undefined;

  if (token) {
    try {
      const res = await getInventory({ page: 1, limit: 10, sort: 'newest' }, token).catch((err) => {
        console.warn('Server fetch inventory error:', err);
        return null;
      });
      if (res) {
        items = res.items || [];
        if (res.summary) summary = res.summary;
        if (res.pagination) pagination = res.pagination;
      }
    } catch (err) {
      console.warn('Server-side fetch error in seller inventory:', err);
    }
  }

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/seller' },
    { label: 'ইনভেন্টরি ম্যানেজমেন্ট' },
  ];

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="ইনভেন্টরি ও স্টক ব্যবস্থাপনা"
        breadcrumb={breadcrumb}
      />

      <SellerInventoryClient
        initialItems={items}
        initialSummary={summary}
        initialPagination={pagination}
      />
    </div>
  );
}
