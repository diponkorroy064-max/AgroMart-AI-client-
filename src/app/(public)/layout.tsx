import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import React from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-full flex flex-col min-h-screen overflow-x-clip">
      <Navbar />
      <main className="grow w-full max-w-full overflow-x-clip">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
