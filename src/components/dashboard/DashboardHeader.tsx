import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb: BreadcrumbItem[];
  children?: React.ReactNode;
}

export default function DashboardHeader({ title, subtitle, breadcrumb, children }: DashboardHeaderProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link href={item.href} className="hover:text-green-600 transition-colors">
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
      {children && <div className="flex items-center gap-3 shrink-0">{children}</div>}
    </div>
  );
}

