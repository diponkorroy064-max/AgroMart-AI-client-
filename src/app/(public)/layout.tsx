import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import React from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {/* <header>Public Header</header> */}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
