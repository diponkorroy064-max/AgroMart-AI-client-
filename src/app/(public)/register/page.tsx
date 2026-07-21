"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { registerUser } from "@/lib/api/auth";
import { Input } from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { RegisterData } from "@/types/auth";

import {
  Leaf,
  User,
  Mail,
  Lock,
  Sprout,
} from "lucide-react";
import Image from "next/image";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: RegisterData) => {
    try {
      const { token, user } = await registerUser(data);

      login(token, user);

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-green-100 via-white to-green-50">

      <div className="container mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">

          {/* Left Side */}

          <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-green-700 via-green-600 to-emerald-700 p-12 text-white">

            <div className="flex items-center gap-3 mb-8">
              <Leaf className="h-12 w-12" />
              <h1 className="text-4xl font-bold">
                AgroMart
              </h1>
            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Join the Future of Agriculture
            </h2>

            <p className="text-lg text-green-100 leading-8">
              Buy fresh agricultural products directly from trusted farmers,
              grow your business, and connect with thousands of customers
              across Bangladesh.
            </p>

            <Image
              width={600}
              height={600}
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399"
              alt="Farmer with fresh vegetables"
              className="mt-12 w-full max-w-md self-center rounded-2xl shadow-2xl object-cover"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-8 lg:p-14">

            <div className="w-full max-w-md">

              <div className="text-center mb-8">

                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">

                  <Sprout className="text-green-600 h-8 w-8" />

                </div>

                <h2 className="text-3xl font-bold text-gray-800">
                  Create Account
                </h2>

                <p className="text-gray-500 mt-2">
                  Register to start buying and selling fresh products.
                </p>

              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >

                <div className="relative">

                  <User className="absolute left-3 top-11 h-5 w-5 text-gray-400" />

                  <Input
                    label="Full Name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    error={errors.name?.message}
                    className="pl-10"
                  />

                </div>

                <div className="relative">

                  <Mail className="absolute left-3 top-11 h-5 w-5 text-gray-400" />

                  <Input
                    label="Email Address"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    error={errors.email?.message}
                    className="pl-10"
                  />

                </div>

                <div className="relative">

                  <Lock className="absolute left-3 top-11 h-5 w-5 text-gray-400" />

                  <Input
                    label="Password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    error={errors.password?.message}
                    className="pl-10"
                  />

                </div>

                <Select
                  label="Select Role"
                  {...register("role", {
                    required: "Role is required",
                  })}
                  options={[
                    {
                      value: "farmer",
                      label: "Farmer",
                    },
                    {
                      value: "seller",
                      label: "Seller",
                    },
                  ]}
                  error={errors.role?.message}
                />

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                >
                  Create Account
                </Button>

              </form>

              <div className="mt-8 text-center">

                <p className="text-gray-600">

                  Already have an account?{" "}

                  <Link
                    href="/login"
                    className="font-semibold text-green-600 hover:text-green-700"
                  >
                    Login
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default RegisterPage;
