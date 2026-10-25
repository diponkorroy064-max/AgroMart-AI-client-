import { TestimonialItem } from '@/data/home-data';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';


function RatingStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}


const TestimornialCard = ({ item }: { item: TestimonialItem }) => {
    return (
        <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-2xs transition hover:shadow-xs hover:border-emerald-100">
              {/* Header: Avatar, Name/Role and Rating in one compact row */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border border-emerald-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {item.role} <span className="text-gray-300">•</span> {item.location}
                    </p>
                  </div>
                </div>
                <RatingStars rating={item.rating} />
              </div>
        
              {/* Quote */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic grow">
                &ldquo;{item.text}&rdquo;
              </p>
            </div>
    );
};

export default TestimornialCard;
