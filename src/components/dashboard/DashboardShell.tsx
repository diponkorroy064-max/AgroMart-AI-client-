'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  // Desktop sidebar visibility (visible by default)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // Mobile drawer visibility (closed by default)
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle button handler for both desktop and mobile
  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileOpen((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50/60 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Sidebar for Desktop (Fixed Full-Height) & Mobile Drawer */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Dashboard Column with padding matching the fixed sidebar */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'lg:pl-64 xl:pl-72' : 'lg:pl-0'
        }`}
      >
        {/* Dedicated Dashboard Navbar with the single logo */}
        <DashboardNavbar
          sidebarOpen={sidebarOpen}
          mobileOpen={mobileOpen}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* Dashboard Main Content Area */}
        <main className="flex-1 p-3 sm:p-5 lg:p-7 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
