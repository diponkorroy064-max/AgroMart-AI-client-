import React from 'react';
import type { Metadata } from 'next';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FarmerProfileClient from '@/components/dashboard/farmer/FarmerProfileClient';
import { getServerAuth } from '@/lib/auth/serverAuth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'খামারি প্রোফাইল ও ডকুমেন্টস | AgroMart AI',
  description: 'খামারি প্রোফাইল, খামার সংক্রান্ত তথ্য ও সরকারি প্রত্যয়নপত্র বা এনআইডি সনদ ব্যবস্থাপনা।',
};

export default async function FarmerProfilePage() {
  const { user } = await getServerAuth();

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/farmer' },
    { label: 'খামারি প্রোফাইল' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header - Rendered on Server */}
      <DashboardHeader title="আমার প্রোফাইল ও ডকুমেন্টস" breadcrumb={breadcrumb} />

      {/* Profile Client Component with Pre-rendered Server Data */}
      <FarmerProfileClient initialUser={user} />
    </div>
  );
}
