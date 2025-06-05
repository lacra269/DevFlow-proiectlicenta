'use client';

import { useParams } from 'next/navigation'; 
import { useState, useEffect } from 'react'; 
import Image from 'next/image';
import { Eye, ThumbsUp, MessageCircle, Share2, Link as LinkIcon, Users, Hash, ExternalLink, Loader2 } from 'lucide-react';
const discussions = [
  {
    id: 1,
    title: "7 Cărți Tehnice Obligatorii pentru Developeri Experți și Lideri în 2025", 
    author: "Ana",
    authorAvatar: "https://placehold.co/40x40/E2D6FF/6B46C1?text=S", 
    postedOn: "2025-03-20T10:00:00Z", 
    views: 187,
    likes: 8,
    commentsCount: 6, 
    shares: 7,
    tags: ["carti", "inginerie-software", "devops", "programare"], 
    description: "Dacă ești în căutarea unor cărți tehnice interesante de citit în acest weekend, ai ajuns în locul potrivit. În această postare, voi împărtăși cele mai bune cărți tehnice pentru dezvoltatorii experimentați, pentru a învăța nu doar abilități tehnice, ci și abilități operaționale și de management într-un mod distractiv și ușor.", 
    disclosure: "Dezvăluire: Această postare include linkuri afiliate; pot primi compensații dacă achiziționați produse sau servicii de pe diferitele linkuri furnizate în acest articol.", 
    image: "https://media2.dev.to/dynamic/image/width=1280,height=640,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fgflqn2bwpluzkond5wpn.png", 
    relatedLinks: [
        { title: "Top 5 Tendințe DevOps în 2025", url: "#"}, 
        { title: "Gestionarea Eficientă a Datoriei Tehnice", url: "#"} 
    ]
  },
 {
    id: 2,
    title: "Nou Cadru Web: Gland - Arhitectură Bazată pe Evenimente",
    author: "Marian",
    authorAvatar: "https://placehold.co/40x40/A0C4FF/3B82F6?text=M",
    postedOn: "2025-03-20T11:30:00Z",
    views: 250,
    likes: 15,
    commentsCount: 12,
    shares: 3,
    tags: ["webdev", "arhitectura-evenimente", "framework", "programare", "javascript"], 
    description: "Salutare tuturor! Încă lucrez din greu la Gland și, după mult refactoring și cercetare și dezvoltare, sunt încântat să împărtășesc câteva dintre noile dezvoltări. Gland se apropie de sintaxa sa finală și am decis să-l fac complet bazat pe evenimente (EDS-based), inspirat de cadre precum NestJS și Angular.\n\nAceasta înseamnă:\n- Sistem DI: Similar cu NestJS, pentru injectarea ușoară a dependențelor.\n- Controller, Import, Export: La fel ca NestJS, dar cu o diferență—Canalele înlocuiesc providerii tradiționali.\n- Canale în loc de Provideri: Canalele gestionează logica, făcând aplicația mai modulară și scalabilă.\n- Pur și ușor: Construit de la zero cu dependențe minime, fără pachete inutile—totul este menținut suplu și eficient.\n\nDe ce EDS? (Sistem Bazat pe Evenimente)\nÎn loc să returneze date direct din controllere, totul în Gland este condus de evenimente. Acest lucru face aplicația mai modulară, scalabilă și flexibilă. Evenimentele declanșează acțiuni și răspunsuri, făcând întregul flux mai lin și mai intuitiv.",
    disclosure: null, 
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    relatedLinks: [
        { title: "Înțelegerea Sistemelor Bazate pe Evenimente", url: "#"}, 
        { title: "Documentația Oficială NestJS", url: "#"}, 
        { title: "Comparație între Cadrele Web Moderne", url: "#"} 
    ]
  },
  {
    id: 3,
    title: "Stăpânirea Tehnicilor CSS Moderne", 
    author: "Alex",
    authorAvatar: "https://placehold.co/40x40/B5EAD7/34D399?text=A",
    postedOn: "2025-04-22T15:00:00Z",
    views: 310,
    likes: 25,
    commentsCount: 18,
    shares: 5,
    tags: ["css", "frontend", "webdesign", "css-modern"], 
    description: "Pătrunde în profunzime în cele mai recente funcționalități CSS precum Grid, Flexbox, proprietăți personalizate și interogări de container. Această discuție explorează exemple practice și cele mai bune practici pentru construirea unor interfețe de utilizator responsive și frumoase cu CSS modern, depășind tehnicile învechite.", 
    disclosure: null,
    image: "https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    relatedLinks: [
        { title: "Ghid CSS Grid de la CSS-Tricks", url: "#"}, 
        { title: "Jocul Flexbox Froggy", url: "#"},
        { title: "Pot folosi... (Tabele de Suport pentru Browsere)", url: "https://caniuse.com/"} 
    ]
  }
];


