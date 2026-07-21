import React from 'react';
import {
  Users,
  Sprout,
  Package,
  ShoppingCart,
  MapPin,
  Smile,
  Icon as LucideIcon
} from 'lucide-react';

interface Statistic {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const statistics: Statistic[] = [
  {
    value: '10,000+',
    title: 'Registered Users',
    description: 'Our vibrant community is growing daily.',
    icon: Users,
  },
  {
    value: '2,500+',
    title: 'Farmers',
    description: 'Connecting directly with producers.',
    icon: Sprout,
  },
  {
    value: '5,000+',
    title: 'Products',
    description: 'A diverse range of agricultural goods.',
    icon: Package,
  },
  {
    value: '15,000+',
    title: 'Successful Orders',
    description: 'Delivering fresh produce to your doorstep.',
    icon: ShoppingCart,
  },
  {
    value: '64',
    title: 'District Coverage',
    description: 'Reaching every corner of Bangladesh.',
    icon: MapPin,
  },
  {
    value: '98%',
    title: 'Customer Satisfaction',
    description: 'Our commitment to quality and service.',
    icon: Smile,
  },
];

const Statistics: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">
      {/* Subtle background pattern/gradient */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 60V0h60L0 60z'/%3E%3Cpath d='M60 60V0H0L60 60z'/%3E%3C/g%3E%3C/svg%3E")` }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800">Trusted by Thousands of Farmers and Buyers</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our growing agricultural marketplace is connecting farmers, sellers, and customers across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center
                         transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl
                         h-full" // Ensures equal card height
            >
              <div className="text-green-600 mb-4">
                <stat.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-5xl font-extrabold text-green-700 mb-2">
                {/* TODO: Implement react-countup for number animation if dependency is added */}
                {stat.value}
              </h3>
              <p className="text-xl font-semibold text-gray-800 mb-2">{stat.title}</p>
              <p className="text-gray-600 text-base flex-grow">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
