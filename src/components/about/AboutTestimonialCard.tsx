import { Star } from "lucide-react";
import { AboutTestimonial } from "@/data/about-data";

interface AboutTestimonialCardProps {
  testimonial: AboutTestimonial;
}

export function AboutTestimonialCard({
  testimonial,
}: AboutTestimonialCardProps) {
  const initial = testimonial.name.trim().charAt(0);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800/80 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 font-bold flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
            {initial}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
              {testimonial.name}
            </h3>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed italic">
          &ldquo;{testimonial.review}&rdquo;
        </p>
      </div>
    </div>
  );
}
