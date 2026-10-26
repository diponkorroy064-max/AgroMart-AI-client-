import React from 'react';
import type { Metadata } from 'next';
import AdminProfileClient from '@/components/dashboard/admin/AdminProfileClient';
import { getServerAuth } from '@/lib/auth/serverAuth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'অ্যাডমিন প্রোফাইল ও নিরাপত্তা | AgroMart AI',
  description: 'অ্যাডমিনিস্ট্রেটর অ্যাকাউন্ট তথ্য, প্রশাসনিক অধিকার, নিরাপত্তা ও ক্রেডেনশিয়াল ব্যবস্থাপনা।',
};

export default async function AdminProfilePage() {
  const { user } = await getServerAuth();

  return <AdminProfileClient initialUser={user} />;
}
