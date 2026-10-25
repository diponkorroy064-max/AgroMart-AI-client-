import type { LucideIcon } from "lucide-react";
import {
  Leaf,
  Apple,
  Wheat,
  Sprout,
  FlaskConical,
  Bug,
  Tractor,
  BadgeCheck,
  Brain,
  ShieldCheck,
  LeafyGreen,
  CreditCard,
  Truck,
  LifeBuoy,
  Users,
  Package,
  ShoppingCart,
  MapPin,
  Smile,
  UserPlus,
  Search,
  BadgePercent,
  Bell,
  Droplets,
  Wrench,
} from "lucide-react";
import { IProduct } from "@/types/Product";

// Re-export BLOG_POSTS for consistency
export { BLOG_POSTS } from "@/constants/blogData";

// 1. Hero Section Data
export interface TrendingSearch {
  label: string;
  query: string;
}

export const trendingSearches: TrendingSearch[] = [
  { label: "হাইব্রিড টমেটো বীজ", query: "টমেটো" },
  { label: "ভার্মিকম্পোস্ট সার", query: "সার" },
  { label: "স্প্রিংকলার সেচ পাম্প", query: "স্প্রিংকলার" },
  { label: "জৈব নিম বালাইনাশক", query: "পেস্টিসাইড" },
  { label: "স্ল্যাট ম্যাট", query: "স্ল্যাট" },
];

// 2. Categories Section Data
export interface CategoryItem {
  name: string;
  productCount: string;
  icon: LucideIcon;
  slug: string;
  queryKey?: string;
  description?: string;
}

export const categoriesData: CategoryItem[] = [
  {
    name: "সার ও অনুখাদ্য",
    productCount: "৪+ পণ্য",
    icon: FlaskConical,
    slug: "fertilizers",
    queryKey: "Fertilizers",
    description: "ফসলের পুষ্টি ও মাটির উর্বরতা বৃদ্ধির সার",
  },
  {
    name: "উন্নত জাতের বীজ",
    productCount: "২+ পণ্য",
    icon: Sprout,
    slug: "seeds",
    queryKey: "Seeds",
    description: "উচ্চ ফলনশীল হাইব্রিড ও প্রত্যয়িত বীজ",
  },
  {
    name: "কীটনাশক ও বালাইনাশক",
    productCount: "৩+ পণ্য",
    icon: Bug,
    slug: "pesticides",
    queryKey: "Pesticides",
    description: "ফসল সুরক্ষায় পোকা ও রোগবালাই নাশক",
  },
  {
    name: "আগাছানাশক",
    productCount: "৩+ উপ-বিভাগ",
    icon: ShieldCheck,
    slug: "herbicides",
    queryKey: "Herbicides",
    description: "নির্বাচিত ও অনির্বাচিত কার্যকর আগাছানাশক",
  },
  {
    name: "আধুনিক কৃষি যন্ত্রপাতি",
    productCount: "৪+ পণ্য",
    icon: Tractor,
    slug: "agricultural-machinery",
    queryKey: "Agricultural Machinery",
    description: "টিলার, কম্বাইন হারভেস্টার ও মেশিনারি",
  },
  {
    name: "সেচ ব্যবস্থা ও সরঞ্জাম",
    productCount: "৪+ পণ্য",
    icon: Droplets,
    slug: "irrigation-equipment",
    queryKey: "Irrigation",
    description: "ড্রিপ, স্প্রিংকলার ও সোলার সেচ পাম্প",
  },
  {
    name: "কৃষি সরঞ্জাম ও সুরক্ষা",
    productCount: "৫+ পণ্য",
    icon: Wrench,
    slug: "farming-tools",
    queryKey: "Farm Tools",
    description: "হ্যান্ড টুলস, স্প্রেয়ার ও সুরক্ষা পোশাক",
  },
  {
    name: "জৈব ও ফসল সুরক্ষা",
    productCount: "২+ পণ্য",
    icon: LeafyGreen,
    slug: "crop-protection",
    queryKey: "Crop Protection",
    description: "পরিবেশবান্ধব বায়ো-বালাইনাশক ও সার",
  },
];

