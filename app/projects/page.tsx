'use client'; 

import React, { useState, useMemo } from 'react';
import Image from 'next/image'; 
interface Project {
  id: string;
  title: string;
  description: string; 
  category: string;
  sellerName: string; 
  sellerEmail: string; 
  imageUrl: string | null; 
  price?: number;
  tags?: string[]; 
}

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Platformă E-learning Interactivă (React & Node.js)',
    description: 'Proiect de licență realizat la Facultatea de Informatică, Universitatea "Alexandru Ioan Cuza" din Iași. Platformă web completă pentru cursuri online, cu management utilizatori, progres și quiz-uri.',
    category: 'Dezvoltare Web Full-Stack',
    sellerName: 'Andrei Popescu',
    sellerEmail: 'andrei.popescu.dev@email.com',
    imageUrl: 'https://placehold.co/600x400/7e5bef/white?text=E-learning+Platform',
    price: 250,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Material UI', 'JWT'],
  },
  {
    id: '2',
    title: 'Aplicație Mobilă Gestionare Cheltuieli (React Native)',
    description: 'Aplicație cross-platform (iOS & Android) dezvoltată ca proiect de an la Facultatea de Automatică și Calculatoare, UTGA Iași. Permite urmărirea bugetului personal, cu grafice și categorisire.',
    category: 'Dezvoltare Mobilă',
    sellerName: 'Elena Vasiliu',
    sellerEmail: 'elena.vasiliu.rn@email.com',
    imageUrl: 'https://placehold.co/600x400/34d399/white?text=Mobile+Budget+App',
    price: 180,
    tags: ['React Native', 'Expo', 'JavaScript', 'Firebase', 'Charts'],
  },
  {
    id: '3',
    title: 'Sistem de Recomandare Filme (Python & ML)',
    description: 'Proiect de disertație de la Facultatea de Matematică și Informatică, Universitatea din București. Implementează filtrare colaborativă și bazată pe conținut folosind dataset MovieLens.',
    category: 'Inteligență Artificială & Machine Learning',
    sellerName: 'Mihai Georgescu',
    sellerEmail: 'mihai.g.ml@email.com',
    imageUrl: 'https://placehold.co/600x400/fbbf24/black?text=Movie+Recommender',
    price: 300,
    tags: ['Python', 'Pandas', 'Scikit-learn', 'Machine Learning', 'Flask'],
  },
   {
    id: '4',
    title: 'Dashboard Administrare Magazin Online (Vue.js & Firebase)',
    description: 'Interfață de administrare (panou de control) pentru un magazin online, permițând gestionarea produselor, comenzilor și clienților. Proiect personal.',
    category: 'Dezvoltare Web Frontend',
    sellerName: 'Cristina Ionescu',
    sellerEmail: 'cristina.ionescu.vue@email.com',
    imageUrl: 'https://placehold.co/600x400/60a5fa/white?text=Admin+Dashboard',
    price: 120,
    tags: ['Vue.js', 'Vuex', 'Firebase', 'TailwindCSS', 'Frontend'],
  },
  {
    id: '5',
    title: 'API RESTful pentru Blog (Java Spring Boot)',
    description: 'Backend solid pentru o aplicație de blogging, realizat pentru materia "Tehnologii Java" la Facultatea de Cibernetică, Statistică și Informatică Economică, ASE București. Include CRUD și securitate.',
    category: 'Dezvoltare Web Backend',
    sellerName: 'Alexandru David',
    sellerEmail: 'alex.david.java@email.com',
    imageUrl: 'https://placehold.co/600x400/f87171/white?text=Blog+API+(Java)',
    price: 200,
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JPA', 'PostgreSQL', 'REST API'],
  },
  {
    id: '6',
    title: 'Vizualizare Date COVID-19 (Python Dash)',
    description: 'Aplicație web interactivă pentru vizualizarea datelor globale și locale despre pandemia COVID-19, folosind grafice Plotly. Proiect independent.',
    category: 'Data Science & Vizualizare',
    sellerName: 'Ioana Marin',
    sellerEmail: 'ioana.marin.data@email.com',
    imageUrl: 'https://placehold.co/600x400/a78bfa/white?text=COVID+Data+Viz',
    price: 90,
    tags: ['Python', 'Dash', 'Plotly', 'Pandas', 'Data Visualization'],
  },
  {
    id: '7',
    title: 'Joc 2D Platformer Simplu (Unity & C#)',
    description: 'Proiect introductiv în dezvoltarea de jocuri realizat în cadrul cursului "Dezvoltare Jocuri" la Universitatea Politehnica Timișoara. Include mișcare, colectare iteme, inamici.',
    category: 'Dezvoltare Jocuri',
    sellerName: 'Radu Stan',
    sellerEmail: 'radu.stan.unity@email.com',
    imageUrl: 'https://placehold.co/600x400/f472b6/white?text=2D+Platformer+Game',
    price: 110,
    tags: ['Unity', 'C#', 'Game Development', '2D'],
  },
  {
    id: '8',
    title: 'Automatizare Testare Web UI (Selenium & Python)',
    description: 'Scripturi de testare automată pentru interfața unui site web complex, verificând funcționalități cheie. Proiect de practică.',
    category: 'Testare Software & QA',
    sellerName: 'Diana Preda',
    sellerEmail: 'diana.preda.qa@email.com',
    imageUrl: 'https://placehold.co/600x400/2dd4bf/black?text=UI+Automation',
    price: 130,
    tags: ['Python', 'Selenium', 'PyTest', 'Web Testing', 'QA'],
  },
  {
    id: '9',
    title: 'Aplicație Chat în Timp Real (Node.js & Socket.IO)',
    description: 'Aplicație web simplă care permite comunicarea în timp real între utilizatori, folosind WebSockets. Dezvoltată pentru materia "Rețele de Calculatoare" la Inginerie Electrică și Știința Calculatoarelor, USV.',
    category: 'Dezvoltare Web Full-Stack',
    sellerName: 'Vlad Oprea',
    sellerEmail: 'vlad.oprea.node@email.com',
    imageUrl: 'https://placehold.co/600x400/84cc16/black?text=Real-time+Chat',
    price: 160,
    tags: ['Node.js', 'Socket.IO', 'Express', 'JavaScript', 'Real-time'],
  },
  {
    id: '10',
    title: 'Extensie Chrome pentru Productivitate',
    description: 'O extensie de browser care blochează site-uri specificate în anumite intervale orare pentru a crește concentrarea. Proiect personal util.',
    category: 'Dezvoltare Extensii Browser',
    sellerName: 'Laura Munteanu',
    sellerEmail: 'laura.munteanu.chrome@email.com',
    imageUrl: 'https://placehold.co/600x400/fb923c/white?text=Chrome+Extension',
    price: 70,
    tags: ['JavaScript', 'HTML', 'CSS', 'Chrome API', 'Browser Extension'],
  },
];

