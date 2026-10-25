'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardIndexPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user?.role) {
        router.replace(`/dashboard/${user.role}`);
      } else {
        router.replace('/dashboard/farmer');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      <div className="w-9 h-9 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs font-semibold text-gray-500">ড্যাশবোর্ডে প্রবেশ করা হচ্ছে...</p>
    </div>
  );
}
