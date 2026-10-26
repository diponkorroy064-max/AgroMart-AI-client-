import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { ShoppingBag } from 'lucide-react';
import FarmerOrdersClient from '@/components/dashboard/farmer/FarmerOrdersClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getMyOrders } from '@/lib/api/order';
import { IOrder } from '@/types/Order';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'আমার ক্রয়কৃত অর্ডারসমূহ | AgroMart AI',
  description: 'খামারিদের ক্রয়কৃত বীজ, সার ও কৃষি যন্ত্রপাতির ক্যাশ অন ডেলিভারি অর্ডার তালিকা ও ট্র্যাকিং।',
};

export default async function FarmerOrdersPage() {
  const { token } = await getServerAuth();

  let orders: IOrder[] = [];
  if (token) {
    try {
      const fetched = await getMyOrders(token);
      orders = Array.isArray(fetched) ? fetched : [];
    } catch (err) {
      console.warn('Server fetch error in farmer orders:', err);
    }
  }

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/farmer' },
    { label: 'আমার ক্রয়কৃত অর্ডারসমূহ' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header - Rendered on Server */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DashboardHeader
          title="আমার ক্রয়কৃত পণ্যের অর্ডার তালিকা"
          breadcrumb={breadcrumb}
        />
        <Link href="/products">
          <Button className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl cursor-pointer gap-2 text-xs transition shadow-xs">
            <ShoppingBag size={15} /> আরও কৃষি পণ্য কিনুন
          </Button>
        </Link>
      </div>

      {/* Orders Client with Initial Server Data */}
      <FarmerOrdersClient initialOrders={orders} />
    </div>
  );
}