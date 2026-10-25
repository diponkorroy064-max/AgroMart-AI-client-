import { CheckCircle2, Lightbulb } from "lucide-react";

interface BlogKeyTakeawaysProps {
  takeaways?: string[];
}

export function BlogKeyTakeaways({ takeaways }: BlogKeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 sm:p-7 my-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white shrink-0 shadow-2xs">
          <Lightbulb className="w-4 h-4 text-emerald-100" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          মূল সারসংক্ষেপ ও গুরুত্বপূর্ণ বিষয়সমূহ
        </h3>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
        {takeaways.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
