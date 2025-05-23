// În fișierul existent: (presupus a fi Feeds.tsx)
'use client';

import React from 'react';
import useSWR from 'swr';
// Folosim tipul original ApiPostType (presupunând că nu îl modificăm acum)
// Asigură-te că această cale este corectă
import { ApiPostType } from './ProfilePage';

// Importăm componenta PostItem (care AFIȘEAZĂ ÎNCĂ STILUL VECHI)
import PostItem from './PostItem';
// Am comentat AddPost pentru că nu mai este necesar în vizualizarea de blog
// import AddPost from './AddPost';

// --- Funcție Fetcher (rămâne la fel) ---
const fetcher = async (url: string): Promise<ApiPostType[]> => {
    const response = await fetch(url);
    if (!response.ok) {
        let errorMsg = `HTTP error! status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
        } catch (e) { /* Ignoră */ }
        throw new Error(errorMsg);
    }
    return response.json();
};

// --- Date Generice (Folosim datele originale, nemodificate pentru blog) ---
// Notă: Aceste date nu au 'title' sau 'author.email' necesare pt. noul PostItem
// Va trebui să actualizezi fie aceste date, fie sursa ta API (ex: /api/posts)
const genericPostsData: Omit<ApiPostType, 'likeCount' | 'shareCount' | 'updatedAt' | 'title' | 'author'>[] = [
     { id: 'generic-1', description: '🚀 Lansat un nou proiect open-source...', fileUrl: 'https://images.pexels.com/photos/907489/pexels-photo-907489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', githubLink: 'https://github.com/', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
     { id: 'generic-2', description: 'Tocmai am terminat un tutorial despre WebSockets...', fileUrl: 'https://images.pexels.com/photos/17279853/pexels-photo-17279853/free-photo-of-laptop-tehnologie-design-aspect.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', githubLink: null, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
     { id: 'generic-3', description: 'Explorând posibilitățile oferite de Cloudinary...', fileUrl: 'https://images.pexels.com/photos/28666523/pexels-photo-28666523/free-photo-of-intindere-plata-a-smartphone-ului-cu-accesorii-vibrante-pe-birou.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', githubLink: null, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
     { id: 'generic-4', description: 'Am creat o animație CSS complexă...', fileUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', githubLink: 'https://github.com/', createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
     { id: 'generic-5', description: 'Participând la un challenge #100DaysOfCode...', fileUrl: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', githubLink: null, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
];
// Completăm postările generice originale
const genericPosts: ApiPostType[] = genericPostsData.map((p, index) => ({
    ...p,
    // Recreăm datele lipsă așa cum erau probabil înainte
    // Atenție: lipsesc title și author.email! PostItem actualizat va avea nevoie de ele.
    author: { id: `user-generic-${index+1}`, name: `Autor Generic ${index+1}`, image: `https://i.pravatar.cc/40?u=generic${index+1}` }, // Adăugat autor generic
    title: `Proiect nou!!!`, // Adăugat titlu generic placeholder
    updatedAt: p.createdAt,
    likeCount: Math.floor(Math.random() * 100), // Păstrat pt compatibilitate cu tipul vechi
    shareCount: Math.floor(Math.random() * 20), // Păstrat pt compatibilitate cu tipul vechi
}));


// --- Componenta Feeds (modificată spre BlogSection ca funcționalitate) ---
// Poți redenumi funcția dacă dorești, ex: export default function BlogSection() { ... }
export default function Feeds() {
    // Folosește SWR pentru postările reale
    // Poate ar fi bine să schimbi endpoint-ul în /api/blog sau similar pe viitor
    const { data: apiPosts, error, isLoading } = useSWR<ApiPostType[]>('/api/posts', fetcher, {
        revalidateOnFocus: true,
    });

    // Combină postările (logica rămâne similară)
    const apiPostIds = new Set(apiPosts?.map(p => p.id));
    // Filtrăm postările generice care nu au ID-uri în cele venite de la API
    const uniqueGenericPosts = genericPosts.filter(gp => !apiPostIds.has(gp.id));
    // Combinăm postările de la API (dacă există) cu cele generice unice
    const allPostsToDisplay = [...(apiPosts || []), ...uniqueGenericPosts]
         // Sortăm după data creării, cele mai noi primele
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        // Container principal - lățime mărită, eliminat AddPost, text actualizat
        // Folosim 'space-y-8' pentru spațiere verticală între cardurile de blog
        <div className="w-full max-w-4xl mx-auto py-6 px-2 sm:px-4 space-y-8">
            {/* --- Componenta AddPost a fost ELIMINATĂ --- */}

            {/* Secțiunea pentru afișarea articolelor */}
            {isLoading && (
                <div className="text-center text-gray-500 pt-10">
                    {/* Text modificat */}
                    <p className="text-lg mb-2">Se încarcă articolele...</p>
                    {/* Aici poți adăuga un spinner/indicator de încărcare */}
                </div>
            )}
            {error && (
                <div className="text-center text-red-600 pt-10 p-4 bg-red-50 rounded-lg shadow border border-red-200">
                     {/* Text modificat */}
                    <p className="text-lg mb-2">Eroare la încărcarea articolelor:</p>
                    <p>{error.message}</p> {/* Afișează mesajul de eroare */}
                </div>
            )}
            {!isLoading && !error && allPostsToDisplay.length === 0 && (
                <div className="text-center text-gray-500 pt-10">
                     {/* Text modificat */}
                    <p className="text-lg mb-2">Niciun articol de blog de afișat.</p>
                </div>
            )}
            {!isLoading && !error && allPostsToDisplay.length > 0 && (
                // Iterăm prin postările sortate
                allPostsToDisplay.map((post) => (
                    // --- ATENȚIE: Renderizează componenta PostItem ---
                    // --- Asigură-te că ai actualizat PostItem.tsx ---
                    // --- conform codului furnizat în răspunsul anterior ---
                    // --- pentru a arăta ca un card de blog și a avea ---
                    // --- butoanele corecte (Save, Email) și fără Like/Share ---
                    <PostItem key={post.id} post={post} />
                ))
            )}

            {/* Footer - Text actualizat */}
            <footer className="bg-transparent pt-12 pb-6 text-center text-gray-400 text-xs">
                DEVFLOW Blog &copy; {new Date().getFullYear()}
            </footer>
        </div>
    );
}