'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import LandingNavbar from './LandingNavbar';
import AppNavbar from './Navbar';

export default function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLandingPage = pathname === '/';
  const showAppNavbar = !isLandingPage && !['/login', '/register'].includes(pathname || '');

  return (
    <>
      {/* Navbar pentru landing page */}
      {isLandingPage && <LandingNavbar />}

      {/* Navbar pentru restul paginilor */}
      {showAppNavbar && (
        <div className="container w-full bg-white md:px-8 lg:px-16 xl:px-24 2xl:px-56">
          <AppNavbar />
        </div>
      )}

      {/* Conținutul principal */}
      <div
        className={`
          ${!isLandingPage ? 'bg-slate-100' : ''}
          ${isLandingPage ? 'pt-16' : ''}
          px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-56
        `}
      >
        {children}
      </div>
    </>
  );
}
