import React from "react";

interface ICardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: ICardProps) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

