// În fișierul: my-app/app/app/page.tsx

import React from 'react';
// Importă componentele necesare pentru layout
import Feeds from "../components/Feeds";       // Calea '../' este corectă
import RightMenu from "../components/RightMenu"; // Calea '../' este corectă
import LeftMenu from "../components/LeftMenu";   // Calea '../' este corectă

const MainAppLayout = () => {
  return (
    // Folosim un fragment React <>...</> pentru a grupa elementele
    <>
      {/* Structura principală a paginii (ruta '/app') */}
      <div className="flex flex-col lg:flex-row gap-2 pt-6 container mx-auto px-2 sm:px-4">

        {/* Meniul din stânga */}
        <div className="hidden lg:block w-full lg:w-[20%] xl:w-[20%]">
          {/* Poți schimba 'type' dacă e relevant pentru contextul '/app' */}
          <LeftMenu type="home" />
        </div>

        {/* Conținutul principal (Feed-ul) */}
        <div className="w-full lg:w-[60%] xl:w-[60%]">
          <Feeds />
        </div>

        {/* Meniul din dreapta */}
        <div className="hidden lg:block w-full lg:w-[20%] xl:w-[20%]">
          <RightMenu />
        </div>

      </div>
    </>
  );
};

export default MainAppLayout;