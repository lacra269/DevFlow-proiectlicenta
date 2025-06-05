"use client"; 

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type VideoItem = 
  | {
      id: number;
      type: "youtube";
      title: string;
      description: string;
      youtubeId: string;
      startTime?: number;
    }
  | {
      id: number;
      type: "card";
      title: string;
      description: string;
      thumbnail: string;
      link: string;
    };

const videos: VideoItem[] = [
  {
    id: 1,
    type: "youtube",
    title: "Primii pași cu Next.js", 
    description: "O introducere prietenoasă pentru începători în construirea de aplicații cu Next.js.", 
    youtubeId: "ZVnjOPwW4ZA",
    startTime: 196,
  },
  {
    id: 2,
    type: "youtube",
    title: "Curs Intensiv Tailwind CSS", 
    description: "Învață cum să stilizezi rapid aplicațiile web folosind Tailwind.", 
    youtubeId: "wEM5NdJ-8HY",
    startTime: 196,
  },
  {
    id: 3,
    type: "youtube",
    title: "Ar trebui să accepți o sugestie de cod AI?", 
    description: "Analizez procesul de revizuire a unei sugestii de cod generate de AI.", 
    youtubeId: "77rgrdhhdhM",
    startTime: 196,
  },
  {
    id: 4,
    type: "card",
    title: "Resursă: Awesome Tailwind CSS", 
    thumbnail: "https://media2.dev.to/dynamic/image/width=880,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdw71fyauz7yz9.cloudfront.net%2Fvideo-upload__35a120fc434295dc1fde98317bf8af54%2Fthumbs-video-upload__35a120fc434295dc1fde98317bf8af54-00001.png",
    description: "O listă curatoriată de lucruri extraordinare legate de Tailwind CSS.", 
    link: "https://github.com/aniftyco/awesome-tailwindcss",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({ 
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07, 
      duration: 0.4,
      ease: "easeOut"
    }
  }),
  hover: {
    scale: 1.04, 
    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.15)", 
    y: -6, 
    transition: { type: "spring", stiffness: 300, damping: 15 } 
  }
};


export default function VideoDevPage() {
  return (
    <main className="p-6 md:p-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">Ajutor Video </h1> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => { 
     
          if (video.type === "youtube" && video.youtubeId) { 
            const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?start=${video.startTime || 0}&modestbranding=1&rel=0`; 

            return (
              <motion.div
                key={video.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col cursor-pointer" 
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={index} 
              >
              
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={embedUrl}
                      title={video.title} 
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0"
                    />
                </div>
             
                <div className="p-4 flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {video.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            );
          }
          
          else if (video.type === "card" && video.link && video.thumbnail) { 
            return (
                <motion.div
                  key={video.id}
                  className="block h-full" 
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  custom={index}
                >
                  <Link
                      href={video.link}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full group" 
                  >
                    <div className="relative h-48 w-full overflow-hidden"> 
                        <Image
                          src={video.thumbnail}
                          alt={video.title} 
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105" 
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                    <div className="p-4 flex-grow">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors"> 
                            {video.title}
                        </h2>
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {video.description}
                        </p>
                    </div>
                  </Link>
                </motion.div>
            );
          }
          return null;
        })}
      </div>
    </main>
  );
}
