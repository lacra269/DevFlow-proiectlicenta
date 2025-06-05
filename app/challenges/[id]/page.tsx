'use client';

import { useParams } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import Image from 'next/image'; 
import { Users, Trophy, Link as LinkIcon, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

// --- API simulată (neschimbată) ---
const simulateAPI = {
  getChallenge: async (id: string): Promise<any> => { 
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const challenges = [
          {
            id: 1,
            title: "Proaspăt Lansat 🚀", 
            description: "Provocarea Alibaba Cloud Web Game. Trimite-ți înscrierile devreme!", 
            image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ftdu7wtkzz67tqpzexnv1.png",
            prize: "Discount here", 
            details: "Participă la provocare și trimite-ți proiectul devreme pentru o șansă de a câștiga premii grozave. Învață noi abilități în timp ce interacționezi cu o comunitate de dezvoltatori din întreaga lume.", 
            participants: 50,
            maxParticipants: 100,
            tags: ["DezvoltareJocuri", "Cloud", "Alibaba Cloud"], 
            resources: [
              { title: "Documentație Vercel Blob", url: "#" }, 
              { title: "Bazele Dezvoltării Jocurilor", url: "#" } 
            ]
          },
          {
            id: 2,
            title: "Provocare React", 
            description: "Construiește o mică aplicație folosind React.js.", 
            image: "https://media2.dev.to/dynamic/image/width=880%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fi7uzu7m51rl9yhs2yryr.png",
            prize: "Discount curs React", 
            details: "Participă la această provocare React.js și construiește o aplicație mică, dar funcțională. Demonstrează-ți abilitățile și câștigă recunoaștere din partea colegilor.", 
            participants: 25,
            maxParticipants: 50,
            tags: ["React", "Frontend", "JavaScript"], 
            resources: [
              { title: "Documentație React", url: "https://react.dev/" }, 
              { title: "Ghid Tailwind CSS", url: "#" } 
            ]
          },
          {
            id: 3,
            title: "Încearcă CSS", 
            description: "Stăpânește arta CSS cu această provocare.", 
            image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F9bh07jet1zpfwf7m3ll0.jpg",
            prize: "Discount cursul complet CSS", 
            details: "Provoacă-te să stăpânești CSS participând la această provocare distractivă. Îmbunătățește-ți abilitățile de stilizare și câștigă premii.", 
            participants: 75,
            maxParticipants: 100,
            tags: ["CSS", "Frontend", "Design"], 
            resources: [
              { title: "Referință MDN CSS", url: "#" }, 
              { title: "CSS Tricks", url: "#" } 
            ]
          }            
        ];
        
        const challenge = challenges.find(ch => ch.id.toString() === id);
        if (challenge) {
          resolve(challenge);
        } else {
          reject(new Error('Challenge not found'));
        }
      }, 300);
    });
  },
  joinChallenge: async (id: string): Promise<{ success: boolean; message: string }> => { 
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Successfully joined the challenge!' });
      }, 300);
    });
  },
  getLeaderboard: async (id: string): Promise<any[]> => { 
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve([
                  { rank: 1, name: "Alice", score: 950, avatar: "https://placehold.co/32x32/E2D6FF/6B46C1?text=A" },
                  { rank: 2, name: "Bob", score: 920, avatar: "https://placehold.co/32x32/A0C4FF/3B82F6?text=B" },
                  { rank: 3, name: "Charlie", score: 880, avatar: "https://placehold.co/32x32/B5EAD7/34D399?text=C" },
              ]);
          }, 400);
      });
  }
};
// --- Sfârșit API simulată ---

