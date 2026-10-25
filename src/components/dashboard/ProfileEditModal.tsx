'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile, uploadAuthFile } from '@/lib/api/auth';
import { Button } from '@/components/ui/Button';
import {
  X,
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  User,
  Phone,
  MapPin,
  ExternalLink,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { getRoleNameInBangla } from '@/constants/navigation';

export interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const getFileUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '')
    : 'http://localhost:5000';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function ProfileEditModal({
  isOpen,
  onClose,
  onSuccess,
}: ProfileEditModalProps) {
  const { user, token, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    avatar: '',
    documentPdf: '',
    documentName: '',
    currentPassword: '',
    newPassword: '',
  });

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        documentPdf: user.documentPdf || '',
        documentName: user.documentName || '',
        currentPassword: '',
        newPassword: '',
      });
      setSuccessMessage('');
      setErrorMessage('');
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  // Handle Profile Picture (Avatar) Upload
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('অনুগ্রহ করে একটি বৈধ ইমেজ ফাইল (JPG, PNG, WebP) নির্বাচন করুন');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('ছবির সাইজ সর্বোচ্চ ৫ মেগাবাইট হতে পারবে');
      return;
    }

    setAvatarUploading(true);
    setErrorMessage('');
    try {
      const res = await uploadAuthFile(token, file);
      setFormData((prev) => ({ ...prev, avatar: res.url }));
    } catch (err: any) {
      setErrorMessage(err.message || 'ছবি আপলোড করতে ব্যর্থ হয়েছে');
    } finally {
      setAvatarUploading(false);
    }
  };

  // Handle Document PDF Upload
  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('অনুগ্রহ করে শুধুমাত্র PDF ফাইল নির্বাচন করুন');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('PDF ফাইলের সাইজ সর্বোচ্চ ১৫ মেগাবাইট হতে পারবে');
      return;
    }

    setPdfUploading(true);
    setErrorMessage('');
    try {
      const res = await uploadAuthFile(token, file);
      setFormData((prev) => ({
        ...prev,
        documentPdf: res.url,
        documentName: file.name,
      }));
    } catch (err: any) {
      setErrorMessage(err.message || 'PDF আপলোড করতে ব্যর্থ হয়েছে');
    } finally {
      setPdfUploading(false);
    }
  };

  const handleRemovePdf = () => {
    setFormData((prev) => ({ ...prev, documentPdf: '', documentName: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload: any = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio,
        avatar: formData.avatar,
        documentPdf: formData.documentPdf,
        documentName: formData.documentName,
      };

      if (formData.newPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }

      const res = await updateUserProfile(token, payload);
      updateUser(res.user);
      setSuccessMessage('আপনার প্রোফাইল তথ্য ও ডকুমেন্টস সফলভাবে আপডেট করা হয়েছে!');

      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1400);
    } catch (err: any) {
      setErrorMessage(err.message || 'প্রোফাইল আপডেট করতে সমস্যা হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl shadow-2xl border border-gray-200 dark:border-gray-800 my-8 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0 bg-gray-50/50 dark:bg-gray-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                প্রোফাইল তথ্য ও ডকুমেন্ট আপডেট
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                ভূমিকা: {getRoleNameInBangla(user?.role)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Success / Error Alerts */}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form id="profile-edit-form" onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Profile Picture (Avatar) Section */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700">
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-3">
                প্রোফাইল ছবি (Profile Picture)
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Avatar Preview */}
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-full border-3 border-emerald-500 overflow-hidden bg-emerald-50 dark:bg-gray-700 flex items-center justify-center shadow-xs">
                    {formData.avatar ? (
                      <img
                        src={getFileUrl(formData.avatar)}
                        alt="Profile Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                        {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </div>
                  {avatarUploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1 text-center sm:text-left space-y-1.5">
                  <input
                    type="file"
                    ref={avatarInputRef}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Button
                      type="button"
                      size="sm"
                      disabled={avatarUploading}
                      onClick={() => avatarInputRef.current?.click()}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs gap-1.5 py-1.5 px-3 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{formData.avatar ? 'ছবি পরিবর্তন করুন' : 'নতুন ছবি আপলোড'}</span>
                    </Button>

                    {formData.avatar && (
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, avatar: '' }))}
                        className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
                      >
                        ছবি মুছুন
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    JPG, PNG বা WebP ফরম্যাট। সর্বোচ্চ সাইজ: ৫ মেগাবাইট।
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Verification / Document PDF Upload Section */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>যাচাইকরণ ডকুমেন্ট / সার্টিফিকেট (PDF)</span>
                </label>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  এনআইডি / ট্রেড লাইসেন্স / খামারি সনদ
                </span>
              </div>

              <input
                type="file"
                ref={pdfInputRef}
                accept="application/pdf"
                className="hidden"
                onChange={handlePdfChange}
              />

              {formData.documentPdf ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800/70 shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400 flex items-center justify-center shrink-0 font-bold text-xs">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-800 dark:text-gray-100 truncate">
                        {formData.documentName || 'সংযুক্ত ডকুমেন্ট (Document.pdf)'}
                      </p>
                      <a
                        href={getFileUrl(formData.documentPdf)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>ডকুমেন্টটি প্রিভিউ / ডাউনলোড করুন</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => pdfInputRef.current?.click()}
                      className="border border-gray-200 hover:border-emerald-400 text-gray-700 dark:text-gray-200 text-xs py-1 px-2.5 rounded-lg"
                    >
                      পরিবর্তন
                    </Button>
                    <button
                      type="button"
                      onClick={handleRemovePdf}
                      title="PDF সরান"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => pdfInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-white/50 dark:bg-gray-800/50"
                >
                  {pdfUploading ? (
                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>PDF আপলোড হচ্ছে...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5">
                      <Upload className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        আপনার ভেরিফিকেশন বা কৃষি সনদ PDF ফাইল আপলোড করুন
                      </p>
                      <p className="text-[10px] text-gray-400">
                        শুধুমাত্র .PDF ফাইল। সর্বোচ্চ সাইজ: ১৫ মেগাবাইট
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Text Inputs: Name, Phone, Address, Bio */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                পূর্ণ নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  মোবাইল নম্বর
                </label>
                <input
                  type="text"
                  placeholder="০১৭xxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ঠিকানা ও এলাকা
                </label>
                <input
                  type="text"
                  placeholder="উপজেলা, জেলা"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                খামার / দোকান / প্রোফাইল পরিচিতি
              </label>
              <textarea
                rows={3}
                placeholder="আপনার খামার, কৃষি ব্যবসা বা প্রোফাইল বিবরণ..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* 4. Password Change (Optional) */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>পাসওয়ার্ড পরিবর্তন (ঐচ্ছিক)</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    বর্তমান পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    placeholder="বর্তমান পাসওয়ার্ড"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    নতুন পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    placeholder="কমপক্ষে ৬ অক্ষর"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3 shrink-0 bg-gray-50/50 dark:bg-gray-800/40">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition cursor-pointer"
          >
            বাতিল
          </button>
          <Button
            type="submit"
            form="profile-edit-form"
            disabled={submitting || avatarUploading || pdfUploading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-5 py-2 text-xs font-semibold gap-1.5 cursor-pointer shadow-xs"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>সংরক্ষণ হচ্ছে...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>সংরক্ষণ করুন</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
