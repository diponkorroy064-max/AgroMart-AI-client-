import React from "react";

interface ICardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<ICardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};
