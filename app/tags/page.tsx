"use client"; 

import Link from "next/link";
import { useState, useMemo, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiHash, FiFileText } from "react-icons/fi"; 
interface Tag {
  name: string; 
  description: string;
  link: string; 
  postCount: number; 
}

const tagsData: Tag[] = [
  { name: "#OpenSource", description: "Fie ca Sursa să fie cu Tine!", link: "/tags/opensource", postCount: 125 }, 
  { name: "#React", description: "Pătrunde în React și învață cum să construiești UI-uri dinamice.", link: "/tags/react", postCount: 289 }, 
  { name: "#Next.js", description: "Stăpânește dezvoltarea web full-stack cu Next.js.", link: "/tags/nextjs", postCount: 153 }, 
  { name: "#Node.js", description: "Învață să construiești aplicații back-end scalabile.", link: "/tags/nodejs", postCount: 98 }, 
  { name: "#TailwindCSS", description: "Stăpânește CSS-ul utility-first cu Tailwind.", link: "/tags/tailwindcss", postCount: 76 }, 
  { name: "#TypeScript", description: "Îmbunătățește calitatea codului tău JavaScript.", link: "/tags/typescript", postCount: 112 }, 
  { name: "#Python", description: "Dezvoltare web, știința datelor și multe altele.", link: "/tags/python", postCount: 215 }, 
  { name: "#Vue", description: "Explorează fundamentele Vue.js.", link: "/tags/vue", postCount: 65 }, 
  { name: "#WebDev", description: "De la fundamentele front-end la logica back-end.", link: "/tags/webdev", postCount: 350 }, 
  { name: "#JavaScript", description: "Limbajul web-ului.", link: "/tags/javascript", postCount: 410 }, 
  { name: "#Database", description: "Stocarea și recuperarea eficientă a datelor.", link: "/tags/database", postCount: 88 }, 
  { name: "#Security", description: "Protejarea aplicațiilor și a datelor.", link: "/tags/security", postCount: 45 }, 
];


const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.3, ease: "easeOut" }
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 20px -2px rgba(0, 0, 0, 0.1)",
    y: -4,
    transition: { type: "spring", stiffness: 400, damping: 15 }
  }
};

export default function TagsPage() {
  const [searchTerm, setSearchTerm] = useState('');

 
  const filteredTags = useMemo(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    if (!lowerCaseSearch) {
      return tagsData; 
    }
    return tagsData.filter(tag =>
      tag.name.toLowerCase().includes(lowerCaseSearch) ||
      tag.description.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">Explorează Etichete</h1> 
      <p className="text-gray-600 mb-8 max-w-xl mx-auto text-center">
        Găsește subiectele care te interesează. Dă clic pe o etichetă pentru a explora conținutul aferent. 
      </p>

  
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <FiSearch />
          </span>
          <input
            type="search"
            placeholder="Caută etichete (ex: React, Securitate...)" 
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

    
      {filteredTags.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTags.map((tag, index) => (
            <motion.div
              key={tag.name}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              custom={index}
            >
              <Link
                href={tag.link}
                className="bg-gradient-to-br from-white to-gray-50 hover:from-white hover:to-white border border-gray-200 p-5 rounded-xl shadow-sm flex flex-col h-full group transition-shadow duration-200"
              >
             
                <h2 className="text-xl font-bold text-indigo-700 mb-2 flex items-center">
                  <FiHash className="mr-1 opacity-80"/>
                  {tag.name.replace('#','')} 
                </h2>
            
                <p className="text-sm text-gray-600 mb-3 flex-grow">
                  {tag.description}
                </p>
             
                <div className="mt-auto pt-2 border-t border-gray-100 text-xs text-gray-500 font-medium flex items-center">
                    <FiFileText className="mr-1.5"/>
                    <span>{tag.postCount} Postări</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
       
        <p className="text-center text-gray-500 mt-10">
          Nicio etichetă găsită care să corespundă cu "{searchTerm}". 
        </p>
      )}
    </main>
  );
}
