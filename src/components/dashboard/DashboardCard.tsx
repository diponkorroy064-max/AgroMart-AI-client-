import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardCard({ title, children }: DashboardCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

