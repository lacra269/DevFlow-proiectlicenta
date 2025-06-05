"use client"; 

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FiTag, FiArrowRight } from "react-icons/fi"; 
interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string; 
  link: string; 
  provider: string; 
  level: 'Începător' | 'Intermediar' | 'Avansat' | 'Toate Nivelurile'; 
  tags: string[]; 
  duration?: string; 
}

const coursesData: Course[] = [
  {
    id: 1,
    title: "Prezentare Neurelo Connect", 
    description: "Acces Securizat și în Timp Real la Date pentru AI Agentic",
    thumbnail: "/image/curs1.png", 
    link: "https://www.neurelo.com",
    provider: "Neurelo",
    level: "Intermediar", 
    tags: ["AI", "Date", "Securitate", "Timp-Real"], 
  },
  {
    id: 2,
    title: "Livrează mai rapid cu Postgres", 
    description: "Baza de date pe care o iubești, pe o platformă serverless concepută pentru a te ajuta să construiești aplicații fiabile mai rapid.", 
    thumbnail: "/image/curs5.png",
    link: "https://neon.tech",
    provider: "Neon",
    level: "Toate Nivelurile", 
    tags: ["Baze de Date", "PostgreSQL", "Serverless", "Scalabilitate"], 
  },
  {
    id: 3,
    title: "Curs de Securitate Cibernetică", 
    description:"Curs fundamental pentru pasionații de securitate cibernetică.", 
    thumbnail: "/image/curs3.png",
    link: "https://www.newtech.ro/cursuri/it-si-cyber-security/",
    provider: "Newtech",
    level: "Începător", 
    tags: ["Securitate", "Securitate Cibernetică", "IT"], 
    duration: "7 luni | 200 ore" 
  },
  {
    id: 4,
    title: "DE LA AI LA IOT, IATĂ .TECH", 
    description: "Domeniile .tech alimentează cele mai inovatoare startup-uri din lume.", 
    thumbnail: "/image/curs2.png",
    link: "https://get.tech/#search-section",
    provider: ".TECH Domains",
    level: "Toate Nivelurile", 
    tags: ["Domenii", "Startup-uri", "Branding", "Tehnologie"], 
  },
    { 
    id: 5,
    title: "Modele Avansate React", 
    description: "Explorare aprofundată a modelelor și tehnicilor avansate în React.", 
    thumbnail: "/image/curs6.png", 
    link: "https://react.dev", 
    provider: "Frontend Masters",
    level: "Avansat",
    tags: ["Frontend", "React", "JavaScript", "Modele"], 
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut"}
  }),
    hover: {
      scale: 1.04,
      boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.15)",
      y: -6,
      transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};


export default function CoursesPage() {
  const [allTags, setAllTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null); 
  useEffect(() => {
    const uniqueTags = new Set<string>();
    coursesData.forEach(course => {
      course.tags.forEach(tag => uniqueTags.add(tag));
    });
    setAllTags(['Toate', ...Array.from(uniqueTags).sort()]); 
  }, []);

  const filteredCourses = useMemo(() => {
    if (!activeTag || activeTag === 'Toate') { 
      return coursesData;
    }
    return coursesData.filter(course => course.tags.includes(activeTag));
  }, [activeTag]);
  const translateLevel = (level: 'Începător' | 'Intermediar' | 'Avansat' | 'Toate Nivelurile') => {
    return level;
  };

  return (
    <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">Cursuri & Promoții</h1> 
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-center">
        Explorează colecția noastră selectată de resurse pentru dezvoltare, concepută pentru a-ți îmbunătăți abilitățile și a te ajuta să fii la curent. 
      </p>

    
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === 'Toate' ? null : tag)} 
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              (activeTag === tag || (!activeTag && tag === 'Toate'))
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-indigo-100 border border-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course, index) => (
          <motion.a
            key={course.id}
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full group" 
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            custom={index}
          >
       
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={course.thumbnail}
                alt={course.title} 
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

         
            <div className="p-5 flex flex-col flex-grow">
          
                <div className="mb-2 flex justify-between items-center text-xs text-gray-500">
                    <span className={`font-semibold px-2 py-0.5 rounded-full ${
                        course.level === 'Începător' ? 'bg-green-100 text-green-700' :
                        course.level === 'Intermediar' ? 'bg-yellow-100 text-yellow-700' :
                        course.level === 'Avansat' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                        {translateLevel(course.level)} 
                    </span>
                    <span className="font-medium">{course.provider}</span>
                </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                {course.title}
              </h2>
           
              <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                {course.description}
                {course.duration && <span className="block text-xs mt-1 text-gray-500">({course.duration})</span>}
              </p>

           
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-gray-100">
                {course.tags.slice(0, 4).map(tag => ( 
                  <span key={tag} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
                {course.tags.length > 4 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                       + încă {course.tags.length - 4} 
                    </span>
                )}
              </div>

             
                <FiArrowRight className="absolute top-4 right-4 w-5 h-5 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.a>
        ))}

     
        {filteredCourses.length === 0 && activeTag && (
            <p className="col-span-full text-center text-gray-500 mt-10">
                Niciun curs găsit pentru tag-ul "{activeTag}". 
            </p>
        )}
      </div>
    </main>
  );
}
