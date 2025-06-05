'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (

    <div className="md:hidden">
  
      <button 
        className="flex flex-col cursor-pointer gap-[4.5px] z-20 relative" 
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Închide meniul" : "Deschide meniul"}
        aria-expanded={isOpen} 
        aria-controls="mobile-menu-content" 
      >
        
        <div
          className={`w-6 h-1 bg-blue-300 rounded-sm transition-transform origin-left ease-out duration-500 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-1 bg-blue-300 rounded-sm transition-opacity ease-out duration-500 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-1 bg-blue-300 rounded-sm transition-transform origin-left ease-out duration-500 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></div>
      </button>
      <div
        id="mobile-menu-content" 
        className={`absolute left-0 top-0 w-full bg-white h-screen flex flex-col items-center justify-center gap-8 font-medium text-xl z-10 transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full' 
        }`}
      >
        <Link href="/" onClick={closeMenu} className="hover:text-blue-300 transition-colors">
          Acasă
        </Link>
        <Link href="/notification" onClick={closeMenu} className="hover:text-blue-300 transition-colors">
          Notificări
        </Link>
        <Link href="/components/LeftMenu" onClick={closeMenu} className="hover:text-blue-300 transition-colors">
          Activitate
        </Link>
        <Link href="/login" onClick={closeMenu} className="hover:text-blue-300 transition-colors">
          Autentificare
        </Link>
  
      </div>
    </div>
  );
}
