'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Interfața Author
export type Author = {
  id?: string;
  name?: string | null;
  image?: string | null;
};

// Interfața Post actualizată pentru a stoca obiectul File
export type Post = {
  id: number;
  author: Author;
  description: string;
  // Eliminăm localFileUrl și localFileType de aici
  fileObject?: File | null; // Stocăm obiectul File direct
  createdAt: Date;
};

// Tipul pentru context, addPost primește datele *fără* id și createdAt
type PostContextType = {
  posts: Post[];
  addPost: (postData: Omit<Post, 'id' | 'createdAt'>) => void;
};

// Crearea contextului
const PostContext = createContext<PostContextType | undefined>(undefined);

// Providerul de context
export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Funcția addPost actualizată
  const addPost = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    // Creează obiectul complet Post, generând id și createdAt
    const newPost: Post = {
      ...postData,
      id: Date.now(), // Generează un ID unic simplu bazat pe timestamp
      createdAt: new Date(), // Setează data și ora curentă
    };

    console.log("PostContext: Adding new post to state (with File object):", newPost);
    // Adaugă noua postare la *începutul* listei
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Nu mai este nevoie de cleanup specific pentru Blob URL aici,
  // deoarece PostItem va gestiona URL-urile pe care le creează.

  // Furnizează starea și funcțiile către componentele copil
  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

// Hook custom pentru a folosi contextul mai ușor
export const usePostContext = (): PostContextType => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
