'use client'
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import React, { useState } from 'react';


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar/>
      <div className="container mx-auto flex bg-gray-100 dark:bg-gray-900">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar open={open} setOpen={setOpen}/>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800 p-6">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