const simulateAPI = {
    getDiscussion: async (id: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const discussion = discussions.find(disc => disc.id.toString() === id);
                if (discussion) {
                    resolve(discussion);
                } else {
                    reject(new Error('Discussion not found'));
                }
            }, 300); 
        });
    },
  
    likeDiscussion: async (id: string): Promise<{success: boolean}> => Promise.resolve({success: true}),
    shareDiscussion: async (id: string): Promise<{success: boolean}> => Promise.resolve({success: true}),
};
const DiscussionDetails = () => {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : undefined;

  const [discussion, setDiscussion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Discussion ID is missing.");
      setLoading(false);
      return;
    }

    const fetchDiscussion = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await simulateAPI.getDiscussion(id);
        setDiscussion(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load discussion.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussion();
  }, [id]);


  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('ro-RO', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    } catch (e) { return ''; }
  };


  const handleLike = async () => {
      if (!id) return;
     
      setLiked(!liked); 
      setDiscussion(prev => prev ? ({...prev, likes: liked ? prev.likes - 1 : prev.likes + 1}) : null);

  }
   const handleShare = async () => {
      if (!id) return;

      alert("Funcționalitate Share (de implementat)");
      setShared(true); 
    
  }

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
        </div>
    );
  }
  if (error) {
    return <p className="text-center text-red-600 mt-10 px-4">Eroare: {error}</p>;
  }
  if (!discussion) {
    return <p className="text-center text-gray-500 mt-10 px-4">{id ? 'Discuție negăsită.' : 'ID Discuție invalid.'}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        <div className="lg:col-span-2 space-y-6">
    
          <div className="aspect-video overflow-hidden rounded-xl shadow-lg border border-gray-100">
            <Image
              src={discussion.image}
              alt={discussion.title}
              width={1280}
              height={720}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <div className="space-y-2">
             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{discussion.title}</h1>
             <div className="flex items-center space-x-3 text-sm text-gray-500">
                <Image
                    src={discussion.authorAvatar || 'https://placehold.co/40x40/cccccc/ffffff?text=?'}
                    alt={discussion.author}
                    width={24}
                    height={24}
                    className="rounded-full"
                />
                <span className="font-medium text-gray-700">{discussion.author}</span>
                <span>·</span>
                <span>{formatDate(discussion.postedOn)}</span>
             </div>
          </div>

           {discussion.tags && discussion.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                  {discussion.tags.map((tag: string, index: number) => (
                      <span key={index} className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                          <Hash className="h-3 w-3 mr-1 opacity-60" />{tag}
                      </span>
                  ))}
              </div>
           )}

    
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
   
            <p className="whitespace-pre-wrap">{discussion.description}</p>
          </div>

          {discussion.disclosure && (
            <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-4">{discussion.disclosure}</p>
          )}

        </div>

        <div className="lg:col-span-1 space-y-6">

           {/* Card Acțiuni (Like, Share, etc.) */}
           <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 flex items-center justify-around">
               <button onClick={handleLike} className={`flex flex-col items-center space-y-1 transition-colors ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}>
                   <ThumbsUp className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
                   <span className="text-xs font-medium">{discussion.likes} Likes</span>
               </button>
               <div className="border-l h-8 border-gray-200"></div>
               
               <button onClick={handleShare} className={`flex flex-col items-center space-y-1 transition-colors ${shared ? 'text-green-500' : 'text-gray-500 hover:text-green-500'}`}>
                   <Share2 className="h-6 w-6" />
                   <span className="text-xs font-medium">Share</span>
               </button>
           </div>

           {/* Card Invitație Discord */}
           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg text-center">
      
                <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24"> 
                        <path d="M20.317 4.482c-1.287-.61-2.64-.95-4.048-.997-.028.008-.056.016-.084.024-.78.29-1.51.685-2.186 1.15-.01.007-.02.014-.03.02-.467-.315-.95-.603-1.445-.86-.017-.008-.034-.017-.052-.025-1.408.047-2.76.387-4.048.997C3.8 6.24 1.8 10.105 1.005 14.68c.76.66 1.595 1.22 2.49 1.658.01.005.02.01.03.015.394.18.806.336 1.23.467.01.003.02.006.03.008.56.16 1.14.28 1.74.36.017.002.034.004.05.006.87.11 1.76.16 2.66.16s1.79-.05 2.66-.16c.017-.002.033-.004.05-.006.6-.08 1.18-.2 1.74-.36.01-.002.02-.005.03-.008.424-.13.836-.287 1.23-.467.01-.005.02-.01.03-.015.895-.438 1.73-.998 2.49-1.658-.795-4.575-2.795-8.44-6.917-10.198zm-11.01 6.96c-.91 0-1.648.746-1.648 1.665s.737 1.665 1.648 1.665c.91 0 1.648-.746 1.648-1.665s-.737-1.665-1.648-1.665zm6.696 0c-.91 0-1.648.746-1.648 1.665s.737 1.665 1.648 1.665c.91 0 1.648-.746 1.648-1.665.001-1.665-.737-1.665-1.648-1.665z"/>
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Continuă Discuția!</h3>
                <p className="text-sm opacity-90 mb-4">Alătură-te comunității noastre pe Discord pentru a discuta mai mult despre acest subiect și alte teme interesante.</p>
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-indigo-600 py-2 px-5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                    Intră pe Discord
                </a>
           </div>

          {/* Linkuri Relevante */}
          {discussion.relatedLinks && discussion.relatedLinks.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Citește și</h3>
                <ul className="space-y-2">
                    {discussion.relatedLinks.map((link: { title: string; url: string }, index: number) => (
                        <li key={index} className="flex items-start">
                            <ExternalLink className="h-4 w-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-800 hover:underline text-sm transition-colors"
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DiscussionDetails;
