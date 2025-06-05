

import React from 'react';
import Feeds from "../components/Feeds";       
import RightMenu from "../components/RightMenu"; 
import LeftMenu from "../components/LeftMenu";  

const MainAppLayout = () => {
  return (
   
    <>
      {/* Structura principală a paginii (ruta '/app') */}
      <div className="flex flex-col lg:flex-row gap-2 pt-6 container mx-auto px-2 sm:px-4">

        {/* Meniul din stânga */}
        <div className="hidden lg:block w-full lg:w-[20%] xl:w-[20%]">
         
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