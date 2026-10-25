"use client";

import React, { useState } from "react";
import withAuth from "@/hooks/withAuth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import ProfileEditModal, { getFileUrl } from "@/components/dashboard/ProfileEditModal";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Leaf,
  Edit,
  ShieldCheck,
  FileText,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { getRoleNameInBangla } from "@/constants/navigation";

const FarmerProfilePage = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumb = [
    { label: "ড্যাশবোর্ড", href: "/dashboard/farmer" },
    { label: "খামারি প্রোফাইল" },
  ];

  return (
    <div className="space-y-8">
      <DashboardHeader title="আমার প্রোফাইল ও ডকুমেন্টস" breadcrumb={breadcrumb} />

      {/* Cover and Profile Banner */}
      <div className="rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="h-40 bg-linear-to-r from-emerald-700 via-green-600 to-teal-700"></div>

        <div className="px-6 sm:px-8 pb-8">
          <div className="-mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-end gap-5">
              {/* Profile Picture */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-gray-800 bg-linear-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center font-black text-4xl shadow-md shrink-0 overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={getFileUrl(user.avatar)}
                    alt={user.name || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                )}
              </div>

              <div className="pb-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {user?.name || "সম্মানিত খামারি"}
                </h2>

                <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                  {getRoleNameInBangla(user?.role)}
                </p>

                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>যাচাইকৃত স্মার্ট খামারি</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs gap-2 px-5 py-2.5 font-semibold cursor-pointer"
            >
              <Edit className="h-4 w-4" />
              <span>প্রোফাইল ও ছবি/PDF সম্পাদনা</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Personal, Farm and Verification Documents */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <DashboardCard title="ব্যক্তিগত তথ্য">
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <User size={18} />
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold">পূর্ণ নাম</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{user?.name || "দেওয়া হয়নি"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold">ইমেইল ঠিকানা</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{user?.email || "দেওয়া হয়নি"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold">মোবাইল নম্বর</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{user?.phone || "+৮৮০ ১৭১২-৩৪৫৬৭৮"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold">ঠিকানা ও এলাকা</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{user?.address || "ঢাকা, বাংলাদেশ"}</p>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Verification Document PDF Card */}
        <DashboardCard title="যাচাইকরণ ডকুমেন্ট ও সনদ (PDF)">
          <div className="space-y-4 pt-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              আপনার খামার, এনআইডি (NID) বা সরকারি কৃষি প্রত্যয়নপত্রের স্ক্যান কপি PDF ফরম্যাটে যুক্ত রাখুন।
            </p>

            {user?.documentPdf ? (
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 dark:bg-red-950/80 dark:text-red-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    PDF
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {user.documentName || "সংযুক্ত ডকুমেন্ট সনদ"}
                    </p>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck size={12} /> যাচাইয়ের জন্য সংরক্ষিত
                    </span>
                  </div>
                </div>

                <a
                  href={getFileUrl(user.documentPdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
                >
                  <span>PDF দেখুন</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-center space-y-2 bg-gray-50/50 dark:bg-gray-800/40">
                <FileText className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  কোনো ভেরিফিকেশন PDF ডকুমেন্ট এখনো আপলোড করা হয়নি
                </p>
                <Button
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-xl"
                >
                  এখনই PDF আপলোড করুন
                </Button>
              </div>
            )}

            {/* Farm Bio */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
              <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold mb-1">খামারের পরিচিতি ও বায়ো</p>
              <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                {user?.bio || "আমরা পরিবেশবান্ধব ও টেকসই পদ্ধতিতে উন্নত জাতের ধান, গম এবং শাকসবজি উৎপাদন করি।"}
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Profile Edit Modal with Picture & PDF Upload */}
      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default withAuth(FarmerProfilePage, ["farmer"]);
