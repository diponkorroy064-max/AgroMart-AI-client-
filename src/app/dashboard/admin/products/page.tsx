'use client';

import React from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import { Package } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

const AdminProductsPage = () => {
  const breadcrumb = [
    { label: 'Dashboard', href: '/dashboard/admin' },
    { label: 'Products' },
  ];

  return (
    <div>
      <DashboardHeader title="Manage Products" breadcrumb={breadcrumb} />
      <DashboardCard title="Product List">
        <EmptyState
          icon={<Package className="w-12 h-12 text-gray-400" />}
          title="No Products Found"
          description="There are no products to display."
        />
      </DashboardCard>
    </div>
  );
};

export default withAuth(AdminProductsPage, ['admin']);
