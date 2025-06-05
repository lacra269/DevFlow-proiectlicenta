'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Am scos LogIn, deoarece nu mai este folosit

const LandingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Link-urile de navigație principale
  const navLinks = [
    { href: '/#features', label: 'Caută proiecte noi' },
    { href: '/blog', label: 'Blog' },
    { href: '/freelancers', label: 'Freelanceri' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    // Navbar-ul principal, fixat și pe toată lățimea
    <div className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      {/* Containerul intern al navbar-ului. Am eliminat 'container', 'mx-auto', 'max-w-6xl' */}
      {/* Am păstrat padding-ul orizontal (px-4 etc.) pentru conținutul din navbar */}
      <div className="w-full h-full flex items-center justify-between px-4 md:px-6 lg:px-8 gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-1 hover:opacity-90 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)} // Închide meniul mobil la click pe logo
          >
            DevFlow
          </Link>
        </div>

        {/* Navigație desktop */}
        <div className="hidden lg:flex flex-grow justify-center items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Butoanele desktop pentru Autentificare/Înregistrare au fost eliminate */}
        {/* Acest div este păstrat pentru alinierea corectă cu flex-grow, dar este gol */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Aici erau butoanele de Autentificare și Înregistrare */}
        </div>

        {/* Buton meniu mobil */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-md"
            aria-label="Comută meniul"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Meniu mobil */}
      <div
        className={`
          lg:hidden absolute top-full left-0 w-full bg-white 
          border-t border-gray-100 shadow-lg 
          transition-all duration-300 ease-in-out overflow-hidden
          ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-3' : 'max-h-0 opacity-0 py-0'}
        `}
      >
        {/* Link-uri navigație mobilă */}
        <div className="px-4 pb-3 space-y-2"> {/* Padding-ul intern al meniului mobil este păstrat */}
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={toggleMobileMenu} // Închide meniul la click pe un link
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Butoanele mobile au fost eliminate anterior */}
      </div>
    </div>
  );
};

export default LandingNavbar;