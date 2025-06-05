// În fișierul: my-app/app/page.tsx

import React from 'react';
// Importă DOAR componenta Hero Section
import HeroSectionHackVectorLight from './components/HeroSectionHackVectorLight'; // Calea './' este corectă

const LandingPage = () => {
  return (
    // Afișează doar Hero Section pe pagina principală (ruta '/')
    <HeroSectionHackVectorLight />
  );
};

export default LandingPage;