// Componenta ChallengeDetails
const ChallengeDetails = () => {
  const params = useParams();

  const id = typeof params?.id === 'string' ? params.id : undefined;

  const [challenge, setChallenge] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);

  // Simulare stare autentificare
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Fetch challenge details and leaderboard
  useEffect(() => {
    
    if (!id) {
        setError("Challenge ID lipsește sau este invalid.");
        setLoading(false);
        console.warn("Challenge ID is missing or invalid:", params?.id);
        return;
    };

    const fetchChallengeData = async () => {
      setLoading(true);
      setError(null);
      console.log(`Fetching data for challenge ID: ${id}`); 
      try {
        const [challengeData, leaderboardData] = await Promise.all([
          simulateAPI.getChallenge(id),
          simulateAPI.getLeaderboard(id)
        ]);
        console.log("Challenge data received:", challengeData); 
        setChallenge(challengeData);
        setLeaderboard(leaderboardData);
      } catch (err: any) {
        console.error("Fetch error:", err); 
        setError(err.message || 'Nu s-au putut încărca datele challenge-ului.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallengeData();
  }, [id, params?.id]); 

  
  const handleJoin = async () => {
    if (!isAuthenticated) {
      alert('Trebuie să fii autentificat pentru a te înscrie.');
      return;
    }
  
    if (!id || joining || joined) return;

    setJoining(true);
    try {
      const result = await simulateAPI.joinChallenge(id);
      if (result.success) {
        setJoined(true);
        setChallenge(prev => prev ? ({ 
          ...prev,
          participants: (prev.participants || 0) + 1
        }) : null); 
      } else {
        alert('Înscrierea la challenge a eșuat.');
      }
    } catch (err) {
      console.error("Join error:", err);
      alert('A apărut o eroare la înscriere.');
    } finally {
        setJoining(false);
    }
  };

  // --- Stări de încărcare și eroare ---
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

  if (!challenge) {
    // Mesaj specific dacă ID-ul a fost invalid sau challenge-ul nu a fost găsit
    return <p className="text-center text-gray-500 mt-10 px-4">{id ? 'Challenge negăsit.' : 'ID Challenge invalid.'}</p>;
  }

  // Calcul progres
  const progress = challenge.maxParticipants > 0
    ? Math.min(100, (challenge.participants / challenge.maxParticipants) * 100)
    : 0;

  // --- JSX - Structura paginii ---
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* Coloana Principală (Detalii Challenge) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Imaginea Challenge-ului */}
          <div className="aspect-video overflow-hidden rounded-xl shadow-lg border border-gray-100">
            <Image
              src={challenge.image}
              alt={challenge.title}
              width={1600}
              height={900}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{challenge.title}</h1>
            <p className="mt-3 text-lg text-gray-600">{challenge.description}</p>
          </div>

           {/* Etichete (Tags) */}
           {challenge.tags && challenge.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                  {challenge.tags.map((tag: string, index: number) => (
                      <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">
                          {tag}
                      </span>
                  ))}
              </div>
           )}

          {/* Detalii Challenge */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalii Challenge</h2>
        
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{challenge.details}</p>
          </div>

          {/* Resurse Utile */}
          {challenge.resources && challenge.resources.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resurse Utile</h2>
                <ul className="space-y-2">
                    {challenge.resources.map((res: { title: string; url: string }, index: number) => (
                        <li key={index} className="flex items-center">
                            <LinkIcon className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                            <a
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-800 hover:underline truncate transition-colors"
                            >
                                {res.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
          )}

        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Card Premiu */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-3">
              <Trophy className="h-6 w-6 mr-2 opacity-80" />
              <h3 className="text-xl font-semibold">Premiu</h3>
            </div>
            <p className="text-3xl font-bold">{challenge.prize}</p>
          </div>

          {/* Card Progres și Înscriere */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Participanți</h3>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <span>{challenge.participants} Înscriși</span>
              <span>Limită: {challenge.maxParticipants}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {/* Buton Înscriere */}
            <button
              onClick={handleJoin}
              className={`mt-5 w-full py-3 px-4 rounded-lg text-base font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                joined
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : joining
                  ? 'bg-gray-200 text-gray-500 cursor-wait'
                  : 'bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
              }`}
              disabled={joined || joining || !id} 
            >
              {joined ? (
                  <> <CheckCircle className="h-5 w-5" /> <span>Înscris!</span> </>
              ) : joining ? (
                  <> <Loader2 className="h-5 w-5 animate-spin" /> <span>Procesare...</span> </>
              ) : (
                  'Înscrie-te la Challenge'
              )}
            </button>
          </div>

          {/* Leaderboard Simulat */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
             <h3 className="text-xl font-semibold text-gray-800 mb-4">Clasament (Top 3)</h3>
             {leaderboard.length > 0 ? (
                 <ul className="space-y-3">
                     {leaderboard.map((user) => (
                         <li key={user.rank} className="flex items-center justify-between text-sm">
                             <div className="flex items-center space-x-2">
                                 <span className="font-semibold text-gray-500 w-4 text-right mr-1">{user.rank}.</span>
                                 <Image src={user.avatar} alt={user.name} width={24} height={24} className="rounded-full flex-shrink-0" />
                                 <span className="text-gray-700 font-medium truncate">{user.name}</span>
                             </div>
                             <span className="text-purple-600 font-semibold flex-shrink-0 ml-2">{user.score} pts</span>
                         </li>
                     ))}
                 </ul>
             ) : (
                 <p className="text-sm text-gray-500 italic">Clasamentul nu este încă disponibil.</p>
             )}
          </div>

         

        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
