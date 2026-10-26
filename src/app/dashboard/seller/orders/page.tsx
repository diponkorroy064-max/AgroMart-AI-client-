import type { Metadata } from 'next';
import SellerOrdersClient from '@/components/dashboard/seller/SellerOrdersClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getSellerOrders } from '@/lib/api/order';
import { IOrder } from '@/types/Order';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ক্রেতাদের অর্ডার ও শিপমেন্ট | AgroMart AI',
  description: 'কৃষক ও গ্রাহকদের কাছ থেকে প্রাপ্ত অর্ডার ব্যবস্থাপনা, শিপমেন্ট ট্র্যাকিং ও ডেলিভারি স্ট্যাটাস।',
};

export default async function SellerOrdersPage() {
  const { token } = await getServerAuth();

  let orders: IOrder[] = [];

  if (token) {
    try {
      const fetched = await getSellerOrders(token).catch((err) => {
        console.warn('Server fetch seller orders error:', err);
        return [];
      });
      orders = Array.isArray(fetched) ? fetched : [];
    } catch (err) {
      console.warn('Server-side fetch error in seller orders:', err);
    }
  }

  return <SellerOrdersClient initialOrders={orders} />;
}
