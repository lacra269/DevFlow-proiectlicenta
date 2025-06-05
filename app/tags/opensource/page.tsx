"use client"; // Necesită state pentru filtrare/sortare

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react'; // Importăm hook-uri
import { motion } from 'framer-motion';
import { FiThumbsUp, FiMessageCircle, FiFilter, FiCalendar, FiArrowDown, FiArrowUp } from 'react-icons/fi'; // Iconițe relevante

// --- Structura de Date Extinsă (adăugăm counts) ---
interface Post {
  id: string;
  type: 'articol' | 'discutie' | 'intrebare'; // Tradus
  title: string;
  description: string;
  link: string;
  author: {
      id: string;
      name: string;
      username: string;
      avatarUrl: string;
      profileUrl: string;
  };
  timestamp: Date;
  likesCount?: number; // Opțional
  commentsCount?: number; // Opțional
}

// --- Date Simulate (Traduse) ---
const initialPosts: Post[] = [ 
{
  id: 'post-1',
  type: 'articol', // Tradus
  title: 'Cum să Contribui la Open Source ca Începător', // Tradus
  description: 'Un ghid pas cu pas pentru nou-veniții care doresc să facă prima lor contribuție.', // Tradus
  link: '/posts/how-to-contribute-beginner',
  author: { id: 'user-1', name: 'Alice Wonderland', username: 'alice', avatarUrl: 'https://i.pravatar.cc/40?u=alice', profileUrl: '/users/alice'},
  timestamp: new Date('2025-04-23T10:30:00Z'),
  likesCount: 42, commentsCount: 15,
},
{
  id: 'post-2',
  type: 'discutie', // Tradus
  title: 'Beneficiile Software-ului Open Source pentru Companii', // Tradus
  description: 'Explorând de ce tot mai multe companii mari adoptă și contribuie la open source.', // Tradus
  link: '/posts/benefits-for-enterprises',
  author: { id: 'user-2', name: 'Bob Constructorul', username: 'bob', avatarUrl: 'https://i.pravatar.cc/40?u=bob', profileUrl: '/users/bob'}, // Nume tradus
  timestamp: new Date('2025-04-24T09:15:00Z'),
  likesCount: 25, commentsCount: 8,
},
{
  id: 'post-3',
  type: 'intrebare', // Tradus
  title: 'Care sunt cele mai bune licențe open source pentru un proiect nou?', // Tradus
  description: "Începi un proiect nou și nu ești sigur în privința licențierii? Haideți să discutăm avantajele și dezavantajele.", // Tradus
  link: '/posts/choosing-open-source-license',
  author: { id: 'user-3', name: 'Charlie Chaplin', username: 'charlie', avatarUrl: 'https://i.pravatar.cc/40?u=charlie', profileUrl: '/users/charlie'},
  timestamp: new Date('2025-04-24T15:05:00Z'), 
  likesCount: 18, commentsCount: 22,
},
{
  id: 'post-4',
  type: 'articol', // Tradus
  title: 'Înțelegerea Versionării Semantice (SemVer)', // Tradus
  description: 'De ce contează versionarea în open source și cum ajută SemVer la gestionarea dependențelor.', // Tradus
  link: '/posts/understanding-semver',
  author: { id: 'user-4', name: 'Diana Prince', username: 'diana', avatarUrl: 'https://i.pravatar.cc/40?u=diana', profileUrl: '/users/diana'},
  timestamp: new Date('2025-04-22T18:00:00Z'),
  likesCount: 55, commentsCount: 11,
},
];

// --- Funcție Helper pentru Timp Relativ ---
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) return `acum ${diffInSeconds}s`; // Tradus
  if (diffInMinutes < 60) return `acum ${diffInMinutes}m`; // Tradus
  if (diffInHours < 24) return `acum ${diffInHours}h`; // Tradus
  if (diffInDays === 1) return `Ieri`; // Tradus
  if (diffInDays < 7) return `acum ${diffInDays}z`; // Tradus (z pentru zile)
  // Pentru date mai vechi, afișăm data completă în format local românesc
  return date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Definire tipuri pentru filtrare și sortare
type FilterType = 'toate' | 'articol' | 'discutie' | 'intrebare'; // Tradus
type SortOrder = 'recente' | 'vechi'; // Tradus

