'use client';

import React from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  UserCheck,
  BarChart3,
  Boxes,
  Activity,
  Server,
  Database,
  HardDrive,
  Bot,
  CheckCircle2,
} from 'lucide-react';

const AdminDashboard = () => {
  const breadcrumb = [
    { label: 'Dashboard', href: '/dashboard/admin' },
    { label: 'Admin' },
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage all registered users.',
      icon: Users,
    },
    {
      title: 'Manage Products',
      description: 'Approve or remove marketplace products.',
      icon: Package,
    },
    {
      title: 'Manage Orders',
      description: 'Track customer orders.',
      icon: ShoppingCart,
    },
    {
      title: 'Manage Sellers',
      description: 'Approve and monitor sellers.',
      icon: UserCheck,
    },
    {
      title: 'Analytics',
      description: 'View sales and growth reports.',
      icon: BarChart3,
    },
    {
      title: 'Inventory',
      description: 'Monitor available products.',
      icon: Boxes,
    },
  ];

  const recentActivities = [
    {
      title: 'New seller registered',
      time: '10 min ago',
    },
    {
      title: 'Order #4587 completed',
      time: '30 min ago',
    },
    {
      title: 'New product approved',
      time: '1 hour ago',
    },
    {
      title: 'Farmer account verified',
      time: '3 hours ago',
    },
  ];

  const categoryData = [
    { name: 'Vegetables', value: 75 },
    { name: 'Fruits', value: 62 },
    { name: 'Seeds', value: 55 },
    { name: 'Organic Products', value: 48 },
  ];

  const overviewData = [
    { title: 'Products Approved', value: 85 },
    { title: 'Orders Completed', value: 92 },
    { title: 'User Verification', value: 70 },
  ];

  return (
    <div className="space-y-8">

      <DashboardHeader
        title="Admin Dashboard"
        breadcrumb={breadcrumb}
      />

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 p-8 text-white shadow-xl">

        <h2 className="text-3xl font-bold">
          Welcome back, Admin 👋
        </h2>

        <p className="mt-3 max-w-3xl text-green-100 text-lg">
          Manage users, sellers, products, orders and monitor
          the AgroMart platform from one centralized dashboard.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          icon={<Users className="text-blue-600" />}
          label="Total Users"
          value="1,250"
        />

        <StatCard
          icon={<Package className="text-green-600" />}
          label="Products"
          value="580"
        />

        <StatCard
          icon={<ShoppingCart className="text-orange-500" />}
          label="Orders"
          value="2,145"
        />

        <StatCard
          icon={<DollarSign className="text-emerald-600" />}
          label="Revenue"
          value="$84,520"
        />

      </div>

      {/* Quick Actions */}

      <DashboardCard title="Quick Actions">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {quickActions.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-500 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
                  <Icon className="text-green-600" />
                </div>

                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {item.description}
                </p>

              </button>
            );
          })}

        </div>

      </DashboardCard>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Activities */}

        <DashboardCard title="Recent Activities">

          <div className="space-y-5">

            {recentActivities.map((activity) => (

              <div
                key={activity.title}
                className="flex items-start gap-4 border-b pb-4 last:border-none"
              >
                <div className="mt-1 rounded-full bg-green-100 p-2">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>

                <div>

                  <h4 className="font-semibold">
                    {activity.title}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {activity.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </DashboardCard>

        {/* System Overview */}

        <DashboardCard title="System Overview">

          <div className="space-y-6">

            {overviewData.map((item) => (

              <div key={item.title}>

                <div className="mb-2 flex justify-between text-sm">

                  <span>{item.title}</span>

                  <span className="font-semibold">
                    {item.value}%
                  </span>

                </div>

                <div className="h-3 rounded-full bg-gray-200">

                  <div
                    className="h-3 rounded-full bg-green-600"
                    style={{ width: `${item.value}%` }}
                  />

                </div>

              </div>

            ))}

          </div>

        </DashboardCard>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Platform Health */}

        <DashboardCard title="Platform Health">

          <div className="space-y-5">

            <div className="flex justify-between">

              <div className="flex items-center gap-3">

                <Server className="text-green-600" />

                <span>Server Status</span>

              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Online
              </span>

            </div>

            <div className="flex justify-between">

              <div className="flex items-center gap-3">

                <Database className="text-blue-600" />

                <span>Database</span>

              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                Connected
              </span>

            </div>

            <div className="flex justify-between">

              <div className="flex items-center gap-3">

                <HardDrive className="text-orange-500" />

                <span>Storage</span>

              </div>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                68%
              </span>

            </div>

            <div className="flex justify-between">

              <div className="flex items-center gap-3">

                <Bot className="text-purple-600" />

                <span>AI Services</span>

              </div>

              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                Active
              </span>

            </div>

          </div>

        </DashboardCard>

        {/* Top Categories */}

        <DashboardCard title="Top Selling Categories">

          <div className="space-y-6">

            {categoryData.map((item) => (

              <div key={item.name}>

                <div className="mb-2 flex justify-between">

                  <span>{item.name}</span>

                  <span className="font-semibold">
                    {item.value}%
                  </span>

                </div>

                <div className="h-3 rounded-full bg-gray-200">

                  <div
                    className="h-3 rounded-full bg-emerald-500"
                    style={{ width: `${item.value}%` }}
                  />

                </div>

              </div>

            ))}

          </div>

        </DashboardCard>

      </div>

      {/* Notifications */}

      <DashboardCard title="Recent Admin Notes">

        <div className="space-y-4">

          {[
            'Review pending seller verification requests.',
            'Inventory synchronization completed successfully.',
            'Weekly sales report generated successfully.',
          ].map((note) => (

            <div
              key={note}
              className="flex items-start gap-3 rounded-xl border p-4 hover:bg-green-50"
            >
              <CheckCircle2 className="mt-1 text-green-600" />

              <p>{note}</p>

            </div>

          ))}

        </div>

      </DashboardCard>

    </div>
  );
};

export default withAuth(AdminDashboard, ['admin']);
