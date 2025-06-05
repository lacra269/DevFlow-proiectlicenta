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
  
  fileObject?: File | null; 
  createdAt: Date;
};


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
    
    const newPost: Post = {
      ...postData,
      id: Date.now(), 
      createdAt: new Date(), 
    };

    console.log("PostContext: Adding new post to state (with File object):", newPost);
    
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

 
  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};


export const usePostContext = (): PostContextType => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