// 3. Featured Products Fallback Data
export const Products: IProduct[] = [
  {
    _id: "prod-1",
    name: "উন্নত জাতের হাইব্রিড টমেটো বীজ (F1)",
    description: "উচ্চ ফলনশীল, রোগ প্রতিরোধী এবং সব মৌসুমে চাষ উপযোগী প্রিমিয়াম টমেটো বীজ।",
    price: 350,
    quantity: 150,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=75",
    farmerId: "f-1",
    sellerId: "s-1",
    seller: { _id: "s-1", name: "গ্রিন সীডস বাংলাদেশ" },
  },
  {
    _id: "prod-2",
    name: "অর্গানিক ভার্মিকম্পোস্ট কেঁচো সার (২৫ কেজি)",
    description: "১০০% প্রাকৃতিক ও রাসায়নিকমুক্ত কেঁচো সার, যা মাটির উর্বরতা ও পানি ধারণ ক্ষমতা বৃদ্ধি করে।",
    price: 650,
    quantity: 80,
    category: "Fertilizers",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=75",
    farmerId: "f-2",
    sellerId: "s-2",
    seller: { _id: "s-2", name: "অ্যাগ্রো অর্গানিক ফার্ম" },
  },
  {
    _id: "prod-3",
    name: "প্লাস্টিক স্ল্যাটেড ফ্লোর ম্যাট (ছাগল ও ভেড়ার মাচা)",
    description: "উচ্চ ঘনত্বের ভার্জিন প্লাস্টিক স্ল্যাট ম্যাট। শুষ্ক ও রোগমুক্ত খামার ব্যবস্থাপনার জন্য আদর্শ।",
    price: 420,
    quantity: 200,
    category: "Farm Equipment",
    image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=75",
    farmerId: "f-3",
    sellerId: "s-3",
    seller: { _id: "s-3", name: "শখের খামার ইকুইপমেন্ট" },
  },
  {
    _id: "prod-4",
    name: "স্বয়ংক্রিয় পোল্ট্রি নিপল ড্রিংকার সিস্টেম",
    description: "পানি অপচয় রোধক স্টেইনলেস স্টিল নিপল ড্রিংকার। ব্রয়লার ও লেয়ার মুরগির জন্য উপযুক্ত।",
    price: 85,
    quantity: 500,
    category: "Farm Equipment",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=75",
    farmerId: "f-4",
    sellerId: "s-4",
    seller: { _id: "s-4", name: "পোল্ট্রি সলিউশনস" },
  },
  {
    _id: "prod-5",
    name: "কোল্ড-প্রেসড নিম অয়েল বায়ো-পেস্টিসাইড (১ লিটার)",
    description: "সবজি ও ফসলের পোকা দমনে ক্ষতিকারক রাসায়নিকবিহীন প্রাকৃতিক নিম বালাইনাশক।",
    price: 520,
    quantity: 60,
    category: "Pesticides",
    image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=75",
    farmerId: "f-5",
    sellerId: "s-5",
    seller: { _id: "s-5", name: "বায়ো কেয়ার বাংলাদেশ" },
  },
  {
    _id: "prod-6",
    name: "মাল্টি-নজল গার্ডেন ও কুলিং স্প্রিংকলার",
    description: "গ্রীষ্মকালে খামার ঠান্ডা রাখতে এবং ফসলে সুষম সেচ দেওয়ার স্বয়ংক্রিয় স্প্রিংকলার।",
    price: 280,
    quantity: 120,
    category: "Farm Equipment",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=75",
    farmerId: "f-6",
    sellerId: "s-6",
    seller: { _id: "s-6", name: "মডার্ন ইরিগেশন টেক" },
  },
];

