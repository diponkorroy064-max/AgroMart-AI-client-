'use client';

import React from 'react';
import DashboardNavbar, { DashboardNavbarProps } from './DashboardNavbar';

export interface TopbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topbar({ open, setOpen }: TopbarProps) {
  return (
    <DashboardNavbar
      sidebarOpen={open}
      onToggleSidebar={() => setOpen((prev) => !prev)}
    />
  );
}
