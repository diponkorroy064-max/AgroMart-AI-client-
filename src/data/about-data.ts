import type { LucideIcon } from "lucide-react";
import {
  FlaskConical,
  Leaf,
  Tractor,
  Bug,
  Sprout,
  Sparkles,
  Store,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Truck,
  Layers,
  HeartHandshake,
  Award,
  Lightbulb,
  Users,
} from "lucide-react";

export interface AboutHeroData {
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface AboutPillarItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  accentColor: "emerald" | "blue" | "amber";
}

export interface AboutCategoryItem {
  id: string;
  title: string;
  categorySlug: string;
  description: string;
  icon: LucideIcon;
  badge: string;
}

export interface AboutAiStepItem {
  step: string;
  title: string;
  description: string;
}

export interface AboutValueItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AboutStatItem {
  value: string;
  label: string;
}

export interface AboutCtaData {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

// Backward compatibility types
export interface OurStoryData {
  title: string;
  paragraphs: string[];
  image: string;
  alt: string;
}

export interface MissionVisionItem {
  badge: string;
  title: string;
  description: string;
}

export interface MissionVisionData {
  mission: MissionVisionItem;
  vision: MissionVisionItem;
}

export interface AboutFeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface WhyChooseData {
  title: string;
  benefits: string[];
  image: string;
  alt: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  social: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface AboutTestimonial {
  name: string;
  role?: string;
  rating: number;
  review: string;
}

export interface ImpactTimelineItem {
  year: string;
  title: string;
  description: string;
}

// 1. Hero Section Data
export const aboutHeroData: AboutHeroData = {
  badge: "স্মার্ট এগ্রিটেক ও এগ্রিকালচারাল ই-কমার্স",
  title: "আধুনিক কৃষির সকল উপকরণ, বিশ্বস্ত কোম্পানি ও এআই নির্দেশনার এক স্মার্ট প্ল্যাটফর্ম",
  subtitle:
    "AgroMart AI হলো বাংলাদেশের প্রথম সমন্বিত ডিজিটাল কৃষি মার্কেটপ্লেস—যেখানে কৃষক ও ক্রেতারা রাসায়নিক ও জৈব সার, মেশিনারিজ, কীটনাশক এবং হাইব্রিড বীজ এক ছাদের নিচে পান। শীর্ষ কোম্পানিগুলো বিক্রি করে তাদের আসল পণ্য, আর এআই অ্যাসিস্ট্যান্ট নিশ্চিত করে সঠিক পণ্য নির্বাচন।",
  primaryCta: {
    label: "মার্কেটপ্লেস ঘুরে দেখুন",
    href: "/products",
  },
  secondaryCta: {
    label: "সেলার হিসেবে যোগ দিন →",
    href: "/register",
  },
};

// 2. Three Core Pillars (Buyer/Farmer, Seller/Company, AI Assistant)
export const aboutPillarsData: AboutPillarItem[] = [
  {
    id: "farmer-buyer",
    badge: "ক্রেতা ও কৃষকদের জন্য",
    title: "সর্বোচ্চ ফলনের নির্ভরযোগ্য সমাধান",
    subtitle: "ভালো ফসল উৎপাদন ও খামারের আধুনিকায়নে যা কিছু দরকার",
    description:
      "কৃষিকাজ শুরু থেকে ফসল তোলা পর্যন্ত প্রয়োজনীয় সার, কীটনাশক, যন্ত্রপাতি ও হাইব্রিড বীজ সরাসরি ঘরে বসেই অর্ডার করতে পারেন কৃষক ও কৃষি উদ্যোক্তারা।",
    icon: Tractor,
    accentColor: "emerald",
    features: [
      "উচ্চমানের রাসায়নিক সার ও বিশুদ্ধ জৈব ভার্মিকম্পোস্ট",
      "পাওয়ার টিলার, হার্ভেস্টার, পাওয়ার স্প্রেয়ার ও আধুনিক মেশিনারিজ",
      "কীটনাশক, ছত্রাকনাশক ও আগাছানাশক সঠিক নির্দেশনাসহ",
      "উচ্চ ফলনশীল হাইব্রিড বীজ ও উন্নত চারা",
    ],
    ctaLabel: "কৃষিপণ্য দেখুন",
    ctaHref: "/products",
  },
  {
    id: "seller-company",
    badge: "সেলার ও কৃষি কোম্পানির জন্য",
    title: "সরাসরি কৃষকদের সাথে যুক্ত হওয়ার প্ল্যাটফর্ম",
    subtitle: "কোম্পানির কৃষি মেশিনারিজ, সার ও বীজ বিক্রির ডিজিটাল বাজার",
    description:
      "কৃষি যন্ত্রপাতি প্রস্তুতকারক, রাসায়নিক সার ও বীজ কোম্পানিগুলো তাদের অফিশিয়াল ও ভেরিফায়েড পণ্য সরাসরি সারা দেশের কৃষকদের কাছে ন্যায্য মূল্যে পৌঁছে দিতে পারে।",
    icon: Store,
    accentColor: "blue",
    features: [
      "ভেজালমুক্ত ও ব্রান্ডেড পণ্যের ভেরিফায়েড লিস্টিং",
      "সারা দেশের বিশাল কৃষক ও কৃষি খামারির সাথে সরাসরি সংযোগ",
      "স্বচ্ছ ড্যাশবোর্ড, সহজ ইনভেন্টরি ও অর্ডার ব্যবস্থাপনা",
      "নিরাপদ পেমেন্ট সেটেলমেন্ট ও কোম্পানির সুনাম বৃদ্ধি",
    ],
    ctaLabel: "সেলার নিবন্ধন করুন",
    ctaHref: "/register",
  },
  {
    id: "ai-assistant",
    badge: "স্মার্ট এআই প্রযুক্তি",
    title: "সঠিক পণ্য বাছাইয়ে এআই অ্যাসিস্ট্যান্ট",
    subtitle: "ভুল সার বা বালাইনাশক প্রয়োগের ক্ষতি এড়াতে ডিজিটাল গাইডেন্স",
    description:
      "কোন মাটিতে কোন সার প্রয়োজন? ফসলের কোন পোকার জন্য কোন কীটনাশক কাজ করবে? AgroMart AI কৃষককে সঠিক পণ্য ও মাত্রা বাছাই করতে রিয়েল-টাইম পরামর্শ দেয়।",
    icon: Sparkles,
    accentColor: "amber",
    features: [
      "মাটির গুণাগুণ ও ফসলের চাহিদা অনুযায়ী সার নির্বাচন",
      "রোগবালাই ও পোকামাকড় প্রতিরোধে সঠিক বালাইনাশক সাজেশন",
      "খামারের আকার ও বাজেট অনুযায়ী উপযুক্ত মেশিনারিজ রিকমেন্ডেশন",
      "অধিক ফলন নিশ্চিত করতে সেরা হাইব্রিড বীজের পরামর্শ",
    ],
    ctaLabel: "পণ্য সার্চ করুন",
    ctaHref: "/products",
  },
];

// 3. Core Product Categories Showcase
export const aboutCategoriesData: AboutCategoryItem[] = [
  {
    id: "cat-fertilizer",
    title: "রাসায়নিক ও জৈব সার",
    categorySlug: "fertilizers",
    badge: "মাটির পুষ্টি ও উর্বরতা",
    description:
      "ইউরিয়া, টিএসপি, ডিএপি, পটাশের পাশাপাশি ১০০% প্রাকৃতিকভাবে তৈরি ভার্মিকম্পোস্ট ও ট্রাইকোডার্মা জৈব সার।",
    icon: FlaskConical,
  },
  {
    id: "cat-machinery",
    title: "কৃষি যন্ত্রপাতি ও মেশিনারিজ",
    categorySlug: "farm-equipment",
    badge: "আধুনিক যান্ত্রিক চাষাবাদ",
    description:
      "পাওয়ার টিলার, কম্বাইন হার্ভেস্টার, পাওয়ার স্প্রেয়ার, রিপার ও খামারের সময় ও শ্রম বাঁচানোর অত্যাধুনিক যন্ত্রপাতি।",
    icon: Tractor,
  },
  {
    id: "cat-pesticides",
    title: "কীটনাশক ও আগাছানাশক",
    categorySlug: "pesticides",
    badge: "নিখুঁত ফসল সুরক্ষা",
    description:
      "ফসলের ক্ষতিকর পোকা, ছত্রাকজনিত রোগ ও অবাঞ্ছিত আগাছা কার্যকরভাবে দমনের অনুমোদিত ও পরিবেশবান্ধব বালাইনাশক।",
    icon: Bug,
  },
  {
    id: "cat-seeds",
    title: "উন্নত হাইব্রিড বীজ",
    categorySlug: "seeds",
    badge: "অধিক ফলনের নিশ্চয়তা",
    description:
      "উচ্চ ফলনশীল ও রোগপ্রতিরোধী ধান, গম, ভুট্টা এবং বিভিন্ন মৌসুমি শাকসবজি ও ফলের সার্টিফাইড বীজ।",
    icon: Sprout,
  },
  {
    id: "cat-irrigation",
    title: "সেচ ও স্প্রেয়ার সরঞ্জাম",
    categorySlug: "farm-equipment",
    badge: "পানি ও জ্বালানি সাশ্রয়ী",
    description:
      "ড্রিপ ইরিগেশন কিট, স্প্রিংকলার, সোলার পাম্প, ব্যাটারিচালিত স্প্রেয়ার এবং দীর্ঘস্থায়ী পাইপলাইন ফিটিংস।",
    icon: Droplets,
  },
  {
    id: "cat-organic",
    title: "জৈব উপাদান ও অনুখাদ্য",
    categorySlug: "organic-products",
    badge: "টেকসই কৃষিবান্ধব",
    description:
      "জিংক, বোরন, সালফার ও অনুখাদ্য উপাদান যা ফসলের বৃদ্ধির হার ও রোগ প্রতিরোধ ক্ষমতা বহুগুণ বৃদ্ধি করে।",
    icon: Leaf,
  },
];

// 4. AI Assistant How-It-Works Workflow
export const aboutAiWorkflowData: AboutAiStepItem[] = [
  {
    step: "০১",
    title: "আপনার ফসল ও জমির চাহিদা জানান",
    description:
      "আপনার কোন ফসল, জমির ধরন বা কী রোগবালাই দেখা দিয়েছে তা নির্বাচন করুন অথবা অনুসন্ধান বক্সে লিখুন।",
  },
  {
    step: "০২",
    title: "এআই তাৎক্ষণিক সঠিক পণ্য বিশ্লেষণ করে",
    description:
      "AgroMart AI কৃষি ডাটা বিশ্লেষণ করে মাটির স্বাস্থ্য ও ফসলের জন্য উপযোগী সার, কীটনাশক বা মেশিনারিজ নির্ধারণ করে।",
  },
  {
    step: "০৩",
    title: "যাচাইকৃত কোম্পানি থেকে সহজে অর্ডার করুন",
    description:
      "পছন্দমতো সার্টিফাইড কোম্পানির পণ্য সরাসরি নির্বাচন করে ক্যাশ অন ডেলিভারিতে দ্রুত আপনার দোরগোড়ায় বুঝে নিন।",
  },
];

// 5. Core Values & Trust Elements
export const aboutValuesData: AboutValueItem[] = [
  {
    id: "val-1",
    title: "১০০% খাঁটি ও ভেরিফায়েড পণ্য",
    description:
      "কোনো নকল বা ভেজাল পণ্যের স্থান নেই; প্রতিটি সার, বীজ ও মেশিনারিজ সরাসরি অনুমোদিত কোম্পানি ও ডিলারদের মাধ্যমে সরবরাহ করা হয়।",
    icon: ShieldCheck,
  },
  {
    id: "val-2",
    title: "কৃত্রিম বুদ্ধিমত্তার নিখুঁত গাইডেন্স",
    description:
      "অপ্রয়োজনীয় সার বা অতিরিক্ত কীটনাশক প্রয়োগের ক্ষতি থেকে জমি ও ফসলকে রক্ষা করতে এআই প্রযুক্তির সঠিক দিকনির্দেশনা।",
    icon: Sparkles,
  },
  {
    id: "val-3",
    title: "স্বচ্ছ মূল্য ও ন্যায্য অধিকার",
    description:
      "মধ্যস্বত্বভোগীদের দৌরাত্ম্য বন্ধ করে কৃষক যেন ন্যায্য মূল্যে আধুনিক কৃষি উপকরণ কিনতে পারেন তা আমরা নিশ্চিত করি।",
    icon: HeartHandshake,
  },
  {
    id: "val-4",
    title: "সারাদেশে নিরাপদ ও দ্রুত ডেলিভারি",
    description:
      "বাংলাদেশের ৬৪ জেলায় প্রত্যন্ত অঞ্চল পর্যন্ত দ্রুততম সময়ে ভারী মেশিনারিজ ও কৃষি উপকরণ নিরাপদ প্যাকেজিংয়ে পৌঁছে দেওয়া।",
    icon: Truck,
  },
];

// 6. Impact Statistics
export const aboutStatisticsData: AboutStatItem[] = [
  { value: "১৫,০০০+", label: "নিবন্ধিত কৃষক ও ক্রেতা" },
  { value: "৫০০+", label: "কৃষি কোম্পানি ও সেলার" },
  { value: "১,২০০+", label: "সার, বীজ ও মেশিনারিজ" },
  { value: "৬৪", label: "জেলায় সরাসরি ডেলিভারি" },
  { value: "৯৯%", label: "সঠিক পণ্য পাওয়ার সন্তুষ্টি" },
];

// 7. Call To Action Data
export const aboutCtaData: AboutCtaData = {
  title: "স্মার্ট কৃষির এই ডিজিটাল বিপ্লবে যুক্ত হোন",
  subtitle:
    "আপনার খামারের উৎপাদন বহুগুণ বাড়াতে আজই সংগ্রহ করুন রাসায়নিক সার, জৈব সার, মেশিনারিজ ও হাইব্রিড বীজ। অথবা দেশের কৃষক সমাজের কাছে নিজের কোম্পানির কৃষিপণ্য বিক্রি করতে সেলার হিসেবে যোগ দিন।",
  primaryCta: {
    label: "মার্কেটপ্লেস দেখুন",
    href: "/products",
  },
  secondaryCta: {
    label: "সেলার হিসেবে নিবন্ধন করুন →",
    href: "/register",
  },
};

// --- Backward Compatibility Exports for Existing Components ---
export const ourStoryData: OurStoryData = {
  title: "আমাদের পেছনের গল্প",
  paragraphs: [
    "বাংলাদেশের কৃষকেরা অনেক সময় সঠিক রাসায়নিক সার, বিশুদ্ধ জৈব সার বা আধুনিক যন্ত্রপাতির অভাবে আশানুরূপ ফলন পান না। আবার অনেক সময় নকল ও ভেজাল কীটনাশক ব্যবহারের ফলে ফসল ক্ষতিগ্রস্ত হয়।",
    "এই সমস্যা স্থায়ীভাবে সমাধানের লক্ষ্যে গড়ে উঠেছে AgroMart AI—যেখানে কৃষকেরা সরাসরি অনুমোদিত কোম্পানিগুলোর কাছ থেকে আধুনিক কৃষি সামগ্রী কেনেন এবং এআই সহায়তায় সঠিক পণ্যটি নির্বাচন করতে পারেন।",
  ],
  image: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg",
  alt: "AgroMart AI Story",
};

export const missionVisionData: MissionVisionData = {
  mission: {
    badge: "আমাদের লক্ষ্য",
    title: "মিশন (Mission)",
    description:
      "দেশের প্রতিটি কৃষকের কাছে আসল রাসায়নিক ও জৈব সার, আধুনিক মেশিনারিজ, হাইব্রিড বীজ ও এআই প্রযুক্তি সহজলভ্য করে কৃষি উৎপাদন দ্বিগুণ করা।",
  },
  vision: {
    badge: "আমাদের রূপকল্প",
    title: "ভিশন (Vision)",
    description:
      "বাংলাদেশের সর্ববৃহৎ ও সবচেয়ে নির্ভরযোগ্য স্মার্ট কৃষি ই-কমার্স প্ল্যাটফর্মে পরিণত হওয়া, যেখানে প্রযুক্তি ও সততার মেলবন্ধনে সমৃদ্ধ হবে কৃষক সমাজ।",
  },
};

export const coreValuesData: AboutFeatureItem[] = [
  {
    id: "value-1",
    icon: HeartHandshake,
    title: "আস্থা ও বিশুদ্ধতা",
    description:
      "প্রতিটি রাসায়নিক ও জৈব সারের শতভাগ বিশুদ্ধতা ও গুণগত মান নিশ্চিত করা।",
  },
  {
    id: "value-2",
    icon: Award,
    title: "আধুনিক কৃষি যন্ত্রের প্রাপ্যতা",
    description:
      "কৃষকদের শ্রমে স্বস্তি এনে দিতে সাশ্রয়ী মূল্যে আধুনিক মেশিনারিজ পৌঁছে দেওয়া।",
  },
  {
    id: "value-3",
    icon: Leaf,
    title: "পরিবেশবান্ধব ও টেকসই কৃষি",
    description:
      "মাটির স্বাস্থ্য অটুট রাখতে জৈব সারের ব্যবহার বৃদ্ধি ও পরিমিত রাসায়নিক সার প্রয়োগ।",
  },
  {
    id: "value-4",
    icon: Lightbulb,
    title: "এআই প্রযুক্তিগত সহায়তা",
    description:
      "কৃত্রিম বুদ্ধিমত্তার মাধ্যমে ফসলের সঠিক বালাইনাশক ও সার নির্বাচন সহজ করা।",
  },
  {
    id: "value-5",
    icon: ShieldCheck,
    title: "সেলারদের বিশ্বস্ততা",
    description:
      "অনুমোদিত ও সার্টিফাইড কৃষি কোম্পানিদের সমন্বয়ে একটি নির্ভরযোগ্য বাজার তৈরি।",
  },
  {
    id: "value-6",
    icon: Users,
    title: "সমৃদ্ধ কৃষক সমাজ",
    description:
      "ন্যায্য মূল্যে উন্নত কৃষি উপকরণ দিয়ে কৃষকের লাভ ও সমৃদ্ধি নিশ্চিত করা।",
  },
];

export const platformFeaturesData: AboutFeatureItem[] = [
  {
    id: "feat-1",
    icon: Tractor,
    title: "আধুনিক কৃষি মেশিনারিজ",
    description: "পাওয়ার টিলার, হার্ভেস্টার, পাওয়ার স্প্রেয়ার ও হস্তচালিত কৃষি সরঞ্জাম।",
  },
  {
    id: "feat-2",
    icon: FlaskConical,
    title: "রাসায়নিক ও জৈব সার",
    description: "ইউরিয়া, টিএসপি, ডিএপি ও ১০০% প্রাকৃতিক কেঁচো ভার্মিকম্পোস্ট সার।",
  },
  {
    id: "feat-3",
    icon: Bug,
    title: "কীটনাশক ও আগাছানাশক",
    description: "ক্ষতিকর পোকামাকড় ও রোগবালাই দমনে অনুমোদিত ও কার্যকর বালাইনাশক।",
  },
  {
    id: "feat-4",
    icon: Sprout,
    title: "উন্নত হাইব্রিড বীজ",
    description: "অধিক ফলনশীল ধান, গম, ভুট্টা ও সবজির প্রিমিয়াম জাতের বীজ।",
  },
];

export const whyChooseData: WhyChooseData = {
  title: "কেন AgroMart AI বেছে নেবেন?",
  benefits: [
    "রাসায়নিক সার, জৈব সার ও আধুনিক কৃষি মেশিনারিজের বিশাল সমাহার",
    "শীর্ষস্থানীয় অনুমোদিত কৃষি কোম্পানি ও ডিলারদের খাঁটি পণ্য",
    "এআই অ্যাসিস্ট্যান্টের মাধ্যমে ফসল অনুযায়ী সঠিক পণ্য নির্বাচন",
    "ন্যায্য ও প্রতিযোগিতামূলক মূল্যে সরাসরি কেনার সুবিধা",
    "সারা বাংলাদেশে দ্রুত ও নিরাপদ ক্যাশ অন ডেলিভারি",
    "কৃষি বিশেষজ্ঞ ও সার্বক্ষণিক কাস্টমার সাপোর্ট",
  ],
  image: "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg",
  alt: "Why Choose AgroMart AI",
};

export const teamMembersData: TeamMember[] = [
  {
    name: "আহমেদ খান",
    role: "প্রতিষ্ঠাতা ও প্রধান নির্বাহী",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "ফাতেমা আলী",
    role: "লিড সফটওয়্যার আর্কিটেক্ট",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "বেলাল হোসেন",
    role: "কৃষি বিশেষজ্ঞ ও কনসালট্যান্ট",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "জয়নব বেগম",
    role: "ইউআই/ইউএক্স ডিজাইনার",
    social: { twitter: "#", linkedin: "#" },
  },
];

export const aboutTestimonialsData: AboutTestimonial[] = [
  {
    name: "মো: রফিকুল ইসলাম",
    role: "কৃষক, বগুড়া",
    rating: 5,
    review:
      "আগে বাজারে গিয়ে আসল সার বা ভালো হাইব্রিড বীজ চিনতে পারতাম না। AgroMart AI থেকে কেনা সার ও বীজ দিয়ে এ বছর ধানের ফলন অনেক বেশি হয়েছে।",
  },
  {
    name: "সুমন এগ্রো ট্রেডার্স",
    role: "অনুমোদিত সেলার, যশোর",
    rating: 5,
    review:
      "আমাদের কোম্পানির কৃষি যন্ত্রপাতি ও পাওয়ার স্প্রেয়ার এখন সারাদেশের কৃষকেরা সহজে কিনতে পারছেন। পেমেন্ট এবং অর্ডার প্রসেসিং দারুণ স্বচ্ছ।",
  },
  {
    name: "আব্দুল কাদের",
    role: "ফল ও সবজি চাষি, রাজশাহী",
    rating: 5,
    review:
      "এআই অ্যাসিস্ট্যান্ট দিয়ে জানতে পারলাম আমার আম বাগানের পোকা দমনে কোন কীটনাশক কতটুকু মাত্রায় স্প্রে করতে হবে। খুব দ্রুত সমস্যার সমাধান পেয়েছি।",
  },
];

export const impactTimelineData: ImpactTimelineItem[] = [
  {
    year: "২০২১",
    title: "কৃষি গবেষণার সূচনা",
    description: "কৃষকদের সার, বীজ ও মেশিনারিজ সংগ্রহের সংকট নিয়ে মাঠপর্যায়ে গবেষণা শুরু।",
  },
  {
    year: "২০২২",
    title: "ডিজিটাল মার্কেটপ্লেস প্রবর্তন",
    description: "শীর্ষ কৃষি কোম্পানি ও ডিলারদের সাথে নিয়ে অথেনটিক মার্কেটপ্লেসের আনুষ্ঠানিক যাত্রা।",
  },
  {
    year: "২০২৩",
    title: "১,২০০+ কৃষি পণ্যের অন্তর্ভুক্তি",
    description: "রাসায়নিক সার, জৈব সার, ভারী মেশিনারিজ ও হাইব্রিড বীজের বিশাল সম্ভার।",
  },
  {
    year: "২০২৪",
    title: "৬৪ জেলায় ডেলিভারি নেটওয়ার্ক",
    description: "বাংলাদেশের প্রতিটি প্রান্তে প্রান্তিক কৃষকের কাছে দ্রুততম সময়ে পণ্য পৌঁছানো।",
  },
  {
    year: "২০২৫",
    title: "স্মার্ট এআই কৃষি অ্যাসিস্ট্যান্ট",
    description: "সঠিক পণ্য বাছাই, ডোজ ক্যালকুলেশন ও রোগ প্রতিরোধে এআই প্রযুক্তির সংযোগ।",
  },
];