// 4. Why Choose Section Data
export interface WhyChooseFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const whyChooseFeatures: WhyChooseFeature[] = [
  {
    title: "এআই ভিত্তিক পণ্য পরামর্শ",
    description: "আপনার ফসলের ধরন ও মাটির প্রয়োজন অনুযায়ী কৃত্রিম বুদ্ধিমত্তার সঠিক দিকনির্দেশনা।",
    icon: Brain,
  },
  {
    title: "যাচাইকৃত বিশ্বস্ত বিক্রেতা",
    description: "প্রতিটি কৃষক ও বিক্রেতা যাচাই করে প্ল্যাটফর্মে যুক্ত করায় নিশ্চিত হয় সর্বোচ্চ সততা।",
    icon: ShieldCheck,
  },
  {
    title: "খামার থেকে খাঁটি পণ্য",
    description: "মধ্যস্বত্বভোগী ছাড়া সরাসরি কৃষকের খামার থেকে তাজা ও পুষ্টিকর ফসল ক্রয়ের সুবিধা।",
    icon: LeafyGreen,
  },
  {
    title: "নিরাপদ ডিজিটাল পেমেন্ট",
    description: "বিকাশ, নগদ, কার্ড কিংবা ক্যাশ অন ডেলিভারিতে শতভাগ সুরক্ষিত লেনদেনের নিশ্চয়তা।",
    icon: CreditCard,
  },
  {
    title: "দ্রুততম দেশব্যাপী ডেলিভারি",
    description: "দেশের ৬৪ জেলায় নিরাপদ প্যাকেজিংয়ে দ্রুততম সময়ে পণ্য পৌঁছে দেওয়ার নেটওয়ার্ক।",
    icon: Truck,
  },
  {
    title: "২৪/৭ সার্বক্ষণিক কাস্টমার সাপোর্ট",
    description: "পণ্য নির্বাচন, অর্ডার বা কৃষিসংক্রান্ত যেকোনো সহায়তায় আমাদের টিম সবসময় প্রস্তুত।",
    icon: LifeBuoy,
  },
];

// 5. Statistics Section Data
export interface StatisticItem {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const marketplaceStatistics: StatisticItem[] = [
  {
    value: "১০,০০০+",
    title: "নিবন্ধিত গ্রাহক",
    description: "প্রতিদিন নতুন কৃষক ও ক্রেতা যুক্ত হচ্ছেন",
    icon: Users,
  },
  {
    value: "২,৫০০+",
    title: "সফল খামারি",
    description: "সরাসরি লাভবান হচ্ছেন আমাদের সাথে",
    icon: Sprout,
  },
  {
    value: "৫,০০০+",
    title: "কৃষি পণ্য",
    description: "উন্নত বীজ, সার ও কৃষি সরঞ্জাম",
    icon: Package,
  },
  {
    value: "১৫,০০০+",
    title: "সফল ডেলিভারি",
    description: "নিরাপদে ও সঠিক সময়ে পণ্য পৌঁছানো",
    icon: ShoppingCart,
  },
  {
    value: "৬৪",
    title: "জেলা নেটওয়ার্ক",
    description: "দেশের প্রতিটি কোণে সেবার পরিধি",
    icon: MapPin,
  },
  {
    value: "৯৮%",
    title: "গ্রাহক সন্তুষ্টি",
    description: "বিশ্বস্ত মান এবং সময়নিষ্ঠ সেবা",
    icon: Smile,
  },
];

// 6. How It Works Section Data
export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "০১",
    title: "অ্যাকাউন্ট খুলুন",
    description: "খুব সহজেই ক্রেতা, কৃষক বা বিক্রেতা হিসেবে ফ্রি রেজিস্ট্রেশন করুন।",
    icon: UserPlus,
  },
  {
    number: "০২",
    title: "পণ্য বা উপকরণ খুঁজুন",
    description: "খাঁটি কৃষি ফসল, উন্নত বীজ, সার ও খামার সরঞ্জাম থেকে বেছে নিন।",
    icon: Search,
  },
  {
    number: "০৩",
    title: "সহজে অর্ডার দিন",
    description: "কার্টে যুক্ত করে পছন্দের মাধ্যমে শতভাগ নিরাপদ পেমেন্ট সম্পন্ন করুন।",
    icon: ShoppingCart,
  },
  {
    number: "০৪",
    title: "দোরগোড়ায় ডেলিভারি",
    description: "দ্রুততম সময়ে খামার বা বাড়ির ঠিকানায় সতেজ পণ্য গ্রহণ করুন।",
    icon: Truck,
  },
];

