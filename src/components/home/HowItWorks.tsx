import React from 'react';
import Link from 'next/link';
import {
  UserPlus,
  Search,
  ShoppingCart,
  Truck,
  Icon as LucideIcon
} from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Create an Account',
    description: 'Register as a Buyer, Farmer, or Seller to get started.',
    icon: UserPlus,
  },
  {
    number: '02',
    title: 'Explore Products',
    description: 'Browse thousands of fresh agricultural products with ease.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Place an Order',
    description: 'Order securely with a smooth and reliable checkout experience.',
    icon: ShoppingCart,
  },
  {
    number: '04',
    title: 'Receive Delivery',
    description: 'Get fresh products conveniently delivered to your doorstep.',
    icon: Truck,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800">How AgroMart Works</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Buying and selling agricultural products has never been easier.
          </p>
        </div>

        {/* Steps Grid with Timeline/Arrow visual */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Desktop timeline arrows */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full -translate-y-1/2">
            <div className="flex justify-around items-center h-full">
              <span className="w-1/4 h-1 bg-green-300 relative">
                <ArrowRightIcon className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-green-500" />
              </span>
              <span className="w-1/4 h-1 bg-green-300 relative">
                <ArrowRightIcon className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-green-500" />
              </span>
              <span className="w-1/4 h-1 bg-green-300 relative">
                <ArrowRightIcon className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-green-500" />
              </span>
            </div>
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center
                         transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl
                         h-full z-10" // Ensures equal card height and stacking context
            >
              <div className="text-5xl font-extrabold text-green-200 mb-4">{step.number}</div>
              <div className="text-green-600 mb-4">
                <step.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-base flex-grow">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" passHref>
            <button className="bg-green-600 text-white hover:bg-green-700 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
              Start Shopping
            </button>
          </Link>
          <Link href="/register" passHref>
            <button className="bg-transparent border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
              Become a Seller
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Helper component for the arrow icon (if not directly importable from lucide-react in this exact way)
const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default HowItWorks;
