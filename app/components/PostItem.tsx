// În fișierul: my-app/app/components/PostItem.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Asigură-te că tipul include author: { name, image, email } și githubLink
// Update the path below to where ApiPostType is actually defined, e.g. './types'
// Define ApiPostType locally if './types' does not exist
export interface ApiPostType {
  id: string | number;
  title?: string;
  description?: string;
  createdAt: string;
  fileUrl?: string;
  githubLink?: string;
  author?: {
    name?: string;
    image?: string;
    email?: string;
  };
}
// Importăm iconițele necesare
import { Bookmark, Mail, Github } from 'lucide-react';

// Definirea tipului pentru props
interface PostItemProps {
  post: ApiPostType;
}

export default function PostItem({ post }: PostItemProps) {
  const [saved, setSaved] = useState(false); // TODO: Setează inițial

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newState = !saved;
    setSaved(newState);
    console.log(`Post ${post.id} ${newState ? 'salvat' : 'nesalvat'}`);
    // TODO: API call
  };

   const formatRelativeTime = (dateString: string): string => {
       try { /* ... cod formatare dată ... */
           const date = new Date(dateString); if (isNaN(date.getTime())) return '?';
           const now = new Date(); const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
           const minutes = Math.round(seconds / 60); const hours = Math.round(minutes / 60);
           const days = Math.round(hours / 24);
           if (seconds < 60) return `acum ${seconds} sec`; if (minutes < 60) return `acum ${minutes} min`;
           if (hours < 24) return `acum ${hours} ore`; if (days === 1) return `ieri`;
           if (days < 7) return `acum ${days} zile`;
           return date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' });
       } catch { return '?'; }
   }

  // Extrage datele
  const authorName = post.author?.name ?? 'Autor Necunoscut';
  const authorAvatar = post.author?.image ?? '/image/noAvatar.png';
  const authorEmail = post.author?.email;
  const displayMediaUrl = post.fileUrl;
  // const postTitle = post.title ?? 'Articol Fără Titlu'; // Nu mai folosim variabila postTitle pentru afișare
  const postExcerpt = post.description; // Păstrăm extragerea descrierii
  const postDate = formatRelativeTime(post.createdAt);
  const postLink = `/blog/${post.id}`;
  const githubLink = post.githubLink;

  let isImage = false;
  if (displayMediaUrl) { try { isImage = /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(new URL(displayMediaUrl).pathname); } catch {} }
  const originalPostTitle = post.title ?? 'Articol Fără Titlu';


  return (
    <article className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200 flex flex-col">

      <Link href={postLink} className="group block cursor-pointer">
        {isImage && displayMediaUrl && (
          <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
            <Image src={displayMediaUrl} alt={originalPostTitle} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
        )}
        <div className="p-4 sm:p-5 flex-grow">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Proiect nou!</h2>
            {postExcerpt && (<p className="text-gray-600 text-sm mb-4 line-clamp-3">{postExcerpt}</p>)}
            <div className="flex items-center text-xs text-gray-500 mt-3">
                <Image src={authorAvatar} alt={`${authorName} avatar`} width={20} height={20} className="w-5 h-5 rounded-full object-cover mr-2 border"/>
                <span className="font-medium text-gray-700">{authorName}</span><span className="mx-1.5">·</span><span>{postDate}</span>
            </div>
        </div>
      </Link>
      <div className="flex items-center justify-between p-3 sm:p-4 border-t border-gray-100 bg-gray-50/50">
        <div>
            {githubLink ? (
                <Link href={githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors" onClick={(e) => e.stopPropagation()} title="Vezi pe GitHub"> <Github size={14} /> <span>GitHub</span> </Link>
            ) : ( <span className="inline-block h-6 w-16"></span> )} 
        </div>
        <div className="flex items-center space-x-3">
          <a
             href={`mailto:${authorEmail}?subject=Intrebare despre articolul: ${encodeURIComponent(originalPostTitle)}`}
             onClick={(e) => e.stopPropagation()}
             className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors shadow-sm"
             title={`Trimite email lui ${authorName}`}
             >
             <Mail size={14} />
             <span>Email</span>
          </a>
          <button onClick={handleSaveToggle}
                  className={`flex items-center space-x-1 px-3 py-1.5 text-xs transition-colors duration-200 rounded-md shadow-sm ${
                      saved
                      ? 'bg-blue-100 text-blue-700 font-semibold ring-1 ring-blue-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label={saved ? "Elimină din salvate" : "Salvează articolul"}
                  title={saved ? "Elimină din salvate" : "Salvează articolul"}>
            <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
            <span>{saved ? 'Salvat' : 'Salvează'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}