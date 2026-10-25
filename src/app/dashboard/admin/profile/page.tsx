'use client';

import React, { useState } from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import ProfileEditModal, { getFileUrl } from '@/components/dashboard/ProfileEditModal';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Edit,
  Key,
  Shield,
  CheckCircle2,
  Lock,
  Layers,
  Activity,
  Award,
} from 'lucide-react';
import { getRoleNameInBangla } from '@/constants/navigation';

// Bengali date formatter
const formatBengaliDate = (dateInput?: string | Date) => {
  if (!dateInput) return 'তারিখ অনুপলব্ধ';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return String(dateInput);
  }
};

function AdminProfilePage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/admin' },
    { label: 'প্রোফাইল' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <DashboardHeader title="অ্যাডমিন প্রোফাইল ও নিরাপত্তা" breadcrumb={breadcrumb} />
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            আপনার অ্যাডমিনিস্ট্রেটর অ্যাকাউন্ট তথ্য, প্রশাসনিক অধিকার ও নিরাপত্তা সেটিংস।
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs px-4 py-2 text-xs sm:text-sm font-semibold cursor-pointer self-start sm:self-auto transition"
        >
          <Edit size={15} />
          <span>প্রোফাইল সম্পাদনা</span>
        </Button>
      </div>

      {/* 2. Profile Overview Banner Card */}
      <div className="rounded-2xl overflow-hidden shadow-xs bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80">
        <div className="h-32 sm:h-36 bg-linear-to-r from-emerald-800 via-teal-700 to-emerald-600" />

        <div className="px-6 sm:px-8 pb-6">
          <div className="-mt-14 sm:-mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4 sm:gap-5">
              {/* Avatar */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white dark:border-gray-800 bg-linear-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-3xl sm:text-4xl shadow-md shrink-0 overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={getFileUrl(user.avatar)}
                    alt={user.name || 'Admin'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.name ? user.name.charAt(0).toUpperCase() : 'A'}</span>
                )}
              </div>

              {/* Title & Badge */}
              <div className="pb-1 sm:pb-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                  {user?.name || 'প্রধান অ্যাডমিনিস্ট্রেটর'}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    <Shield size={12} />
                    {getRoleNameInBangla(user?.role)} (System Administrator)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <ShieldCheck size={12} />
                    যাচাইকৃত পূর্ণ নিয়ন্ত্রণাধিকার
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 cursor-pointer self-start sm:self-auto pb-1"
            >
              <Key size={14} />
              <span>পাসওয়ার্ড বা তথ্য পরিবর্তন</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Details Grid: Personal Info & Administrative Privileges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <DashboardCard title="অ্যাকাউন্ট ও ব্যক্তিগত তথ্য">
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <User size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">পূর্ণ নাম</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                  {user?.name || 'অ্যাডমিন'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">ইমেইল ঠিকানা</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                  {user?.email || 'ইমেইল অনুপলব্ধ'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">মোবাইল নম্বর</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                  {user?.phone || 'যোগ করা হয়নি'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">ঠিকানা / কার্যালয়</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                  {user?.address || 'ঢাকা, বাংলাদেশ'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-gray-100 dark:border-gray-700/60 pt-3">
              <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-700/60 text-gray-600 dark:text-gray-400 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">অ্যাকাউন্ট তৈরির তারিখ</p>
                <p className="font-semibold text-gray-700 dark:text-gray-300 text-xs">
                  {formatBengaliDate(user?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Administrative Privileges & System Security */}
        <DashboardCard title="প্রশাসনিক অধিকার ও নিরাপত্তা (System Privileges)">
          <div className="space-y-4 pt-1">
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-500 dark:text-gray-400">অ্যাক্সেস লেভেল</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">সুপার অ্যাডমিন (Super Admin)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-500 dark:text-gray-400">নিরাপত্তা এনক্রিপশন</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">JWT + Bcrypt (Active)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-500 dark:text-gray-400">সিস্টেম স্ট্যাটাস</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  অনলাইন ও সক্রিয়
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-2.5">
                সক্রিয় প্রশাসনিক সুবিধাসমূহ:
              </p>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>প্ল্যাটফর্মের সকল ব্যবহারকারী (কৃষক ও বিক্রেতা) অ্যাকাউন্ট নিরীক্ষা ও নিয়ন্ত্রণ।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>নতুন কৃষি পণ্যের মান যাচাই, অনুমোদন ও বাতিলকরণ অধিকার।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>সারাদেশের গ্রাহক অর্ডার ট্র্যাকিং ও সার্বিক আর্থিক লেনদেনের লাইভ অ্যানালিটিক্স।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>প্ল্যাটফর্মের কোর সেটিংস ও সিকিউরিটি কনফিগারেশন ব্যবস্থাপনা।</span>
                </li>
              </ul>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* 4. Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default withAuth(AdminProfilePage, ['admin']);
