'use client';

import React from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';

import {
  Package,
  ShoppingCart,
  DollarSign,
  User,
  TrendingUp,
  AlertTriangle,
  Plus,
  Eye,
  ArrowRight,
} from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const recentOrders = [
  {
    id: '#ORD-1025',
    customer: 'John Doe',
    total: '$120',
    status: 'Completed',
  },
  {
    id: '#ORD-1024',
    customer: 'Sarah Khan',
    total: '$85',
    status: 'Pending',
  },
  {
    id: '#ORD-1023',
    customer: 'Alex Smith',
    total: '$210',
    status: 'Completed',
  },
];

const lowStockProducts = [
  {
    name: 'Organic Tomato',
    stock: 5,
  },
  {
    name: 'Fresh Mango',
    stock: 8,
  },
  {
    name: 'Rice Seeds',
    stock: 3,
  },
];

const SellerDashboard = () => {
  const breadcrumb = [
    {
      label: 'Dashboard',
      href: '/dashboard/seller',
    },
    {
      label: 'Seller',
    },
  ];

  return (
    <div className="space-y-8">

      <DashboardHeader
        title="Seller Dashboard"
        breadcrumb={breadcrumb}
      />

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          icon={<Package className="text-green-600" />}
          label="Products"
          value="50"
        />

        <StatCard
          icon={<ShoppingCart className="text-blue-600" />}
          label="Orders"
          value="250"
        />

        <StatCard
          icon={<DollarSign className="text-yellow-500" />}
          label="Revenue"
          value="$12,500"
        />

        <StatCard
          icon={<User className="text-purple-600" />}
          label="Customers"
          value="150"
        />

      </div>

      {/* Revenue */}

      <DashboardCard title="Sales Overview">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-4xl font-bold text-green-600">
              $12,500
            </h2>

            <p className="text-gray-500 mt-2">
              Total Revenue This Month
            </p>

          </div>

          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">

            <TrendingUp size={20} />

            +18.6%

          </div>

        </div>

      </DashboardCard>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Orders */}

        <DashboardCard title="Recent Orders">

          <div className="space-y-4">

            {recentOrders.map((order) => (

              <div
                key={order.id}
                className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50"
              >

                <div>

                  <h3 className="font-semibold">
                    {order.id}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {order.customer}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold">
                    {order.total}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${order.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {order.status}
                  </span>

                </div>

              </div>

            ))}

            <Link href="/dashboard/seller/orders">

              <Button variant="outline" className="w-full">

                View All Orders

                <ArrowRight className="ml-2 h-4 w-4" />

              </Button>

            </Link>

          </div>

        </DashboardCard>

        {/* Low Stock */}

        <DashboardCard title="Low Stock Products">

          <div className="space-y-4">

            {lowStockProducts.map((product) => (

              <div
                key={product.name}
                className="flex justify-between items-center border rounded-xl p-4"
              >

                <div className="flex items-center gap-3">

                  <AlertTriangle className="text-red-500" />

                  <span className="font-medium">
                    {product.name}
                  </span>

                </div>

                <span className="text-red-600 font-bold">
                  {product.stock} Left
                </span>

              </div>

            ))}

          </div>

        </DashboardCard>

        {/* Quick Actions */}

        <DashboardCard title="Quick Actions">

          <div className="space-y-4">

            <Link href="/dashboard/seller/products/add">

              <Button className="w-full justify-start">

                <Plus className="mr-2 h-5 w-5" />

                Add New Product

              </Button>

            </Link>

            <Link href="/dashboard/seller/products">

              <Button
                variant="outline"
                className="w-full justify-start"
              >

                <Package className="mr-2 h-5 w-5" />

                Manage Products

              </Button>

            </Link>

            <Link href="/dashboard/seller/orders">

              <Button
                variant="outline"
                className="w-full justify-start"
              >

                <ShoppingCart className="mr-2 h-5 w-5" />

                Manage Orders

              </Button>

            </Link>

            <Link href="/dashboard/seller/profile">

              <Button
                variant="outline"
                className="w-full justify-start"
              >

                <Eye className="mr-2 h-5 w-5" />

                View Profile

              </Button>

            </Link>

          </div>

        </DashboardCard>

      </div>

    </div>
  );
};

export default withAuth(SellerDashboard, ['seller']);
