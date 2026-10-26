"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, Loader2, Info, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { loginUser } from "@/lib/api/auth";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { LoginData } from "@/types/auth";

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const onSubmit = async (data: LoginData) => {
    try {
      setIsSubmitting(true);
      setServerError(null);
      const { token, user } = await loginUser(data);
      login(token, user);
      router.push(redirectUrl || "/");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message || "লগইন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      } else {
        setServerError("লগইন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {redirectUrl && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
          <span>কার্টে পণ্য যোগ করতে বা অর্ডার সম্পন্ন করতে অনুগ্রহ করে আপনার অ্যাকাউন্টে লগইন করুন।</span>
        </div>
      )}

      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3.5 top-10.5 h-5 w-5 text-gray-400 pointer-events-none" />
          <Input
            label="ইমেইল ঠিকানা"
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "ইমেইল ঠিকানা প্রদান করা আবশ্যক",
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              className="accent-green-600 rounded"
              disabled={isSubmitting}
            />
            আমাকে মনে রাখুন
          </label>

          <Link
            href="/forgot-password"
            className="text-green-600 hover:text-green-700 hover:underline"
          >
            পাসওয়ার্ড ভুলে গেছেন?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl font-semibold cursor-pointer gap-2 transition"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>লগইন হচ্ছে...</span>
            </>
          ) : (
            <>
              <span>লগইন করুন</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 text-center text-gray-600 text-sm">
        অ্যাগ্রোমার্টে কোনো অ্যাকাউন্ট নেই?{" "}
        <Link
          href={
            redirectUrl
              ? `/register?redirect=${encodeURIComponent(redirectUrl)}`
              : "/register"
          }
          className="text-green-600 font-bold hover:underline"
        >
          নতুন অ্যাকাউন্ট খুলুন
        </Link>
      </div>
    </div>
  );
}
