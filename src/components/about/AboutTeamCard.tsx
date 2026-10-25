import { TeamMember } from "@/data/about-data";

interface AboutTeamCardProps {
  member: TeamMember;
}

export function AboutTeamCard({ member }: AboutTeamCardProps) {
  const initial = member.name.trim().charAt(0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xs border border-gray-100 dark:border-gray-700/80 text-center hover:border-emerald-200 dark:hover:border-emerald-800/80 hover:shadow-sm transition-all duration-200">
      <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-700 dark:text-emerald-300 font-bold text-2xl shadow-2xs">
        {initial}
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
        {member.name}
      </h3>
      <p className="text-emerald-600 dark:text-emerald-400 font-medium text-xs sm:text-sm mt-1">
        {member.role}
      </p>
    </div>
  );
}
