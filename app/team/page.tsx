"use client";

import Image from "next/image";
import { motion } from "framer-motion"; 
import { FiZap, FiUsers, FiBriefcase, FiCode, FiLinkedin, FiGithub } from "react-icons/fi"; 
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeInOut" },
};

const viewport = { once: true, amount: 0.2 }; 

const features = [
  {
    icon: <FiBriefcase className="w-8 h-8 text-indigo-600" />,
    title: "Prezentare Proiecte", 
    description: "Afișează-ți munca cu detalii bogate, imagini și linkuri.", 
  },
  {
    icon: <FiZap className="w-8 h-8 text-indigo-600" />,
    title: "Instrumente de Monetizare", 
    description: "Unelte adaptate pentru freelanceri pentru a se conecta cu clienții.", 
  },
  {
    icon: <FiUsers className="w-8 h-8 text-indigo-600" />,
    title: "Hub Comunitar",
    description: "Conectează-te, colaborează și dezvoltă-te alături de alți pasionați IT.", 
  },
    {
    icon: <FiCode className="w-8 h-8 text-indigo-600" />, 
    title: "Stivă Tehnologică Modernă", 
    description: "Construit cu Next.js & Tailwind pentru o experiență rapidă și responsivă.", 
  },
];

export default function TeamPage() {
  return (
    <main className="p-6 md:p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Despre DevFlow 
      </motion.h1>

      <motion.div
        className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-16 overflow-hidden"
        initial="initial"
        whileInView="animate" 
        variants={fadeIn}
        viewport={viewport}
      >
        <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
          
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-6 lg:mb-0 flex-shrink-0"
            whileHover={{ scale: 1.05, rotate: 3 }}
          >
            <Image
              src="/image/logo.png" 
              alt="Logo DEVFLOW" 
              fill
              className="object-contain rounded-full" 
            />
          </motion.div>
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-indigo-700">Bun Venit la DevFlow</h2> 
            <p className="text-lg text-gray-600 mt-2 mb-4">Spațiul Tău pentru a Crea, Conecta și Crește</p> 
            <p className="text-gray-700 leading-relaxed">
              DevFlow este o platformă dinamică creată pentru pasionații IT, developeri și freelanceri. Oferim instrumentele de care ai nevoie pentru a-ți prezenta proiectele într-un mod atractiv, pentru a te conecta cu potențiali clienți sau colaboratori și pentru a-ți construi brandul personal în lumea tehnologiei. Fie că dorești să îți monetizezi abilitățile sau să găsești talente excepționale, DwvFlow este locul unde oportunitățile prind viață. 
            </p>
          </div>
        </div>
      </motion.div>

  
      <motion.div
        className="mb-16"
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
          viewport={viewport}
      >
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-10">Funcționalități & Tehnologii</h3> 
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center flex flex-col items-center"
              whileHover={{ y: -5 }} 
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Secțiunea Misiune - Prezentare diferită */}
        <motion.div
        className="max-w-3xl mx-auto text-center mb-16 bg-indigo-600 text-white p-8 rounded-xl shadow-lg"
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
          viewport={viewport}
      >
        <h3 className="text-3xl font-semibold mb-4">Misiunea Noastră</h3> 
  
        <blockquote className="text-xl italic border-l-4 border-indigo-300 pl-4">
        Să cultivăm un ecosistem vibrant unde developerii prosperă prin conectarea talentului cu oportunitatea, împuternicind creația și facilitând creșterea în cadrul comunității tehnologice. 
        </blockquote>
      </motion.div>

      {/* Secțiunea Creator */}
      <motion.div
          className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-10"
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
          viewport={viewport}
      >
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
        
          <motion.div
            className="relative w-40 h-40 md:w-48 md:h-48 mb-6 md:mb-0 flex-shrink-0"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={viewport}
          >
            <Image
              src="/image/profileteam.jpg" 
              alt="Bordeanu Lăcrămioara" 
              fill
              className="object-cover rounded-full shadow-lg border-4 border-indigo-300"
            />
          </motion.div>
          <div className="flex flex-col justify-center text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">Bordeanu Lăcrămioara</h2>
            <p className="text-md text-indigo-600 font-medium mt-1 mb-3">Creatoarea DevFlow | Studentă Anul III - Informatică Economică</p> 
            <p className="text-gray-700 leading-relaxed mb-4">
              Acest proiect reprezintă lucrarea mea de licență, născută din pasiunea pentru explorarea tehnologiilor web moderne și puterea lor de a construi experiențe digitale captivante. Cu DevFlow, am urmărit să creez o platformă practică ce reduce decalajul dintre profesioniștii IT talentați, freelanceri și companii, încurajând colaborarea și prezentarea eficientă a abilităților.
            </p>
           
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.linkedin.com/in/l%C4%83cr%C4%83mioara-bordeanu-a58527259/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition-colors" aria-label="Profil LinkedIn Lăcrămioara Bordeanu"> 
                <FiLinkedin size={24} />
              </a>
              <a href="https://github.com/lacra269" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition-colors" aria-label="Profil GitHub lacra269"> 
                <FiGithub size={24} />
              </a>
         
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
