import { ImpactTimelineItem } from "@/data/about-data";

interface AboutTimelineItemProps {
  item: ImpactTimelineItem;
}

export function AboutTimelineItem({ item }: AboutTimelineItemProps) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-2xs hover:border-emerald-200 dark:hover:border-emerald-800/80 transition-all duration-200">
      <div className="w-16 h-16 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-extrabold text-base sm:text-lg flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900">
        {item.year}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}
