import React from 'react';
import Link from 'next/link';
import type { LucideIcon } from "lucide-react";
import {
  Leaf,
  Apple,
  Wheat,
  Sprout,
  FlaskConical,
  Bug,
  Tractor,
  BadgeCheck
} from "lucide-react";

interface Category {
  name: string;
  description: string;
  productCount: string;
  icon: LucideIcon;
  slug: string;
}

const categories: Category[] = [
  {
    name: "Vegetables",
    description: "Freshly harvested vegetables directly from local farmers.",
    productCount: "120 Products",
    icon: Leaf,
    slug: "vegetables",
  },
  {
    name: "Fruits",
    description: "Sweet, fresh, and seasonal fruits from trusted growers.",
    productCount: "90 Products",
    icon: Apple,
    slug: "fruits",
  },
  {
    name: "Grains",
    description: "Premium quality rice, wheat, maize, and other grains.",
    productCount: "50 Products",
    icon: Wheat,
    slug: "grains",
  },
  {
    name: "Seeds",
    description: "Certified seeds for better germination and crop yield.",
    productCount: "75 Products",
    icon: Sprout,
    slug: "seeds",
  },
  {
    name: "Fertilizers",
    description: "Organic and chemical fertilizers for healthy crop growth.",
    productCount: "40 Products",
    icon: FlaskConical,
    slug: "fertilizers",
  },
  {
    name: "Pesticides",
    description: "Effective crop protection against insects and diseases.",
    productCount: "30 Products",
    icon: Bug,
    slug: "pesticides",
  },
  {
    name: "Farm Equipment",
    description: "Modern agricultural tools and machinery for efficient farming.",
    productCount: "60 Products",
    icon: Tractor,
    slug: "farm-equipment",
  },
  {
    name: "Organic Products",
    description: "Naturally grown, chemical-free products for a healthier lifestyle.",
    productCount: "85 Products",
    icon: BadgeCheck,
    slug: "organic-products",
  },
];

const Categories: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800">Featured Categories</h2>
          <p className="mt-3 text-lg text-gray-600">Browse products by category.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`} passHref>
              <div
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center
                           hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer border border-gray-200"
              >
                <div className="text-green-600 mb-4">
                  <category.icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  {category.productCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
