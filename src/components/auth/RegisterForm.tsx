"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { registerUser } from "@/lib/api/auth";
import { Input } from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { RegisterData } from "@/types/auth";

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: RegisterData) => {
    try {
      setIsSubmitting(true);
      setServerError(null);
      const { token, user } = await registerUser(data);
      login(token, user);
      router.push("/");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message || "নিবন্ধনে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      } else {
        setServerError("নিবন্ধনে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="relative">
          <User className="absolute left-3.5 top-10.5 h-5 w-5 text-gray-400 pointer-events-none" />
          <Input
            label="আপনার পূর্ণ নাম"
            placeholder="যেমন: মোঃ রফিকুল ইসলাম"
            {...register("name", {
              required: "নাম প্রদান করা আবশ্যক",
            })}
            error={errors.name?.message}
            className="pl-11"
            disabled={isSubmitting}
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3.5 top-10.5 h-5 w-5 text-gray-400 pointer-events-none" />
          <Input
            label="ইমেইল ঠিকানা"
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "ইমেইল প্রদান করা আবশ্যক",
            })}
            error={errors.email?.message}
            className="pl-11"
            disabled={isSubmitting}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3.5 top-10.5 h-5 w-5 text-gray-400 pointer-events-none" />
          <Input
            label="পাসওয়ার্ড"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password", {
              required: "পাসওয়ার্ড প্রদান করা আবশ্যক",
              minLength: {
                value: 6,
                message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
              },
            })}
            error={errors.password?.message}
            className="pl-11 pr-11"
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 top-10.5 p-1 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer transition-colors"
            title={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
            aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>

        <Select
          label="অ্যাকাউন্টের ধরন / রোল নির্বাচন করুন"
          {...register("role", {
            required: "রোল নির্বাচন করা আবশ্যক",
          })}
          options={[
            {
              value: "farmer",
              label: "কৃষক / খামারি (পণ্য উৎপাদনকারী)",
            },
            {
              value: "seller",
              label: "অনুমোদিত বিক্রেতা (সাপ্লায়ার)",
            },
          ]}
          error={errors.role?.message}
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold cursor-pointer gap-2 transition"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>রেজিস্ট্রেশন হচ্ছে...</span>
            </>
          ) : (
            <span>রেজিস্ট্রেশন সম্পন্ন করুন</span>
          )}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-600">
        ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/login"
          className="font-bold text-green-700 hover:underline"
        >
          লগইন করুন
        </Link>
      </div>
    </div>
  );
}
