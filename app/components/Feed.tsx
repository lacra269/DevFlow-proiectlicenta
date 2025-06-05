
'use client';

import React from 'react';
import useSWR from 'swr';
export type ApiPostType = {
    id: string;
    description: string;
    fileUrl?: string;
    githubLink?: string;
    createdAt: string;
    updatedAt: string;
    likeCount: number;
    shareCount: number;
    title: string;
    author: {
        id: string;
        name: string;
        image?: string;
        email?: string;
    };
};
import PostItem from './PostItem';

const fetcher = async (url: string): Promise<ApiPostType[]> => {
    const response = await fetch(url);
    if (!response.ok) {
        let errorMsg = `HTTP error! status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
        } catch (e) { /* Ig */ }
        throw new Error(errorMsg);
    }
    return response.json();
};

const genericPostsData: Omit<ApiPostType, 'likeCount' | 'shareCount' | 'updatedAt' | 'title' | 'author'>[] = [
     { id: 'generic-1', description: '🚀 Lansat un nou proiect open-source...', fileUrl: 'https://images.pexels.com/photos/907489/pexels-photo-907489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', githubLink: 'https://github.com/', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
     { id: 'generic-2', description: 'Tocmai am terminat un tutorial despre WebSockets...', fileUrl: 'https://images.pexels.com/photos/17279853/pexels-photo-17279853/free-photo-of-laptop-tehnologie-design-aspect.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
     { id: 'generic-3', description: 'Explorând posibilitățile oferite de Cloudinary...', fileUrl: 'https://images.pexels.com/photos/28666523/pexels-photo-28666523/free-photo-of-intindere-plata-a-smartphone-ului-cu-accesorii-vibrante-pe-birou.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
     { id: 'generic-4', description: 'Am creat o animație CSS complexă...', fileUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', githubLink: 'https://github.com/', createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
     { id: 'generic-5', description: 'Participând la un challenge #100DaysOfCode...', fileUrl: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
];
const genericPosts: ApiPostType[] = genericPostsData.map((p, index) => ({
    ...p,

    author: { id: `user-generic-${index+1}`, name: `Autor Generic ${index+1}`, image: `https://i.pravatar.cc/40?u=generic${index+1}` }, 
    title: `Proiect nou!!!`, 
    updatedAt: p.createdAt,
    likeCount: Math.floor(Math.random() * 100), 
    shareCount: Math.floor(Math.random() * 20), 
}));

export default function Feeds() {
    const { data: apiPosts, error, isLoading } = useSWR<ApiPostType[]>('/api/posts', fetcher, {
        revalidateOnFocus: true,
    });
    const apiPostIds = new Set(apiPosts?.map(p => p.id));
    const uniqueGenericPosts = genericPosts.filter(gp => !apiPostIds.has(gp.id));
    const allPostsToDisplay = [...(apiPosts || []), ...uniqueGenericPosts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="w-full max-w-4xl mx-auto py-6 px-2 sm:px-4 space-y-8">
            {isLoading && (
                <div className="text-center text-gray-500 pt-10">
                    <p className="text-lg mb-2">Se încarcă articolele...</p>
                </div>
            )}
            {error && (
                <div className="text-center text-red-600 pt-10 p-4 bg-red-50 rounded-lg shadow border border-red-200">
                    <p className="text-lg mb-2">Eroare la încărcarea articolelor:</p>
                    <p>{error.message}</p> 
                </div>
            )}
            {!isLoading && !error && allPostsToDisplay.length === 0 && (
                <div className="text-center text-gray-500 pt-10">
                    <p className="text-lg mb-2">Niciun articol de blog de afișat.</p>
                </div>
            )}
            {!isLoading && !error && allPostsToDisplay.length > 0 && (
                allPostsToDisplay.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))
            )}
            <footer className="bg-transparent pt-12 pb-6 text-center text-gray-400 text-xs">
                DEVFLOW Blog &copy; {new Date().getFullYear()}
            </footer>
        </div>
    );
}