'use client';

import React from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import { ShoppingCart } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

const SellerOrdersPage = () => {
  const breadcrumb = [
    { label: 'Dashboard', href: '/dashboard/seller' },
    { label: 'Orders' },
  ];

  return (
    <div>
      <DashboardHeader title="My Orders" breadcrumb={breadcrumb} />
      <DashboardCard title="Order History">
        <EmptyState
          icon={<ShoppingCart className="w-12 h-12 text-gray-400" />}
          title="No Orders Found"
          description="You don't have any orders yet."
        />
      </DashboardCard>
    </div>
  );
};

export default withAuth(SellerOrdersPage, ['seller']);
