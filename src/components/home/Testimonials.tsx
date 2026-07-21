import React from 'react';
import { Star, Icon as LucideIcon } from 'lucide-react';

interface Testimonial {
  name: string;
  role: 'Farmer' | 'Buyer' | 'Seller';
  rating: number; // 1-5
  text: string;
  location: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Md. Ali Khan',
    role: 'Farmer',
    rating: 5,
    text: "AgroMart helped me reach more buyers than ever before. Selling my vegetables is now simple and profitable, increasing my income significantly.",
    location: 'Dhaka, Bangladesh',
    avatar: 'https://i.pravatar.cc/150?img=68', // Placeholder image
  },
  {
    name: 'Fatema Begum',
    role: 'Buyer',
    rating: 5,
    text: "The vegetables were fresh and exactly as described. Delivery was quick and the ordering process was incredibly easy and convenient.",
    location: 'Chittagong, Bangladesh',
    avatar: 'https://i.pravatar.cc/150?img=47', // Placeholder image
  },
  {
    name: 'Rahim Chowdhury',
    role: 'Seller',
    rating: 5,
    text: "I've expanded my agricultural business thanks to AgroMart. The dashboard is intuitive and efficient, making management a breeze.",
    location: 'Sylhet, Bangladesh',
    avatar: 'https://i.pravatar.cc/150?img=69', // Placeholder image
  },
  {
    name: 'Nusrat Jahan',
    role: 'Buyer',
    rating: 4,
    text: "Great selection of organic products! I appreciate the transparency about the farmers. Highly recommend for fresh produce.",
    location: 'Rajshahi, Bangladesh',
    avatar: 'https://i.pravatar.cc/150?img=26', // Placeholder image
  },
  {
    name: 'Ahmed Kabir',
    role: 'Farmer',
    rating: 5,
    text: "AgroMart provides a fantastic platform to sell my seasonal fruits directly to consumers. The support team is also very helpful.",
    location: 'Khulna, Bangladesh',
    avatar: 'https://i.pravatar.cc/150?img=70', // Placeholder image
  },
  {
    name: 'Zara Islam',
    role: 'Seller',
    rating: 4,
    text: "The marketplace features are robust, allowing me to manage my inventory and orders seamlessly. A great tool for any agricultural business.",
    location: 'Barisal, Bangladesh',
    avatar: 'https://i.pravatar.cc/150?img=33', // Placeholder image
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800">What Our Customers Say</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by farmers, sellers, and buyers across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between
                         transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl
                         group" // Group for hover effects on children if needed
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={`Avatar of ${testimonial.name}`}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-green-300"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-green-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>

              <p className="text-gray-700 text-base mb-4 flex-grow">
                &quot;{testimonial.text}&quot;
              </p>

              <p className="text-sm text-gray-500 text-right">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
