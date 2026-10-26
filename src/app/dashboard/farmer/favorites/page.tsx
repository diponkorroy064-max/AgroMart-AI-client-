import type { Metadata } from 'next';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FarmerFavoritesClient from '@/components/dashboard/farmer/FarmerFavoritesClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getMyFavorites } from '@/lib/api/favorite';
import { IProduct } from '@/types/Product';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'প্রিয় সংরক্ষিত পণ্যসমূহ | AgroMart AI',
  description: 'খামারিদের পছন্দের বীজ, সার ও কৃষি যন্ত্রপাতির সংরক্ষিত তালিকা।',
};

export default async function FarmerFavoritesPage() {
  const { token } = await getServerAuth();

  let favorites: IProduct[] = [];
  if (token) {
    try {
      const fetched = await getMyFavorites(token);
      favorites = Array.isArray(fetched) ? fetched : [];
    } catch (err) {
      console.warn('Server fetch error in farmer favorites:', err);
    }
  }

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/farmer' },
    { label: 'প্রিয় পণ্যসমূহ' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header - Rendered on Server */}
      <DashboardHeader
        title="প্রিয় সংরক্ষিত পণ্যসমূহ"
        breadcrumb={breadcrumb}
      />

      {/* Favorites Client Component with Pre-rendered Server Data */}
      <FarmerFavoritesClient initialFavorites={favorites} />
    </div>
  );
}
