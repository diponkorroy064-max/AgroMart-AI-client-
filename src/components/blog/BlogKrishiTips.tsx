import { QuickKrishiTip } from "@/types/blog";
import { Sparkles, PhoneCall } from "lucide-react";

interface BlogKrishiTipsProps {
  tips: QuickKrishiTip[];
}

export function BlogKrishiTips({ tips }: BlogKrishiTipsProps) {
  if (!tips || tips.length === 0) return null;

  return (
    <section aria-labelledby="krishi-tips-heading" className="bg-slate-50/70 rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold mb-1">
            <Sparkles className="w-3 h-3 text-emerald-700" />
            <span>জরুরি কৃষি টিপস</span>
          </div>
          <h2 id="krishi-tips-heading" className="text-lg sm:text-xl font-bold text-slate-900">
            এক নজরে প্রয়োজনীয় খামার পরামর্শ
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200/70 self-start sm:self-auto">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>ফ্রি খামার পরামর্শ: প্রতি শুক্রবার ৯টা-১২টা</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-xl p-4 border border-slate-200/70 hover:border-emerald-300 hover:shadow-2xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                  {tip.badge}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">{tip.category}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 leading-snug">
                {tip.title}
              </h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mt-1">
              {tip.summary}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
