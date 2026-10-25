'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import withAuth from '@/hooks/withAuth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
  Users,
  Search,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldAlert,
  Store,
  Sprout,
  Shield,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  X,
  UserCheck,
  Loader2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import {
  getAdminUsers,
  updateUserRoleByAdmin,
  deleteUserByAdmin,
} from '@/lib/api/admin';

interface IUserItem {
  _id: string;
  name: string;
  email: string;
  role: 'farmer' | 'seller' | 'admin';
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt?: string | Date;
}

// Bengali date formatter
const formatBengaliDate = (dateInput?: string | Date) => {
  if (!dateInput) return 'তারিখ অনুপলব্ধ';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(dateInput);
  }
};

// Bengali number formatter
const formatBengaliNumber = (num: number) => {
  return Number(num || 0).toLocaleString('bn-BD');
};

function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const breadcrumb = [
    { label: 'ড্যাশবোর্ড', href: '/dashboard/admin' },
    { label: 'ব্যবহারকারী পরিচালনা' },
  ];

  const [users, setUsers] = useState<IUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<'all' | 'farmer' | 'seller' | 'admin'>('all');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // In-progress role updating user ID
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // Delete modal state
  const [userToDelete, setUserToDelete] = useState<IUserItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAdminUsers();
      const userList = Array.isArray(res) ? res : res.users || [];
      setUsers(userList);
    } catch (err: any) {
      console.error('Failed to load users:', err);
      showNotification('error', err?.message || 'ব্যবহারকারী তালিকা লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Handle Role Change
  const handleRoleChange = async (targetUser: IUserItem, newRole: 'farmer' | 'seller' | 'admin') => {
    if (targetUser.role === newRole) return;

    try {
      setUpdatingUserId(targetUser._id);
      await updateUserRoleByAdmin(targetUser._id, newRole);

      // Optimistic update
      setUsers((prev) =>
        prev.map((u) => (u._id === targetUser._id ? { ...u, role: newRole } : u))
      );

      const roleLabels: Record<string, string> = {
        farmer: 'কৃষক',
        seller: 'বিক্রেতা',
        admin: 'অ্যাডমিন',
      };

      showNotification(
        'success',
        `'${targetUser.name}'-এর ভূমিকা পরিবর্তন করে '${roleLabels[newRole] || newRole}' করা হয়েছে`
      );
    } catch (err: any) {
      console.error('Failed to update role:', err);
      showNotification('error', err?.message || 'ভূমিকা পরিবর্তন করতে সমস্যা হয়েছে');
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Handle Delete Confirmation
  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setIsDeleting(true);
      await deleteUserByAdmin(userToDelete._id);

      // Remove from state optimistically
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
      showNotification('success', `'${userToDelete.name}' অ্যাকাউন্ট সফলভাবে অপসারণ করা হয়েছে`);
      setUserToDelete(null);
    } catch (err: any) {
      console.error('Failed to delete user:', err);
      showNotification('error', err?.message || 'ব্যবহারকারী মুছতে সমস্যা হয়েছে');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered users by role & search
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = activeRole === 'all' || u.role === activeRole;
      const q = search.trim().toLowerCase();
      if (!q) return matchesRole;
      const matchesSearch =
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q) ||
        u.address?.toLowerCase().includes(q);
      return matchesRole && matchesSearch;
    });
  }, [users, activeRole, search]);

  // Counts by role
  const counts = useMemo(() => {
    return {
      all: users.length,
      farmer: users.filter((u) => u.role === 'farmer').length,
      seller: users.filter((u) => u.role === 'seller').length,
      admin: users.filter((u) => u.role === 'admin').length,
    };
  }, [users]);

  const renderRoleBadge = (role: string) => {
    switch (role) {
      case 'farmer':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Sprout size={12} /> কৃষক
          </span>
        );
      case 'seller':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Store size={12} /> বিক্রেতা
          </span>
        );
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Shield size={12} /> অ্যাডমিন
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">
            {role}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <DashboardHeader title="ব্যবহারকারী পরিচালনা (Users Management)" breadcrumb={breadcrumb} />
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            প্ল্যাটফর্মের নিবন্ধিত কৃষক, বিক্রেতা ও অ্যাডমিনদের ভূমিকা পরিবর্তন ও অ্যাকাউন্ট নিয়ন্ত্রণ।
          </p>
        </div>

        <Button
          onClick={loadUsers}
          variant="secondary"
          disabled={loading}
          className="flex items-center gap-2 text-xs sm:text-sm px-3.5 py-2 cursor-pointer self-start sm:self-auto shadow-2xs"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-emerald-600' : ''} />
          <span>রিফ্রেশ</span>
        </Button>
      </div>

      {/* 2. Notification Toast */}
      {notification && (
        <div
          className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-medium transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <ShieldAlert size={18} className="text-rose-600 dark:text-rose-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 3. Role Filters & Live Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Role tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveRole('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeRole === 'all'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            সকল ({formatBengaliNumber(counts.all)})
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('farmer')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeRole === 'farmer'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            কৃষক ({formatBengaliNumber(counts.farmer)})
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('seller')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeRole === 'seller'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            বিক্রেতা ({formatBengaliNumber(counts.seller)})
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('admin')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeRole === 'admin'
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            অ্যাডমিন ({formatBengaliNumber(counts.admin)})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="নাম, ইমেইল বা ফোন দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* 4. Users Table with Role Switcher & Delete Action */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            <RefreshCw size={24} className="animate-spin mx-auto text-emerald-500 mb-2" />
            <p>ব্যবহারকারী তথ্য লোড হচ্ছে...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400 space-y-2">
            <Users size={28} className="mx-auto text-gray-300" />
            <p className="font-semibold text-gray-700 dark:text-gray-300">কোনো ব্যবহারকারী পাওয়া যায়নি</p>
            <p className="text-gray-400">ফিল্টার বা সার্চ কিওয়ার্ড পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50/80 dark:bg-gray-900/40 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-5 py-3.5">ব্যবহারকারী</th>
                  <th className="px-5 py-3.5">বর্তমান ভূমিকা</th>
                  <th className="px-5 py-3.5">ভূমিকা পরিবর্তন (Change Role)</th>
                  <th className="px-5 py-3.5">যোগাযোগ</th>
                  <th className="px-5 py-3.5">ঠিকানা</th>
                  <th className="px-5 py-3.5 text-center">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {filteredUsers.map((u) => {
                  const initial = u.name ? u.name.charAt(0).toUpperCase() : 'U';
                  const isSelf =
                    currentUser?._id === u._id ||
                    currentUser?.email?.toLowerCase() === u.email?.toLowerCase();
                  const isUpdating = updatingUserId === u._id;

                  return (
                    <tr
                      key={String(u._id)}
                      className="hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      {/* Name & Avatar */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-xs text-gray-900 dark:text-white truncate">
                                {u.name}
                              </p>
                              {isSelf && (
                                <span className="text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded">
                                  আপনি
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-400 truncate">
                              আইডি: #{String(u._id).slice(-6).toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Current Role Badge */}
                      <td className="px-5 py-3.5">
                        {renderRoleBadge(u.role)}
                      </td>

                      {/* Role Change Dropdown / Selector */}
                      <td className="px-5 py-3.5">
                        {isSelf ? (
                          <span className="text-xs text-gray-400 italic">
                            নিজস্ব ভূমিকা অপরিবর্তনযোগ্য
                          </span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <select
                              disabled={isUpdating}
                              value={u.role}
                              onChange={(e) =>
                                handleRoleChange(
                                  u,
                                  e.target.value as 'farmer' | 'seller' | 'admin'
                                )
                              }
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
                            >
                              <option value="farmer">কৃষক (Farmer)</option>
                              <option value="seller">বিক্রেতা (Seller)</option>
                              <option value="admin">অ্যাডমিন (Admin)</option>
                            </select>

                            {isUpdating && (
                              <Loader2 size={14} className="animate-spin text-emerald-600 shrink-0" />
                            )}
                          </div>
                        )}
                      </td>

                      {/* Contact Info */}
                      <td className="px-5 py-3.5 text-xs">
                        <div className="space-y-0.5">
                          <p className="text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                            <Mail size={12} className="text-gray-400 shrink-0" />
                            <span className="truncate">{u.email}</span>
                          </p>
                          {u.phone && (
                            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                              <Phone size={12} className="text-gray-400 shrink-0" />
                              <span>{u.phone}</span>
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Address */}
                      <td className="px-5 py-3.5 text-xs text-gray-600 dark:text-gray-400">
                        {u.address ? (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-gray-400 shrink-0" />
                            <span>{u.address}</span>
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">অনুল্লেখিত</span>
                        )}
                      </td>

                      {/* Actions: Delete User Button */}
                      <td className="px-5 py-3.5 text-center">
                        {isSelf ? (
                          <span className="text-[11px] text-gray-400 italic">সুরক্ষিত</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setUserToDelete(u)}
                            title="ব্যবহারকারী মুছে ফেলুন"
                            className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white rounded-lg transition cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    ব্যবহারকারী অপসারণ নিশ্চিতকরণ
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    অ্যাকাউন্ট স্থায়ীভাবে মুছে ফেলার পূর্ব সতর্কতা
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">নাম:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{userToDelete.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">ইমেইল:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{userToDelete.email}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">ভূমিকা:</span>
                  <span>{renderRoleBadge(userToDelete.role)}</span>
                </div>
              </div>

              <p className="text-xs text-rose-600 dark:text-rose-400 leading-relaxed font-medium bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-800">
                ⚠️ সতর্কবার্তা: এই অ্যাকাউন্টটি মুছে ফেললে ব্যবহারকারীর সকল তথ্য ও আপলোড করা পণ্য স্থায়ীভাবে প্ল্যাটফর্ম থেকে অপসারিত হবে। এই প্রক্রিয়াটি আর পূর্বাবস্থায় ফিরিয়ে আনা সম্ভব নয়।
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-2.5">
              <Button
                variant="secondary"
                disabled={isDeleting}
                onClick={() => setUserToDelete(null)}
                className="text-xs px-4 py-2 cursor-pointer"
              >
                বাতিল
              </Button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDeleteUser}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>মুছে ফেলা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    <span>স্থায়ীভাবে মুছে ফেলুন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(AdminUsersPage, ['admin']);