// --- Componenta Paginii ---
export default function OpenSourcePage() {
const [posts, setPosts] = useState<Post[]>(initialPosts);
const [activeFilter, setActiveFilter] = useState<FilterType>('toate'); // Tradus
const [sortOrder, setSortOrder] = useState<SortOrder>('recente'); // Tradus

const displayedPosts = useMemo(() => {
  let filtered = posts;

  if (activeFilter !== 'toate') { // Tradus
    filtered = posts.filter(post => post.type === activeFilter);
  }

  return [...filtered].sort((a, b) => {
    if (sortOrder === 'recente') { // Tradus
      return b.timestamp.getTime() - a.timestamp.getTime();
    } else { // 'vechi'
      return a.timestamp.getTime() - b.timestamp.getTime();
    }
  });
}, [posts, activeFilter, sortOrder]);

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" }
    }),
    hover: {
        scale: 1.03,
        boxShadow: "0px 8px 25px -3px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 400, damping: 17 }
    }
};

// Funcție pentru a capitaliza și traduce etichetele filtrelor
const getFilterLabel = (filter: FilterType): string => {
  switch (filter) {
    case 'toate': return 'Toate';
    case 'articol': return 'Articole';
    case 'discutie': return 'Discuții';
    case 'intrebare': return 'Întrebări';
    default: return String(filter).charAt(0).toUpperCase() + String(filter).slice(1);
  }
};

return (
  <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">#OpenSource</h1> {/* Păstrat (hashtag) */}
    <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
      Explorează articole, discuții și întrebări despre open source din comunitate. {/* Tradus */}
    </p>

      {/* --- Controale Filtrare și Sortare --- */}
    <div className="mb-8 p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 max-w-3xl mx-auto">
      {/* Filtrare */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
        <span className="text-sm font-medium text-gray-600 mr-2"><FiFilter className="inline mr-1"/> Filtrează:</span> {/* Tradus */}
        {(['toate', 'articol', 'discutie', 'intrebare'] as FilterType[]).map(filter => ( // Tradus
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
            }`}
          >
            {getFilterLabel(filter)} {/* Folosește funcția pentru etichete traduse și capitalizate */}
          </button>
        ))}
      </div>
      {/* Sortare */}
      <div className="flex items-center space-x-2">
          <label htmlFor="sortOrder" className="text-sm font-medium text-gray-600"><FiCalendar className="inline mr-1"/> Sortează:</label> {/* Tradus */}
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="text-xs font-semibold bg-gray-100 border-none rounded-full px-3 py-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
          >
            <option value="recente">Cele mai Recente</option> {/* Tradus */}
            <option value="vechi">Cele mai Vechi</option> {/* Tradus */}
          </select>
     </div>
    </div>


    {/* Container pentru lista de postări */}
    <div className="space-y-6 max-w-3xl mx-auto">
      {displayedPosts.length > 0 ? (
          displayedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm overflow-hidden group"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index} 
            >
              {/* Header postare: Avatar, Nume Autor, Timp */}
              <div className="flex items-center space-x-3 mb-4">
                <Link href={post.author.profileUrl} className="flex-shrink-0">
                  <Image
                    src={post.author.avatarUrl}
                    alt={`Avatarul lui ${post.author.name}`} // Tradus
                    width={40} height={40}
                    className="rounded-full bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>
                <div className="text-sm">
                  <div>
                    <Link href={post.author.profileUrl} className="font-semibold text-gray-800 hover:underline">{post.author.name}</Link>
                    <span className="text-gray-500"> · @{post.author.username}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatRelativeTime(post.timestamp)}
                    {post.type !== 'articol' && ( // Păstrat 'articol' pentru comparație logică
                      <span className="ml-2 capitalize border border-gray-300 px-1.5 py-0.5 rounded-full text-xs bg-gray-50">
                        {getFilterLabel(post.type)} {/* Afișează tipul tradus */}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Conținutul principal al postării */}
              <div className="mb-4">
                <Link href={post.link} className="block group/link">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 group-hover/link:text-indigo-700 transition-colors duration-150 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </Link>
              </div>

              {/* Footer postare: Interacțiuni simulate */}
              <div className="pt-3 border-t border-gray-100 flex items-center space-x-5 text-sm text-gray-500">
                  <button className="flex items-center hover:text-indigo-600 transition-colors group/icon">
                    <FiThumbsUp className="w-4 h-4 mr-1 group-hover/icon:scale-110 transition-transform" />
                    <span>{post.likesCount ?? 0}</span>
                  </button>
                  <button className="flex items-center hover:text-indigo-600 transition-colors group/icon">
                    <FiMessageCircle className="w-4 h-4 mr-1 group-hover/icon:scale-110 transition-transform" />
                    <span>{post.commentsCount ?? 0}</span>
                  </button>
              </div>
            </motion.article>
          ))
      ) : (
          // Mesaj dacă nu sunt postări după filtrare
          <p className="text-center text-gray-500 py-10">
            Nicio postare găsită care să corespundă criteriilor tale pentru "{getFilterLabel(activeFilter)}". {/* Tradus */}
          </p>
      )}
    </div>
  </main>
);
}
