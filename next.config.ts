/** @type {import('next').NextConfig} */
const nextConfig = {
  // Alte configurări pe care le-ai putea avea deja...
  // reactStrictMode: true, // Exemplu - adaugă dacă e necesar

  images: {
    dangerouslyAllowSVG: true, // Necesar pentru placeholder-e SVG (păstrat)
    remotePatterns: [
      // --- Domenii existente (păstrate) ---
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "media2.dev.to",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**', // Păstrat - pathname specific dacă e necesar
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**', // Păstrat
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**', // Păstrat
      },
      // Ai o intrare ciudată aici cu http:// în hostname, probabil o greșeală?
      // {
      //   protocol: 'https',
      //   hostname: 'img.youtube.com', // Verifică dacă acest hostname este corect
      //   port: '',
      //   pathname: '/vi/**',
      // },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**', // Păstrat
      },
      {
        protocol: 'https',
        hostname: 'dw71fyauz7yz9.cloudfront.net', // Păstrat
        pathname: '/**',
      },

      // --- NOU: Adăugat hostname pentru Cloudinary ---
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Lasă gol dacă nu e specificat un port
        pathname: '/**', // Permite orice cale (ex: /<cloud_name>/image/upload/...)
      },
       {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Lasă gol dacă nu e specificat un port
        pathname: '/**', // Permite orice cale de pe acel hostname
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc', // Adăugăm și pentru imaginile de avatar
        port: '',
        pathname: '/**',
      },
      // --- Sfârșit Adăugare Cloudinary ---
    ],
    // Adăugăm CSP ca măsură de securitate suplimentară pentru SVG (păstrat)
    // Atenție: Această politică este foarte restrictivă. S-ar putea să blocheze alte lucruri.
    // Poate vrei să o ajustezi sau să o elimini dacă nu e strict necesară.
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Alte configurări pe care le-ai putea avea...
};

// Folosim module.exports deoarece codul tău anterior folosea această sintaxă
module.exports = nextConfig;

