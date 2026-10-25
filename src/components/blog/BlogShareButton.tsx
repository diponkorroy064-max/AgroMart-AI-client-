"use client";
import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface BlogShareButtonProps {
  title?: string;
}

export function BlogShareButton({ title }: BlogShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const currentUrl = window.location.href;

    // Use Web Share API if available and user is on mobile
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || document.title,
          url: currentUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share was aborted or rejected
        if ((err as Error).name === "AbortError") return;
      }
    }

    // Fallback: Copy link to clipboard
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignored
    }
  };

  return (
    <button
      onClick={handleShare}
      type="button"
      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200/70 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-slate-200/60"
      aria-label="লিঙ্ক কপি বা শেয়ার করুন"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-700 font-semibold">লিঙ্ক কপি হয়েছে</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-slate-500" />
          <span>শেয়ার করুন</span>
        </>
      )}
    </button>
  );
}
