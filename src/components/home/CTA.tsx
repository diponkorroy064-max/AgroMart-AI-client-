import React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

interface TrustIndicator {
  text: string;
  icon: LucideIcon;
}

interface Stat {
  value: string;
  label: string;
}

const trustIndicators: TrustIndicator[] = [
  {
    text: "100% Secure Payment",
    icon: ShieldCheck,
  },
  {
    text: "Verified Farmers",
    icon: BadgeCheck,
  },
  {
    text: "Fast Delivery",
    icon: Truck,
  },
];

const statistics: Stat[] = [
  {
    value: "15K+",
    label: "Happy Customers",
  },
  {
    value: "2.5K+",
    label: "Farmers",
  },
  {
    value: "5K+",
    label: "Products",
  },
  {
    value: "25K+",
    label: "Orders Delivered",
  },
];

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-24">

      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-r from-green-800 via-green-700 to-emerald-700"></div>

      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-green-400/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald-300/20 blur-3xl"></div>

      <div className="relative container mx-auto px-6">

        <div className="max-w-6xl mx-auto rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl p-10 lg:p-16">

          {/* Heading */}

          <div className="text-center max-w-3xl mx-auto">

            <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-5">
              🌿 Join Bangladesh Smart Agriculture Marketplace
            </span>

            <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">

              Grow Your Farming
              <span className="block text-yellow-300">
                Business With AgroMart
              </span>

            </h2>

            <p className="mt-6 text-lg text-green-100 leading-8">
              Buy fresh agricultural products directly from trusted farmers,
              sell your harvest, and enjoy secure payments with nationwide
              delivery.
            </p>
          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link href="/products">

              <button className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-green-700 shadow-lg transition hover:scale-105 hover:bg-yellow-300">

                Shop Now

                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />

              </button>

            </Link>

            <Link href="/register">

              <button className="rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-green-700 hover:scale-105">

                Become a Seller

              </button>

            </Link>

          </div>

          {/* Trust Badges */}

          <div className="mt-14 flex flex-wrap justify-center gap-8">

            {trustIndicators.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur-md"
              >
                <item.icon className="h-6 w-6 text-yellow-300" />
                <span className="font-medium text-white">
                  {item.text}
                </span>
              </div>
            ))}

          </div>

          {/* Statistics */}

          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">

            {statistics.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-md border border-white/10 hover:bg-white/20 transition"
              >

                <h3 className="text-4xl font-bold text-yellow-300">
                  {stat.value}
                </h3>

                <p className="mt-2 text-green-100">
                  {stat.label}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTA;
