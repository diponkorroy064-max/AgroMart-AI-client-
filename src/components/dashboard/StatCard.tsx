import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:bg-green-50 dark:hover:bg-green-900 transition-colors duration-200">
      <div className="bg-green-100 dark:bg-green-700 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

