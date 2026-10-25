import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardHeaderProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
}

export default function DashboardHeader({ title, breadcrumb }: DashboardHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link href={item.href} className="hover:text-green-600">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < breadcrumb.length - 1 && <ChevronRight className="w-4 h-4 mx-1" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

