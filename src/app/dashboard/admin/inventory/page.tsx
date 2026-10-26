import React from 'react';
import type { Metadata } from 'next';
import AdminInventoryClient from '@/components/dashboard/admin/AdminInventoryClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getInventory } from '@/lib/api/inventory';
import { InventoryListResponse } from '@/types/Inventory';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'সেন্ট্রাল ইনভেন্টরি ট্র্যাকিং | AgroMart AI',
  description: 'মার্কেটপ্লেসের সমস্ত পণ্য মজুদ, গুদাম অবস্থান, স্টক অডিট ও মেয়াদের কেন্দ্রীয় পর্যবেক্ষণ।',
};

export default async function AdminInventoryPage() {
  const { token } = await getServerAuth();

  let inventoryData: InventoryListResponse | null = null;

  if (token) {
    try {
      inventoryData = await getInventory({ page: 1, limit: 10 }, token).catch((err) => {
        console.warn('Server fetch admin inventory error:', err);
        return null;
      });
    } catch (err) {
      console.warn('Server-side fetch error in admin inventory:', err);
    }
  }

  return <AdminInventoryClient initialData={inventoryData} />;
}
