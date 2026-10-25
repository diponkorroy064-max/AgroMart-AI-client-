import { BlogContentSection } from "@/types/blog";
import { Lightbulb, AlertCircle } from "lucide-react";

interface BlogArticleBodyProps {
  sections: BlogContentSection[];
}

export function BlogArticleBody({ sections }: BlogArticleBodyProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-10 text-slate-800">
      {sections.map((section, idx) => (
        <section key={idx} className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 leading-snug">
            {section.sectionTitle}
          </h2>

          <div className="space-y-4">
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {p}
              </p>
            ))}
          </div>

          {section.bulletPoints && section.bulletPoints.length > 0 && (
            <ul className="space-y-2.5 my-4 pl-1">
              {section.bulletPoints.map((item, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {section.tipBox && (
            <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start gap-3 my-5">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
                {section.tipBox}
              </p>
            </div>
          )}

          {section.warningBox && (
            <div className="bg-rose-50/70 border-l-4 border-rose-500 p-4 rounded-r-xl flex items-start gap-3 my-5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-rose-900 font-medium leading-relaxed">
                {section.warningBox}
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
