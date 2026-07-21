import React from 'react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}


const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="bg-green-600 hover:bg-green-700">
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
