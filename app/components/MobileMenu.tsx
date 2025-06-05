'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Importă Link din Next.js pentru navigare

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Eliminăm useEffect-ul care închidea automat meniul

  // Funcție pentru a închide meniul (apelată la click pe link)
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    // Container principal vizibil doar pe ecrane mici (md:hidden)
    <div className="md:hidden">
      {/* Butonul Hamburger/X */}
      <button // Folosim button pentru accesibilitate
        className="flex flex-col cursor-pointer gap-[4.5px] z-20 relative" // Adăugăm z-index relativ
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Închide meniul" : "Deschide meniul"} // Label pentru accesibilitate
        aria-expanded={isOpen} // Indică starea meniului
        aria-controls="mobile-menu-content" // Leagă butonul de conținutul meniului
      >
        {/* Liniile butonului cu animație */}
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

      {/* Meniu dropdown */}
      {/* Adăugăm tranziție pentru apariție/dispariție */}
      <div
        id="mobile-menu-content" // ID pentru aria-controls
        className={`absolute left-0 top-0 w-full bg-white h-screen flex flex-col items-center justify-center gap-8 font-medium text-xl z-10 transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full' // Animație slide
        }`}
      >
        {/* Folosim Link pentru navigare și adăugăm onClick pentru a închide meniul */}
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
        {/* Poți adăuga mai multe link-uri aici */}
      </div>
    </div>
  );
}
