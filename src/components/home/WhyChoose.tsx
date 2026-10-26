import { whyChooseFeatures } from "@/data/home-data";

export default function WhyChoose() {
  return (
    <section className="py-6 md:py-8 lg:py-10 bg-white border-b border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2.5 border border-emerald-100">
            আমাদের বৈশিষ্ট্য
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            কেন অ্যাগ্রোমার্ট এআই বেছে নেবেন?
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            আধুনিক প্রযুক্তি ও আস্থার মেলবন্ধনে কৃষক ও ভোক্তার মধ্যে সরাসরি সংযোগ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {whyChooseFeatures.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-2xs hover:border-emerald-200 hover:shadow-xs transition flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
