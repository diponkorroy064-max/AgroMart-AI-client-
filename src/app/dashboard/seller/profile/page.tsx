'use client';

import React from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/Button';

import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Store,
  Star,
  Package,
  ShoppingCart,
  DollarSign,
  Edit,
} from 'lucide-react';

const SellerProfilePage = () => {
  const breadcrumb = [
    {
      label: 'Dashboard',
      href: '/dashboard/seller',
    },
    {
      label: 'Profile',
    },
  ];

  return (
    <div className="space-y-8">

      <DashboardHeader
        title="Seller Profile"
        breadcrumb={breadcrumb}
      />

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left Side */}

        <DashboardCard title="Profile">

          <div className="flex flex-col items-center text-center">

            <img
              src="https://i.pravatar.cc/300"
              alt="Seller"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
            />

            <h2 className="text-2xl font-bold mt-5">
              Jane Doe
            </h2>

            <p className="text-green-600 font-medium">
              Verified Seller
            </p>

            <div className="flex items-center gap-1 mt-3">

              <Star
                className="text-yellow-500 fill-yellow-500"
                size={18}
              />

              <span className="font-semibold">
                4.9
              </span>

              <span className="text-gray-500">
                (250 Reviews)
              </span>

            </div>

            <Button className="mt-6 w-full">

              <Edit className="mr-2 h-4 w-4" />

              Edit Profile

            </Button>

          </div>

        </DashboardCard>

        {/* Right Side */}

        <div className="lg:col-span-2 space-y-6">

          <DashboardCard title="Personal Information">

            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex items-center gap-3">

                <User className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <p className="font-semibold">
                    Jane Doe
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Mail className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold">
                    janedoe@example.com
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Phone className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <p className="font-semibold">
                    +880 1712345678
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Store className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Shop Name
                  </p>

                  <p className="font-semibold">
                    Green Agro Shop
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <MapPin className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Address
                  </p>

                  <p className="font-semibold">
                    Dhaka, Bangladesh
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Calendar className="text-green-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Joined
                  </p>

                  <p className="font-semibold">
                    January 2026
                  </p>

                </div>

              </div>

            </div>

          </DashboardCard>

          <DashboardCard title="Business Statistics">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div className="bg-green-50 rounded-xl p-6 text-center">

                <Package
                  className="mx-auto text-green-600 mb-3"
                  size={34}
                />

                <h3 className="text-3xl font-bold">
                  50
                </h3>

                <p className="text-gray-500">
                  Products
                </p>

              </div>

              <div className="bg-blue-50 rounded-xl p-6 text-center">

                <ShoppingCart
                  className="mx-auto text-blue-600 mb-3"
                  size={34}
                />

                <h3 className="text-3xl font-bold">
                  250
                </h3>

                <p className="text-gray-500">
                  Orders
                </p>

              </div>

              <div className="bg-yellow-50 rounded-xl p-6 text-center">

                <DollarSign
                  className="mx-auto text-yellow-500 mb-3"
                  size={34}
                />

                <h3 className="text-3xl font-bold">
                  $12,500
                </h3>

                <p className="text-gray-500">
                  Revenue
                </p>

              </div>

            </div>

          </DashboardCard>

        </div>

      </div>

    </div>
  );
};

export default withAuth(SellerProfilePage, ['seller']);
