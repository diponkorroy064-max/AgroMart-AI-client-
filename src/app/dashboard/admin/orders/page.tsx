import React from 'react';
import type { Metadata } from 'next';
import AdminOrdersClient from '@/components/dashboard/admin/AdminOrdersClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getAdminOrders } from '@/lib/api/admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'সকল অর্ডার নিরীক্ষা ও ট্র্যাকিং | AgroMart AI',
  description: 'মার্কেটপ্লেসের সমস্ত কৃষক ও বিক্রেতাদের লেনদেন, অর্ডার অবস্থা ও রাজস্ব নিরীক্ষা।',
};

export default async function AdminOrdersPage() {
  const { token } = await getServerAuth();

  let orders: any[] = [];

  if (token) {
    try {
      const res = await getAdminOrders(undefined, undefined, token).catch((err) => {
        console.warn('Server fetch admin orders error:', err);
        return [];
      });
      orders = Array.isArray(res) ? res : res?.orders || [];
    } catch (err) {
      console.warn('Server-side fetch error in admin orders:', err);
    }
  }

  return <AdminOrdersClient initialOrders={orders} />;
}
