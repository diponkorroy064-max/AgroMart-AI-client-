'use client';

import React, { useState } from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import ProfileEditModal, { getFileUrl } from '@/components/dashboard/ProfileEditModal';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  ShieldCheck,
  FileText,
  ExternalLink,
  Store,
  Building2,
  Calendar,
} from 'lucide-react';
import { getRoleNameInBangla } from '@/constants/navigation';
import { IUser } from '@/types/auth';

interface SellerProfileClientProps {
  initialUser: IUser | null;
}

export default function SellerProfileClient({ initialUser }: SellerProfileClientProps) {
  const { user: authUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // AuthContext takes precedence when updated in client, fallback to initial server user
  const user = authUser || initialUser;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Cover and Profile Banner */}
      <div className="rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        {/* Cover and Profile Banner (Half of the section) */}
        <div className="h-28 sm:h-32 bg-linear-to-r from-emerald-800 via-teal-800 to-emerald-950 relative overflow-hidden">
          {/* Subtle decorative glow & accents */}
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-36 h-36 bg-teal-300/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-3 right-4 sm:top-4 sm:right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium">
            <Store size={14} className="text-emerald-300" />
            <span>অ্যাগ্রোমার্ট বিক্রেতা স্টোর</span>
          </div>
        </div>

        {/* Profile Info (Bottom half of the section) */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-7">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Profile Picture / Shop Avatar (Centered on the dividing line) */}
              <div className="-mt-14 sm:-mt-16 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-white dark:border-gray-800 bg-linear-to-tr from-emerald-700 to-teal-600 text-white flex items-center justify-center font-black text-4xl shadow-xl shrink-0 overflow-hidden bg-white">
                {user?.avatar ? (
                  <img
                    src={getFileUrl(user.avatar)}
                    alt={user.name || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.name ? user.name.charAt(0).toUpperCase() : 'S'}</span>
                )}
              </div>

              {/* Text Information - Fully in the white section */}
              <div className="pt-1 sm:pt-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>{user?.name || 'সম্মানিত বিক্রেতা'}</span>
                  <span className="inline-block p-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Store size={18} />
                  </span>
                </h2>

                <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-sm mt-0.5">
                  {getRoleNameInBangla(user?.role)} • অনুমোদিত বিক্রেতা
                </p>

                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>যাচাইকৃত কৃষি উপকরণ পরিবেশক ও সরবরাহকারী</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 md:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs gap-2 px-5 py-2.5 font-semibold cursor-pointer self-start md:self-center"
            >
              <Edit className="h-4 w-4" />
              <span>দোকান ও প্রোফাইল সম্পাদনা</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Personal, Store and Verification Documents */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal & Shop Information */}
        <DashboardCard title="ব্যবসায়িক ও যোগাযোগের তথ্য">
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <User size={18} />
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold">মালিক বা প্রতিনিধির নাম</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {user?.name || 'দেওয়া হয়নি'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold">অফিসিয়াল ইমেইল</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {user?.email || 'দেওয়া হয়নি'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold">যোগাযোগের মোবাইল নম্বর</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {user?.phone || '+৮৮০ ১৭১২-৩৪৫৬৭৮'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold">দোকান ও প্রধান গোডাউনের ঠিকানা</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {user?.address || 'ঢাকা, বাংলাদেশ'}
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Verification Document PDF Card (Trade License) */}
        <DashboardCard title="ব্যবসায়িক ট্রেড লাইসেন্স ও সরকারি সনদ (PDF)">
          <div className="space-y-4 pt-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              আইনসম্মতভাবে কৃষি উপকরণ ও বীজ বিক্রয়ের জন্য সরকারি ট্রেড লাইসেন্স বা পরিবেশক সনদের কপি PDF ফরম্যাটে সংরক্ষিত রাখা জরুরি।
            </p>

            {user?.documentPdf ? (
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 dark:bg-red-950/80 dark:text-red-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    PDF
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {user.documentName || 'ট্রেড লাইসেন্স ভেরিফিকেশন সনদ'}
                    </p>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck size={12} /> ভেরিফিকেশন সফল ও সংরক্ষিত
                    </span>
                  </div>
                </div>

                <a
                  href={getFileUrl(user.documentPdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                >
                  <span>PDF দেখুন</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-center space-y-2 bg-gray-50/50 dark:bg-gray-800/40">
                <FileText className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  কোনো ট্রেড লাইসেন্স PDF ডকুমেন্ট এখনো আপলোড করা হয়নি
                </p>
                <Button
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-xl cursor-pointer"
                >
                  ট্রেড লাইসেন্স PDF আপলোড করুন
                </Button>
              </div>
            )}

            {/* Shop Bio */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
              <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold mb-1">দোকান ও ব্যবসা পরিচিতি (Bio)</p>
              <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                {user?.bio || 'উন্নত মানের সার, বালাইনাশক ও আধুনিক কৃষি যন্ত্রপাতি সুলভ মূল্যে দেশের কৃষকদের নিকট সরবরাহ করছি।'}
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
}
