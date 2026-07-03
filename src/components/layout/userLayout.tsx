import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const UserLayout: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down past 80px -> hide header
        setIsVisible(false);
      } else {
        // Scrolling up or at top -> show header
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className='flex flex-col'>
      <div
        className={`fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Header />
      </div>
      <main className='flex-1 mt-18 md:mt-38 bg-stone-50'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
