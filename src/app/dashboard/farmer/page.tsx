"use client";

import withAuth from "@/hooks/withAuth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import StatCard from "@/components/dashboard/StatCard";

import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  Star,
  Eye,
  Truck,
} from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const FarmerDashboard = () => {
  const breadcrumb = [
    { label: "Dashboard", href: "/dashboard/farmer" },
    { label: "Farmer" },
  ];

  return (
    <div className="space-y-8">

      <DashboardHeader
        title="Farmer Dashboard"
        breadcrumb={breadcrumb}
      />

      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-green-700 to-green-500 p-8 text-white flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-green-100">
            Manage your farm products, monitor orders,
            and grow your business.
          </p>
        </div>

        <Link href="/dashboard/farmer/products/create">
          <Button className="bg-white text-green-700 hover:bg-green-100">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          icon={<Package className="text-green-600" />}
          label="Products"
          value="25"
        />

        <StatCard
          icon={<ShoppingCart className="text-blue-600" />}
          label="Orders"
          value="120"
        />

        <StatCard
          icon={<DollarSign className="text-yellow-600" />}
          label="Revenue"
          value="$4,580"
        />

        <StatCard
          icon={<TrendingUp className="text-purple-600" />}
          label="Sales Growth"
          value="+18%"
        />

      </div>

      {/* Second Row */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Orders */}

        <DashboardCard title="Recent Orders">

          <div className="space-y-4">

            <div className="flex justify-between items-center border-b pb-3">

              <div>
                <h4 className="font-semibold">
                  Organic Honey
                </h4>

                <p className="text-sm text-gray-500">
                  Order #1001
                </p>

              </div>

              <span className="text-green-600 font-semibold">
                Completed
              </span>

            </div>

            <div className="flex justify-between items-center border-b pb-3">

              <div>
                <h4 className="font-semibold">
                  Fresh Tomatoes
                </h4>

                <p className="text-sm text-gray-500">
                  Order #1002
                </p>

              </div>

              <span className="text-yellow-600 font-semibold">
                Pending
              </span>

            </div>

            <div className="flex justify-between items-center">

              <div>
                <h4 className="font-semibold">
                  Garden Shovel
                </h4>

                <p className="text-sm text-gray-500">
                  Order #1003
                </p>

              </div>

              <span className="text-blue-600 font-semibold">
                Shipping
              </span>

            </div>

          </div>

        </DashboardCard>

        {/* Top Product */}

        <DashboardCard title="Best Selling Product">

          <div className="flex flex-col items-center">

            <img
              src="https://images.unsplash.com/photo-1592928301141-8f07d2f0d4f3"
              className="w-32 h-32 rounded-xl object-cover"
            />

            <h3 className="font-bold mt-4">
              Organic Honey
            </h3>

            <p className="text-gray-500 text-sm">
              Sold 145 times
            </p>

            <div className="flex mt-3 text-yellow-500">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>

          </div>

        </DashboardCard>

        {/* Quick Actions */}

        <DashboardCard title="Quick Actions">

          <div className="space-y-4">

            <Link href="/dashboard/farmer/products">

              <Button className="w-full justify-between">

                Manage Products

                <ArrowRight size={18} />

              </Button>

            </Link>

            <Link href="/dashboard/farmer/orders">

              <Button
                variant="outline"
                className="w-full justify-between"
              >

                View Orders

                <ShoppingCart size={18} />

              </Button>

            </Link>

            <Link href="/dashboard/farmer/profile">

              <Button
                variant="outline"
                className="w-full justify-between"
              >

                Edit Profile

                <Eye size={18} />

              </Button>

            </Link>

            <Link href="/dashboard/farmer/products/create">

              <Button
                variant="outline"
                className="w-full justify-between"
              >

                Add New Product

                <Plus size={18} />

              </Button>

            </Link>

          </div>

        </DashboardCard>

      </div>

      {/* Third Row */}

      <div className="grid lg:grid-cols-2 gap-6">

        <DashboardCard title="Inventory Status">

          <div className="space-y-5">

            <div>

              <div className="flex justify-between mb-2">
                <span>In Stock</span>
                <span>82%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">

                <div className="bg-green-600 h-3 rounded-full w-[82%]" />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">
                <span>Low Stock</span>
                <span>12%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">

                <div className="bg-yellow-500 h-3 rounded-full w-[12%]" />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">
                <span>Out of Stock</span>
                <span>6%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">

                <div className="bg-red-500 h-3 rounded-full w-[6%]" />

              </div>

            </div>

          </div>

        </DashboardCard>

        <DashboardCard title="Business Summary">

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-xl bg-green-50 p-5 text-center">

              <Truck
                className="mx-auto text-green-600"
                size={28}
              />

              <h2 className="text-2xl font-bold mt-3">
                56
              </h2>

              <p className="text-gray-500">
                Delivered
              </p>

            </div>

            <div className="rounded-xl bg-blue-50 p-5 text-center">

              <ShoppingCart
                className="mx-auto text-blue-600"
                size={28}
              />

              <h2 className="text-2xl font-bold mt-3">
                18
              </h2>

              <p className="text-gray-500">
                Pending
              </p>

            </div>

            <div className="rounded-xl bg-yellow-50 p-5 text-center">

              <DollarSign
                className="mx-auto text-yellow-600"
                size={28}
              />

              <h2 className="text-2xl font-bold mt-3">
                $4.5K
              </h2>

              <p className="text-gray-500">
                Revenue
              </p>

            </div>

            <div className="rounded-xl bg-purple-50 p-5 text-center">

              <TrendingUp
                className="mx-auto text-purple-600"
                size={28}
              />

              <h2 className="text-2xl font-bold mt-3">
                +18%
              </h2>

              <p className="text-gray-500">
                Growth
              </p>

            </div>

          </div>

        </DashboardCard>

      </div>

    </div>
  );
};

export default withAuth(FarmerDashboard, ["farmer"]);
