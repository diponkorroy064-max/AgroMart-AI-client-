'use client';

import React, { useState } from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/Button';

import {
  ShoppingCart,
  Search,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  Package,
} from 'lucide-react';

const orders = [
  {
    id: '#ORD-1001',
    customer: 'John Doe',
    date: '20 Jul 2026',
    total: '$120',
    items: 3,
    status: 'Completed',
  },
  {
    id: '#ORD-1002',
    customer: 'Sarah Khan',
    date: '19 Jul 2026',
    total: '$80',
    items: 2,
    status: 'Pending',
  },
  {
    id: '#ORD-1003',
    customer: 'Alex Smith',
    date: '18 Jul 2026',
    total: '$250',
    items: 5,
    status: 'Shipped',
  },
  {
    id: '#ORD-1004',
    customer: 'Michael Lee',
    date: '18 Jul 2026',
    total: '$95',
    items: 1,
    status: 'Completed',
  },
];

const SellerOrdersPage = () => {
  const breadcrumb = [
    {
      label: 'Dashboard',
      href: '/dashboard/seller',
    },
    {
      label: 'Orders',
    },
  ];

  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      <DashboardHeader
        title="Orders"
        breadcrumb={breadcrumb}
      />

      {/* Summary */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <DashboardCard title="Total Orders">
          <div className="flex items-center justify-between">
            <ShoppingCart className="text-green-600" size={40} />
            <h2 className="text-4xl font-bold">250</h2>
          </div>
        </DashboardCard>

        <DashboardCard title="Pending">
          <div className="flex items-center justify-between">
            <Clock className="text-yellow-500" size={40} />
            <h2 className="text-4xl font-bold">18</h2>
          </div>
        </DashboardCard>

        <DashboardCard title="Completed">
          <div className="flex items-center justify-between">
            <CheckCircle className="text-green-600" size={40} />
            <h2 className="text-4xl font-bold">210</h2>
          </div>
        </DashboardCard>

        <DashboardCard title="Shipped">
          <div className="flex items-center justify-between">
            <Truck className="text-blue-600" size={40} />
            <h2 className="text-4xl font-bold">22</h2>
          </div>
        </DashboardCard>

      </div>

      {/* Orders Table */}

      <DashboardCard title="Order List">

        <div className="mb-6 relative">

          <Search
            className="absolute left-4 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by customer or order ID..."
            className="w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-gray-50">

                <th className="text-left p-4">Order ID</th>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Items</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {order.id}
                  </td>

                  <td className="p-4">
                    {order.customer}
                  </td>

                  <td className="p-4">
                    {order.date}
                  </td>

                  <td className="p-4">
                    {order.items}
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    {order.total}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td className="p-4 text-center">

                    <Button
                      size="sm"
                      variant="outline"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Details
                    </Button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredOrders.length === 0 && (
            <div className="py-16 text-center">

              <Package
                className="mx-auto text-gray-400 mb-4"
                size={50}
              />

              <h3 className="text-2xl font-semibold">
                No Orders Found
              </h3>

              <p className="text-gray-500 mt-2">
                No orders match your search.
              </p>

            </div>
          )}

        </div>

      </DashboardCard>

    </div>
  );
};

export default withAuth(SellerOrdersPage, ['seller']);
