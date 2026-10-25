"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toggleFavorite, checkIsFavorite } from "@/lib/api/favorite";

interface FavoriteButtonProps {
  productId: string;
  showLabel?: boolean;
  variant?: "pill" | "circle";
  className?: string;
}

export function FavoriteButton({
  productId,
  showLabel = false,
  variant = "pill",
  className = "",
}: FavoriteButtonProps) {
  const { user, token } = useAuth();
  const pathname = usePathname();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Check initial favorite status if user is logged in
  useEffect(() => {
    let isMounted = true;
    if (token && productId) {
      checkIsFavorite(productId, token)
        .then((fav) => {
          if (isMounted) setIsFavorite(fav);
        })
        .catch(() => {
          if (isMounted) setIsFavorite(false);
        });
    } else {
      setIsFavorite(false);
    }
    return () => {
      isMounted = false;
    };
  }, [productId, token]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token || !user) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 4000);
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      const res = await toggleFavorite(productId, token);
      setIsFavorite(res.isFavorite);
      setFeedback(res.message);
      setTimeout(() => setFeedback(null), 2500);
    } catch (err: any) {
      setFeedback(err.message || "ত্রুটি ঘটেছে");
      setTimeout(() => setFeedback(null), 2500);
    } finally {
      setLoading(false);
    }
  };

  if (variant === "circle") {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={handleToggle}
          disabled={loading}
          aria-label={
            isFavorite ? "পছন্দের তালিকা থেকে সরান" : "পছন্দের তালিকায় যোগ করুন"
          }
          title={
            isFavorite ? "পছন্দের তালিকা থেকে সরান" : "পছন্দের তালিকায় যোগ করুন"
          }
          className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm border ${
            isFavorite
              ? "bg-white/95 dark:bg-gray-900/90 text-rose-500 border-rose-200 dark:border-rose-900/60 hover:scale-110 hover:bg-rose-50"
              : "bg-white/90 dark:bg-gray-900/80 text-gray-600 dark:text-gray-300 border-gray-200/70 dark:border-gray-700/70 hover:scale-110 hover:text-rose-500 hover:bg-white"
          } ${className}`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-rose-500" />
          ) : (
            <Heart
              className={`w-5 h-5 transition-transform duration-200 ${
                isFavorite
                  ? "fill-rose-500 text-rose-500 scale-105"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            />
          )}
        </button>

        {/* Feedback tooltip */}
        {feedback && (
          <div className="absolute right-0 top-12 z-50 whitespace-nowrap px-3 py-1.5 rounded-lg bg-gray-900/95 text-white text-xs font-medium shadow-lg animate-in fade-in zoom-in-95 duration-150">
            {feedback}
          </div>
        )}

        {/* Login prompt popup */}
        {showLoginPrompt && (
          <div className="absolute right-0 top-12 z-50 w-56 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl animate-in fade-in zoom-in-95 duration-150 text-left">
            <p className="text-xs text-gray-700 dark:text-gray-300 font-medium mb-2 leading-relaxed">
              পছন্দের তালিকায় যোগ করতে অনুগ্রহ করে লগইন করুন।
            </p>
            <Link
              href={
                pathname
                  ? `/login?redirect=${encodeURIComponent(pathname)}`
                  : "/login"
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold w-full justify-center transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              লগইন করুন
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        title={
          isFavorite ? "পছন্দের তালিকা থেকে সরান" : "পছন্দের তালিকায় যোগ করুন"
        }
        className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer ${
          isFavorite
            ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/70 hover:bg-rose-100 dark:hover:bg-rose-950/60"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300"
        } ${className}`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
        ) : (
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isFavorite
                ? "fill-rose-500 text-rose-500 scale-110"
                : "text-gray-500 dark:text-gray-400"
            }`}
          />
        )}
        {showLabel && (
          <span>{isFavorite ? "পছন্দে সংরক্ষিত" : "পছন্দের তালিকায় রাখুন"}</span>
        )}
      </button>

      {/* Temporary Toast / Feedback */}
      {feedback && (
        <div className="absolute left-0 -bottom-9 z-50 whitespace-nowrap px-3 py-1 rounded-lg bg-gray-900/90 text-white text-xs font-medium shadow-md">
          {feedback}
        </div>
      )}

      {/* Login prompt popup */}
      {showLoginPrompt && (
        <div className="absolute left-0 top-14 z-50 w-60 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl text-left">
          <p className="text-xs text-gray-700 dark:text-gray-300 font-medium mb-2 leading-relaxed">
            পছন্দের তালিকায় যোগ করতে অনুগ্রহ করে লগইন করুন।
          </p>
          <Link
            href={
              pathname
                ? `/login?redirect=${encodeURIComponent(pathname)}`
                : "/login"
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold w-full justify-center transition"
          >
            <LogIn className="w-3.5 h-3.5" />
            লগইন করুন
          </Link>
        </div>
      )}
    </div>
  );
}
