
'use client'; 

import React, { useState, useMemo } from 'react';
import Image from 'next/image';

interface Developer {
  id: string;
  name: string;
  headline: string; 
  bio: string; 
  avatarUrl: string | null; 
  skills: string[]; 
  githubUrl: string; 
  linkedinUrl?: string; 
  email: string; 
  location?: string;
  hourlyRate?: number; 
}

const sampleDevelopers: Developer[] = [
  {
    id: 'dev1',
    name: 'Alexandra Munteanu',
    headline: 'Frontend Developer Specialist | React & Next.js',
    bio: 'Dezvoltatoare Frontend pasionată, cu experiență în crearea de interfețe utilizator moderne, rapide și accesibile. Expertiză în ecosistemul React, Next.js și Tailwind CSS. Contribui activ la proiecte open-source.',
    avatarUrl: 'https://placehold.co/150x150/a78bfa/white?text=AM',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3', 'UI/UX Design'],
    githubUrl: 'https://github.com/alexandra-munteanu-example', 
    linkedinUrl: 'https://linkedin.com/in/alexandra-munteanu-example', 
    email: 'alexandra.m.dev@email.com',
    location: 'Cluj-Napoca, Romania',
    hourlyRate: 40, 
  },
  {
    id: 'dev2',
    name: 'Bogdan Ionescu',
    headline: 'Full-Stack Engineer | Python (Django/Flask) & Cloud',
    bio: 'Inginer software cu experiență în dezvoltarea de aplicații web complexe end-to-end. Specializat în Python (Django, Flask), baze de date (PostgreSQL) și infrastructură cloud (AWS). Caut proiecte provocatoare.',
    avatarUrl: 'https://placehold.co/150x150/60a5fa/white?text=BI', 
    skills: ['Python', 'Django', 'Flask', 'PostgreSQL', 'AWS', 'Docker', 'REST API', 'JavaScript'],
    githubUrl: 'https://github.com/bogdan-ionescu-example',
    email: 'bogdan.ionescu.py@email.com',
    location: 'Remote',
  },
  {
    id: 'dev3',
    name: 'Cristian Popa',
    headline: 'Mobile Developer | Android (Kotlin) & iOS (Swift)',
    bio: 'Dezvoltator de aplicații mobile native pentru Android și iOS. Experiență solidă în Kotlin, Java, Swift și SwiftUI. Am publicat aplicații în Google Play și App Store. Focus pe performanță și experiența utilizatorului.',
    avatarUrl: 'https://placehold.co/150x150/34d399/white?text=CP', 
    skills: ['Kotlin', 'Android SDK', 'Java', 'Swift', 'SwiftUI', 'iOS SDK', 'Firebase', 'MVVM', 'MVC'],
    githubUrl: 'https://github.com/cristian-popa-example',
    linkedinUrl: 'https://linkedin.com/in/cristian-popa-example',
    email: 'cristian.popa.mobile@email.com',
    location: 'Timișoara, Romania',
    hourlyRate: 45,
  },
  {
    id: 'dev4',
    name: 'Diana Florescu',
    headline: 'Data Scientist & ML Engineer | Python & TensorFlow',
    bio: 'Expertă în analiza datelor și construirea modelelor de machine learning. Experiență cu Python (Pandas, NumPy, Scikit-learn), TensorFlow și Keras. Abilități de vizualizare a datelor și comunicare a rezultatelor.',
    avatarUrl: 'https://placehold.co/150x150/f472b6/white?text=DF', 
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'Data Visualization'],
    githubUrl: 'https://github.com/diana-florescu-example',
    email: 'diana.f.datasci@email.com',
    location: 'Remote',
  },
];

interface DeveloperCardProps {
  developer: Developer;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => {
  const { name, headline, bio, avatarUrl, skills, githubUrl, linkedinUrl, email, location, hourlyRate } = developer;
  const placeholderAvatar = `https://placehold.co/150x150/e5e7eb/4b5563?text=${name.substring(0, 2).toUpperCase()}`; 

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col md:flex-row items-start p-6 gap-6">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Image
          src={avatarUrl || placeholderAvatar}
          alt={`Avatar pentru ${name}`}
          width={100} 
          height={100}
          className="rounded-full border-4 border-indigo-100 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderAvatar;
          }}
        />
      </div>

      {/* Detalii Developer */}
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-indigo-600 font-medium mb-3">{headline}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {location && (
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </span>
          )}
          {hourlyRate && (
            <span className="flex items-center gap-1">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
              {hourlyRate} EUR/oră (aprox.)
            </span>
          )}
        </div>

        <p className="text-gray-700 text-sm mb-5">{bio}</p>
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Abilități principale:</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="text-xs bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Link-uri Externe și Contact */}
        <div className="flex flex-wrap gap-3 items-center">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            title={`Vezi profilul GitHub al lui ${name}`}
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
             </svg>
            GitHub
          </a>
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-blue-700 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              title={`Vezi profilul LinkedIn al lui ${name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.377 0-1.964.72-2.298 1.333h.03v-1.17H8.943v7.225z"/>
              </svg>
              LinkedIn
            </a>
          )}
          <a
            href={`mailto:${email}?subject=Oportunitate%20de%20colaborare%20pentru%20${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            title={`Contactează pe ${name} prin email`}
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
             </svg>
            Contactează
          </a>
        </div>
      </div>
    </div>
  );
};

export default function DevelopersShowcasePage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    sampleDevelopers.forEach(dev => dev.skills.forEach(skill => skillSet.add(skill)));
    return ['Toate Abilitățile', ...Array.from(skillSet).sort()];
  }, []);

  const filteredDevelopers = useMemo(() => {
    if (!selectedSkill || selectedSkill === 'Toate Abilitățile') {
      return sampleDevelopers;
    }
    return sampleDevelopers.filter(dev => dev.skills.includes(selectedSkill));
  }, [selectedSkill]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-indigo-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
    
        <header className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Găsește Experți IT
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conectează-te cu developeri talentați gata să contribuie la proiectul tău. Explorează profiluri și contactează-i direct.
          </p>
        </header>

        {/* Filtru Abilități */}
        <aside className="mb-8 md:mb-10 flex justify-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-lg shadow border border-gray-200">
             <label htmlFor="skill-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
               Filtrează după abilitate:
             </label>
             <select
                id="skill-filter"
                value={selectedSkill ?? 'Toate Abilitățile'}
                onChange={(e) => setSelectedSkill(e.target.value === 'Toate Abilitățile' ? null : e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out cursor-pointer"
              >
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
               {selectedSkill && selectedSkill !== 'Toate Abilitățile' && (
                 <button
                    onClick={() => setSelectedSkill(null)}
                    className="px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition duration-150 ease-in-out whitespace-nowrap"
                    aria-label="Resetează filtrul de abilitate"
                 >
                    Resetează
                 </button>
               )}
          </div>
        </aside>

     
        <main>
          {filteredDevelopers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:gap-10">
              {filteredDevelopers.map((developer) => (
                <DeveloperCard key={developer.id} developer={developer} />
              ))}
            </div>
          ) : (
          
            <div className="text-center py-16 px-4 bg-white rounded-lg shadow border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Niciun developer găsit</h3>
              <p className="mt-1 text-sm text-gray-500">
                Nu am găsit developeri cu abilitatea selectată. Încearcă o altă abilitate sau resetează filtrul.
              </p>
              <div className="mt-6">
                 <button
                    onClick={() => setSelectedSkill(null)}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Vezi toți developerii
                  </button>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-indigo-200">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Platforma Developeri. Toate drepturile rezervate.
          </p>
        </footer>
      </div>
    </div>
  );
}
