import { Home, Package, BookOpen, Info, PhoneCall } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { title: "হোম", href: "/", icon: Home },
  { title: "পণ্যসমূহ", href: "/products", icon: Package },
  { title: "কৃষি ব্লগ ও টিপস", href: "/blog", icon: BookOpen, badge: "নতুন" },
  { title: "আমাদের সম্পর্কে", href: "/about", icon: Info },
  { title: "যোগাযোগ", href: "/contact", icon: PhoneCall },
];

export const ROLE_NAMES_BN: Record<string, string> = {
  farmer: "কৃষক",
  seller: "বিক্রেতা",
  admin: "অ্যাডমিন",
};

export const getRoleNameInBangla = (role?: string): string => {
  if (!role) return "ব্যবহারকারী";
  return ROLE_NAMES_BN[role] || "ব্যবহারকারী";
};

export const SITE_HOTLINE = "০১৯৮৮৮৮৩১০২";
export const SITE_HOTLINE_HOURS = "সকাল ৯টা – রাত ৮টা";
