'use client';

import React from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import { Users } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

const AdminUsersPage = () => {
  const breadcrumb = [
    { label: 'Dashboard', href: '/dashboard/admin' },
    { label: 'Users' },
  ];

  return (
    <div>
      <DashboardHeader title="Manage Users" breadcrumb={breadcrumb} />
      <DashboardCard title="User List">
        <EmptyState
          icon={<Users className="w-12 h-12 text-gray-400" />}
          title="No Users Found"
          description="There are no users to display."
        />
      </DashboardCard>
    </div>
  );
};

export default withAuth(AdminUsersPage, ['admin']);
