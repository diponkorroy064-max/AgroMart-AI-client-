"use client";

import React from "react";
import withAuth from "@/hooks/withAuth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/Button";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Leaf,
  Package,
  ShoppingCart,
  DollarSign,
  Edit,
  ShieldCheck,
} from "lucide-react";

const FarmerProfilePage = () => {
  const breadcrumb = [
    { label: "Dashboard", href: "/dashboard/farmer" },
    { label: "Profile" },
  ];

  return (
    <div className="space-y-8">
      <DashboardHeader title="My Profile" breadcrumb={breadcrumb} />

      {/* Cover */}
      <div className="rounded-2xl overflow-hidden shadow bg-white">
        <div className="h-40 bg-gradient-to-r from-green-700 to-green-500"></div>

        <div className="px-8 pb-8">
          <div className="-mt-16 flex flex-col md:flex-row md:items-end md:justify-between">

            <div className="flex items-end gap-5">
              <img
                src="https://i.pravatar.cc/200"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />

              <div className="pb-3">
                <h2 className="text-3xl font-bold">
                  John Doe
                </h2>

                <p className="text-green-700 font-medium">
                  Farmer
                </p>

                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <ShieldCheck size={18} className="text-green-600" />
                  Verified Seller
                </div>
              </div>
            </div>

            <Button className="mt-6 md:mt-0">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <DashboardCard title="Products">
          <div className="flex items-center gap-4">
            <Package className="text-green-600" size={36} />
            <div>
              <h3 className="text-3xl font-bold">25</h3>
              <p className="text-gray-500">Products Listed</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Orders">
          <div className="flex items-center gap-4">
            <ShoppingCart className="text-blue-600" size={36} />
            <div>
              <h3 className="text-3xl font-bold">120</h3>
              <p className="text-gray-500">Completed Orders</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Revenue">
          <div className="flex items-center gap-4">
            <DollarSign className="text-yellow-600" size={36} />
            <div>
              <h3 className="text-3xl font-bold">$4,580</h3>
              <p className="text-gray-500">Total Earnings</p>
            </div>
          </div>
        </DashboardCard>

      </div>

      {/* Information */}

      <div className="grid lg:grid-cols-2 gap-6">

        <DashboardCard title="Personal Information">

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <User className="text-green-600" />
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="font-semibold">John Doe</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-green-600" />
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-semibold">
                  johndoe@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-green-600" />
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-semibold">
                  +880 1712-345678
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-green-600" />
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <p className="font-semibold">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-green-600" />
              <div>
                <p className="text-gray-500 text-sm">Joined</p>
                <p className="font-semibold">
                  July 2026
                </p>
              </div>
            </div>

          </div>

        </DashboardCard>

        <DashboardCard title="Farm Information">

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <Leaf className="text-green-600" />
              <div>
                <p className="text-gray-500 text-sm">Farm Name</p>
                <p className="font-semibold">
                  Green Valley Farm
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-2">
                About Farm
              </p>

              <p className="text-gray-700 leading-7">
                We produce fresh organic vegetables,
                fruits, grains, and natural honey using
                eco-friendly farming practices.
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-2">
                Specialties
              </p>

              <div className="flex flex-wrap gap-2">

                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Organic Vegetables
                </span>

                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Fruits
                </span>

                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Honey
                </span>

              </div>
            </div>

          </div>

        </DashboardCard>

      </div>

      {/* Account */}

      <DashboardCard title="Account Status">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="rounded-xl bg-green-50 p-5 text-center">
            <h3 className="text-3xl font-bold text-green-700">
              Active
            </h3>
            <p className="text-gray-500 mt-2">
              Account Status
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-5 text-center">
            <h3 className="text-3xl font-bold text-blue-700">
              Verified
            </h3>
            <p className="text-gray-500 mt-2">
              Seller Verification
            </p>
          </div>

          <div className="rounded-xl bg-yellow-50 p-5 text-center">
            <h3 className="text-3xl font-bold text-yellow-700">
              ★ 4.9
            </h3>
            <p className="text-gray-500 mt-2">
              Customer Rating
            </p>
          </div>

        </div>

      </DashboardCard>

    </div>
  );
};

export default withAuth(FarmerProfilePage, ["farmer"]);
