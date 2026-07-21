import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default DashboardCard;