// 7. Testimonials Section Data
export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  location: string;
  avatar: string;
  rating?: number;
}

export const testimonialsData: TestimonialItem[] = [
  {
    name: "মোঃ আলী খান",
    role: "কৃষক",
    text: "অ্যাগ্রোমার্টের মাধ্যমে আমার উৎপাদিত সবজি এখন মধ্যস্বত্বভোগী ছাড়া সরাসরি ভালো দামে বিক্রি করতে পারছি।",
    location: "ঢাকা",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    name: "ফাতেমা বেগম",
    role: "নিয়মিত ক্রেতা",
    text: "এখানে শাকসবজি ও ফলমূল শতভাগ তাজা ও ভেজালমুক্ত। দ্রুত হোম ডেলিভারি পাওয়া যায় এবং অর্ডারিং খুবই সহজ।",
    location: "চট্টগ্রাম",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "রহিম চৌধুরী",
    role: "কৃষি বিক্রেতা",
    text: "আমার বীজ ও জৈব সারের ব্যবসা দেশব্যাপী ছড়িয়ে দিতে পেরেছি। ড্যাশবোর্ড থেকে খুব সহজেই স্টক পরিচালনা করা যায়।",
    location: "সিলেট",
    avatar: "https://i.pravatar.cc/150?img=69",
  },
  {
    name: "নুসরাত জাহান",
    role: "ভোক্তা",
    text: "অর্গানিক চাল ও খাঁটি ঘানির তেলের দারুণ সংগ্রহ! কৃষকদের সম্পর্কে বিস্তারিত জানা যায় যা পণ্যে শতভাগ আস্থা দেয়।",
    location: "রাজশাহী",
    avatar: "https://i.pravatar.cc/150?img=26",
  },
  {
    name: "আহমেদ কবির",
    role: "ফলচাষি",
    text: "মৌসুমি ফল সরাসরি ভোক্তাদের হাতে পৌঁছে দিতে এমন আধুনিক প্ল্যাটফর্ম চমৎকার। পেমেন্ট ও সাপোর্ট টিম অত্যন্ত আন্তরিক।",
    location: "খুলনা",
    avatar: "https://i.pravatar.cc/150?img=70",
  },
  {
    name: "জারা ইসলাম",
    role: "কৃষি উদ্যোক্তা",
    text: "আধুনিক খামার যন্ত্রপাতি ও ড্রিপ ইরিগেশন সামগ্রী বিক্রির সেরা প্ল্যাটফর্ম। ইনভেন্টরি ম্যানেজমেন্ট বেশ স্বাচ্ছন্দ্যময়।",
    location: "বরিশাল",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
];

// 8. Newsletter Trust Indicators
export interface NewsletterTrustCue {
  label: string;
  icon: LucideIcon;
}

export const newsletterTrustCues: NewsletterTrustCue[] = [
  { label: "বিশেষ ডিসকাউন্ট", icon: BadgePercent },
  { label: "নতুন পণ্যের আপডেট", icon: Bell },
  { label: "স্প্যামমুক্ত নিশ্চয়তা", icon: ShieldCheck },
];

// 9. CTA Trust Indicators
export interface CtaTrustCue {
  label: string;
  icon: LucideIcon;
}

export const ctaTrustCues: CtaTrustCue[] = [
  { label: "নিরাপদ পেমেন্ট", icon: ShieldCheck },
  { label: "যাচাইকৃত কৃষক ও বিক্রেতা", icon: BadgeCheck },
  { label: "সারা দেশে দ্রুত ডেলিভারি", icon: Truck },
];
