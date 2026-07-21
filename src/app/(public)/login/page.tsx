"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Leaf, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { loginUser } from "@/lib/api/auth";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { LoginData } from "@/types/auth";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const { token, user } = await loginUser(data);
      login(token, user);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };


  return (
    <section className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex bg-linear-to-br from-green-700 to-emerald-600 text-white p-12 flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <Leaf className="w-10 h-10" />
            <h2 className="text-4xl font-bold">
              AgroMart
            </h2>
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Welcome Back!
          </h1>

          <p className="text-green-100 text-lg leading-8 mb-8">
            Login to access your dashboard, manage products, and discover
            fresh agricultural products from trusted farmers across the
            country.
          </p>

          <Image
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80"
            width={600}
            height={500}
            alt="Farmer"
            className="rounded-2xl shadow-xl object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Login
            </h2>

            <p className="text-gray-500 mt-2">
              Welcome back! Please login to continue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
              })}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="accent-green-600"
                />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl"
            >
              Login
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-8 text-center text-gray-600">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="text-green-600 font-semibold hover:underline"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

