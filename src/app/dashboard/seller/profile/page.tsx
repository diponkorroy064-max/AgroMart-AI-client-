import React from 'react';
import type { Metadata } from 'next';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SellerProfileClient from '@/components/dashboard/seller/SellerProfileClient';
import { getServerAuth } from '@/lib/auth/serverAuth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'বিক্রেতা প্রোফাইল ও ট্রেড লাইসেন্স | AgroMart AI',
  description: 'বিক্রেতার ব্যবসার প্রোফাইল, গুদামের অবস্থান ও সরকারি ট্রেড লাইসেন্স ভেরিফিকেশন সনদ।',
};

export default async function SellerProfilePage() {
  const { user } = await getServerAuth();

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/seller' },
    { label: 'দোকান ও প্রোফাইল' },
  ];

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="বিক্রেতা প্রোফাইল ও ট্রেড লাইসেন্স"
        breadcrumb={breadcrumb}
      />

      <SellerProfileClient initialUser={user} />
    </div>
  );
}