interface ProjectCardProps {
  project: Project; 
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, category, sellerName, sellerEmail, imageUrl, price, tags } = project;
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const mailtoLink = `mailto:${sellerEmail}?subject=Interes%20pentru%20proiectul%20"${encodeURIComponent(title)}"&body=Bună%20${encodeURIComponent(sellerName)},%0D%0A%0D%0ASunt%20interesat(ă)%20de%20proiectul%20tău%20"${encodeURIComponent(title)}"%20listat%20pe%20marketplace.%0D%0A%0D%0APoți%20să-mi%20oferi%20mai%20multe%20detalii%3F%0D%0A%0D%0AMulțumesc,`;
    window.location.href = mailtoLink;
  };

  const placeholderImg = 'https://placehold.co/600x400/f3f4f6/9ca3af?text=Imagine+Lipsa';

  return (
   
    <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden bg-white flex flex-col group h-full">
      {/* Secțiunea pentru imagine */}
      <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
        <Image
          src={imageUrl || placeholderImg}
          alt={`Imagine reprezentativă pentru proiectul ${title}`}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 ease-in-out group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImg;
            (e.target as HTMLImageElement).srcset = "";
          }}
          priority={false}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

     
      <div className="p-5 flex flex-col flex-grow">
     
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold mb-2 px-3 py-1 rounded-full self-start">
          {category}
        </span>
      
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{title}</h3> 

     
        <p className="text-gray-700 text-sm mb-4 flex-grow">
          {description.length > 150 ? `${description.substring(0, 150)}...` : description} 
        </p>

        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

       
        <div className="mt-auto pt-4 border-t border-gray-200">
           {/* Vânzător */}
           <p className="text-sm text-gray-600 mb-2">
             Vândut de: <span className="font-medium text-gray-800">{sellerName}</span>
           </p>
           <div className="flex justify-between items-center">
              {/* Preț */}
              {price !== undefined ? (
                <span className="text-xl font-bold text-indigo-700">{price} RON</span>
              ) : (
                <span className="text-sm text-gray-500 italic">Preț la cerere</span>
              )}
              {/* Buton Contact */}
              <a
                href={`mailto:${sellerEmail}?subject=Interes%20pentru%20proiectul%20"${encodeURIComponent(title)}"`}
                onClick={handleContactClick}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out"
              >
                Contactează
              </a>
           </div>
        </div>
      </div>
    </div>
  );
};
export default function ProjectsMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = useMemo(() => {
    const uniqueCategories = new Set(sampleProjects.map(p => p.category));
    return ['Toate Categoriile', ...Array.from(uniqueCategories).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    return sampleProjects.filter(project => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
                            project.title.toLowerCase().includes(lowerSearchTerm) ||
                            project.description.toLowerCase().includes(lowerSearchTerm) || 
                            project.sellerName.toLowerCase().includes(lowerSearchTerm) ||
                            project.tags?.some(tag => tag.toLowerCase().includes(lowerSearchTerm));

      const matchesCategory = !selectedCategory || selectedCategory === 'Toate Categoriile' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return (
   
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans">
   
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
         Proiecte IT Studențești/Online
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explorează proiecte de licență, disertație sau personale din domeniul IT. Găsește inspirație sau contactează autorii.
        </p>
      </header>

      <aside className="mb-8 md:mb-10 p-4 md:p-6 bg-white rounded-lg shadow border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
       
          <div className="flex-grow">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Caută (titlu, descriere, tag, vânzător)
            </label>
            <input
              type="search"
              id="search"
              placeholder="Ex: React, Java, Andrei Popescu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            />
          </div>
       
          <div className="flex-shrink-0 w-full md:w-auto">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrează după categorie
            </label>
            <select
              id="category"
              value={selectedCategory ?? 'Toate Categoriile'}
              onChange={(e) => setSelectedCategory(e.target.value === 'Toate Categoriile' ? null : e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out cursor-pointer"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
      
          {(searchTerm || selectedCategory) && (
             <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out whitespace-nowrap"
                aria-label="Resetează filtrele"
             >
                Resetează Filtre
             </button>
           )}
        </div>
      </aside>

 
      <main>
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
    
          <div className="text-center py-16 px-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2H4a2 2 0 01-2-2zm4-12v4h10V5M5 7v10h14V7H5z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Niciun proiect găsit</h3>
            <p className="mt-1 text-sm text-gray-500">
              Încearcă să ajustezi termenii de căutare sau filtrele de categorie.
            </p>
            <div className="mt-6">
               <button
                  onClick={resetFilters}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Resetează Filtrele
                </button>
            </div>
          </div>
        )}
      </main>
      <footer className="text-center mt-12 md:mt-16 py-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Marketplace Proiecte IT. Creat cu Next.js și Tailwind CSS.
          </p>
      </footer>
    </div>
  );
}
