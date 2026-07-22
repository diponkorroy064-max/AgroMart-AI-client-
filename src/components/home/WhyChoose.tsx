import React from 'react';
import {
  Brain,
  ShieldCheck,
  LeafyGreen,
  CreditCard,
  Truck,
  LifeBuoy,
  LucideProps
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
}

const features: Feature[] = [
  {
    title: 'AI Product Recommendation',
    description: 'Personalized recommendations based on user interests.',
    icon: Brain,
  },
  {
    title: 'Trusted Sellers',
    description: 'Every seller is verified before joining the marketplace.',
    icon: ShieldCheck,
  },
  {
    title: 'Fresh Farm Products',
    description: 'Buy directly from farmers without unnecessary middlemen.',
    icon: LeafyGreen,
  },
  {
    title: 'Secure Payments',
    description: 'Safe and reliable payment experience.',
    icon: CreditCard,
  },
  {
    title: 'Fast Delivery',
    description: 'Quick delivery across the country.',
    icon: Truck,
  },
  {
    title: '24/7 Customer Support',
    description: 'Dedicated support whenever customers need help.',
    icon: LifeBuoy,
  },
];

const WhyChoose: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800">Why Choose AgroMart AI?</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            We connect farmers and buyers through a modern, secure, and AI-powered marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center
                         transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl
                         h-full" // Ensure equal card height
            >
              <div className="text-green-600 mb-4">
                <feature.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-base grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
