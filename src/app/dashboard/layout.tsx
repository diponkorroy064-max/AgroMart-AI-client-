import React from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';

// Server-side rendered dashboard layout - Isolated from public main navbar and footer
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}

