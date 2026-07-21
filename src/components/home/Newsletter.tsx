"use client";

import React, { useState } from 'react';
import { Mail, Leaf, Bell, BadgePercent, CheckCircle, Icon as LucideIcon } from 'lucide-react';

interface Benefit {
  text: string;
  icon: LucideIcon;
}

const benefits: Benefit[] = [
  { text: 'Weekly Farming Tips', icon: Leaf },
  { text: 'Exclusive Discounts', icon: BadgePercent },
  { text: 'New Product Alerts', icon: Bell },
];

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitted(false);

    if (!email) {
      setError('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail(''); // Clear email input after successful submission
  };

  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 text-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side: Content */}
            <div>
              <h2 className="text-4xl font-bold text-green-800 mb-4">Stay Updated with AgroMart</h2>
              <p className="text-lg text-gray-700 mb-8">
                Subscribe to receive the latest farming tips, market prices, agricultural news, discounts, and exclusive offers.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <benefit.icon className="text-green-600 mr-3" size={24} />
                    <p className="text-gray-700 text-lg">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Subscription Form */}
            <div className="bg-green-50 p-8 rounded-lg shadow-inner">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Join Our Newsletter</h3>

              {isSubmitted ? (
                <div className="text-center text-green-700 text-xl font-semibold flex flex-col items-center">
                  <CheckCircle size={48} className="mb-4" />
                  <p>Thank you for subscribing!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                      disabled={isSubmitting}
                      aria-label="Email Address"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md
                               hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
