import type { Metadata } from 'next';
import AdminUsersClient from '@/components/dashboard/admin/AdminUsersClient';
import { getServerAuth } from '@/lib/auth/serverAuth';
import { getAdminUsers } from '@/lib/api/admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ব্যবহারকারী পরিচালনা ও নিয়ন্ত্রণ | AgroMart AI',
  description: 'প্ল্যাটফর্মের কৃষক, বিক্রেতা ও অ্যাডমিনদের তালিকা, ভূমিকা পরিবর্তন ও নিরাপত্তা পর্যবেক্ষণ।',
};

export default async function AdminUsersPage() {
  const { token } = await getServerAuth();

  let users: any[] = [];

  if (token) {
    try {
      const res = await getAdminUsers(token).catch((err) => {
        console.warn('Server fetch admin users error:', err);
        return [];
      });
      users = Array.isArray(res) ? res : res?.users || [];
    } catch (err) {
      console.warn('Server-side fetch error in admin users:', err);
    }
  }

  return <AdminUsersClient initialUsers={users} />;
}
