'use client';
import React from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import { ShoppingCart } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';


const AdminOrdersPage = () => {
  const breadcrumb = [
    { label: 'Dashboard', href: '/dashboard/admin' },
    { label: 'Orders' },
  ];


  return (
    <div>
      <DashboardHeader title="Manage Orders" breadcrumb={breadcrumb} />
      <DashboardCard title="Order List">
        <EmptyState
          icon={<ShoppingCart className="w-12 h-12 text-gray-400" />}
          title="No Orders Found"
          description="There are no orders to display."
        />
      </DashboardCard>
    </div>
  );
};

export default withAuth(AdminOrdersPage, ['admin']);

