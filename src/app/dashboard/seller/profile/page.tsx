'use client';
import { useState } from 'react';
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
  Store,
  Star,
  Edit,
  ShieldCheck,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { getRoleNameInBangla } from '@/constants/navigation';

const SellerProfilePage = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumb = [
    {
      label: 'ড্যাশবোর্ড',
      href: '/dashboard/seller',
    },
    {
      label: 'দোকান ও প্রোফাইল',
    },
  ];

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="বিক্রেতা প্রোফাইল ও ট্রেড লাইসেন্স"
        breadcrumb={breadcrumb}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Side: Avatar Card */}
        <DashboardCard title="প্রোফাইল পরিচিতি">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500 shadow-md bg-emerald-50 dark:bg-gray-700 flex items-center justify-center">
              {user?.avatar ? (
                <img
                  src={getFileUrl(user.avatar)}
                  alt="Seller"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
              {user?.name || 'সম্মানিত বিক্রেতা'}
            </h2>

            <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm mt-0.5">
              {getRoleNameInBangla(user?.role)}
            </p>

            <div className="flex items-center gap-1.5 mt-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>যাচাইকৃত অনুমোদিত বিক্রেতা</span>
            </div>

            <div className="flex items-center gap-1 mt-3">
              <Star className="text-amber-500 fill-amber-500" size={18} />
              <span className="font-bold text-gray-900 dark:text-white">৪.৯</span>
              <span className="text-xs text-gray-400">(২৫০+ সফল বিক্রয়)</span>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 font-semibold cursor-pointer shadow-xs"
            >
              <Edit className="h-4 w-4" />
              <span>প্রোফাইল ও ছবি/PDF সম্পাদনা</span>
            </Button>
          </div>
        </DashboardCard>

        {/* Right Side: Information & Trade License Document */}
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard title="দোকান ও যোগাযোগের তথ্য">
            <div className="grid md:grid-cols-2 gap-5 pt-1">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">মালিকের নাম</p>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{user?.name || 'দেওয়া হয়নি'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">ইমেইল ঠিকানা</p>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{user?.email || 'দেওয়া হয়নি'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">মোবাইল নম্বর</p>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{user?.phone || '+৮৮০ ১৭১২-৩৪৫৬৭৮'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                  <Store size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">দোকান / ব্যবসার নাম</p>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{user?.bio || 'গ্রিন এগ্রো সাপ্লাইয়াস'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:col-span-2">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">দোকান / গুদামের ঠিকানা</p>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{user?.address || 'ঢাকা, বাংলাদেশ'}</p>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Trade License & Verification PDF Document */}
          <DashboardCard title="ট্রেড লাইসেন্স ও ব্যবসার প্রত্যয়নপত্র (PDF)">
            <div className="space-y-3 pt-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                অনুমোদিত ডিলার বা সার/কীটনাশক বিক্রেতা হিসেবে সরকারি ট্রেড লাইসেন্স বা ভ্যাট রেজিস্ট্রেশনের PDF কপি সংযুক্ত রাখুন।
              </p>

              {user?.documentPdf ? (
                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 dark:bg-red-950/80 dark:text-red-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                        {user.documentName || 'ট্রেড লাইসেন্স সনদ (TradeLicense.pdf)'}
                      </p>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck size={12} /> যাচাইকৃত ব্যবসায়িক লাইসেন্স
                      </span>
                    </div>
                  </div>

                  <a
                    href={getFileUrl(user.documentPdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
                  >
                    <span>PDF দেখুন</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-center space-y-2 bg-gray-50/50 dark:bg-gray-800/40">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    ট্রেড লাইসেন্স বা টিন সার্টিফিকেটের PDF আপলোড করা হয়নি
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-xl"
                  >
                    ট্রেড লাইসেন্স PDF যুক্ত করুন
                  </Button>
                </div>
              )}
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default withAuth(SellerProfilePage, ['seller']);
