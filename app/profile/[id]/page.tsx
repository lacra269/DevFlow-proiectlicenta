// --- ÎNCEPUT FIȘIER (ex: app/profile/page.tsx sau app/profile/[id]/page.tsx) ---
'use client'; // Necesar pentru hook-uri

import React, { useState, useEffect, useCallback } from 'react';
import LeftMenu from "../../components/LeftMenu"; // TODO: Verifică calea!
import Image from "next/image";
import useSWR, { mutate } from 'swr';
import { useSession } from "next-auth/react";

// --- Tipul de Date Returnat de API ---
interface ApiPostType {
  id: string;
  description: string;
  fileUrl?: string | null;
  githubLink?: string | null;
  likeCount: number;
  shareCount: number;
  createdAt: string; // Poate vrei să formatezi data asta
  updatedAt: string;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

// --- Props pentru Componenta Post ---
interface PostProps {
    post: ApiPostType;
    onEdit: (post: ApiPostType) => void; // Funcție pasată de la părinte (ProfilePage)
    onDelete: (id: string) => void;     // Funcție pasată de la părinte (ProfilePage)
}

// --- Constante Globale (dacă sunt necesare) ---
const DEFAULT_GITHUB_PROFILE_URL = 'https://github.com/lacra269'; // TODO: Actualizează dacă e necesar

// --- Componente SVG Icons ---
// (Pot fi mutate într-un fișier separat și importate)
const GitHubIcon = () => (
  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.397.098 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
);
const EmailIcon = () => (
    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);
const SaveIcon = ({ saved }: { saved: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1.5 ${saved ? 'fill-current text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
);

// --- Componenta Post (Fără Like, design butoane ajustat) ---
function Post({ post, onEdit, onDelete }: PostProps) {
  // State local pentru interacțiuni UI (Save, Meniu)
  const [saved, setSaved] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  // shareCount nu mai e necesar în state dacă nu îl folosim nicăieri
  // const [shareCount, setShareCount] = useState(post.shareCount);

  const { data: session } = useSession();
  // Verifică dacă userul curent e autorul postării
  const isAuthor = session?.user?.id === post.author?.id;

  // --- Handler pentru Share (deschide mailto) ---
  const handleShare = useCallback(() => {
    // Poți adăuga logică aici dacă vrei (ex: API call pentru analytics)
    const subject = encodeURIComponent(`Check out this post on DEVFLOW by ${post.author?.name || 'User'}!`);
    const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/post/${post.id}` : ''; // Link către postare specifică (exemplu)
    const body = encodeURIComponent( `Hey!\n\nCheck out this project:\n\n"${post.description}"\n\nSee it here: ${postUrl}\n\nShared from DEVFLOW` );
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    if (typeof window !== 'undefined') { window.location.href = mailtoLink; }
  }, [post.id, post.author?.name, post.description]); // Dependințe

  // --- Handler pentru meniul More ---
  const handleMoreClick = useCallback((e: React.MouseEvent) => {
      e.stopPropagation(); // Oprește propagarea ca să nu închidă meniul imediat
      setMenuVisible(prev => !prev); // Toggle vizibilitate meniu
  }, []);

  // --- Pregătire date pentru afișare ---
  const authorName = post.author?.name ?? 'Unknown User';
  const authorAvatar = post.author?.image ?? '/image/noAvatar.png'; // TODO: Verifică calea
  const isValidImageUrl = typeof post.fileUrl === 'string' && post.fileUrl.startsWith('http');

  // --- JSX Return (Verificat Sintactic) ---
  return ( // Linia 87 (poate diferi ușor la tine)
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow border border-gray-200"> {/* Linia 88 */}
      {/* Antet Post */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={authorAvatar} alt={`${authorName}'s avatar`} width={40} height={40}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = '/image/noAvatar.png'; }}
          />
          <span className="font-semibold text-gray-800">{authorName}</span>
        </div>
        {isAuthor && (
            <div className="relative">
                <Image
                  src="/image/more.png" alt="more options" width={20} height={20} // TODO: Verifică calea
                  className="cursor-pointer" onClick={handleMoreClick}
                />
                {menuVisible && (
                  <div
                    id={`menu-${post.id}`}
                    className="absolute right-0 mt-2 w-32 bg-white shadow-xl rounded-lg border border-gray-100 z-20 overflow-hidden"
                  >
                      <button onClick={() => { onEdit(post); setMenuVisible(false); }} className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">Modifică</button>
                      <button onClick={() => { onDelete(post.id); setMenuVisible(false); }} className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">Ștergere</button>
                  </div>
                )}
              </div>
        )}
      </div>

      {/* Descriere */}
      {post.description && (
        <div className="flex flex-col gap-3">
          <p className="text-gray-700 text-sm">{post.description}</p>
        </div>
      )}

      {/* Imagine Post */}
      {isValidImageUrl && (
          <div className="w-full h-auto max-h-96 relative rounded-lg overflow-hidden border border-gray-100 bg-gray-100"> {/* Added bg color */}
            <Image
                src={post.fileUrl!} alt="project image" layout="responsive" width={16} height={9} objectFit="cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} // Ascunde dacă e eroare
            />
          </div>
      )}

      {/* Acțiuni Post (Design ajustat) */}
      <div className="flex justify-between items-center mt-2 text-sm text-gray-700 border-t border-gray-100 pt-3">
          {/* Buton GitHub (stânga) */}
          {post.githubLink ? (
              <a href={post.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150">
                  <GitHubIcon />GitHub
              </a>
          ) : ( <div aria-hidden="true"></div> )} {/* Placeholder */}

          {/* Grup Butoane (dreapta) */}
          <div className="flex items-center gap-3">
              {/* Buton Email */}
              <button onClick={handleShare} className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 group">
                  <EmailIcon />Email
              </button>
              {/* Buton Salvează */}
              <button onClick={() => setSaved(prev => !prev)} className={`inline-flex items-center px-3 py-1.5 border ${saved ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 group`}>
                  <SaveIcon saved={saved} />{saved ? 'Salvat' : 'Salvează'}
              </button>
          </div>
      </div>

      {/* Listener pentru click exterior meniu */}
      {menuVisible && <div className="fixed inset-0 z-10" onClick={() => setMenuVisible(false)}></div>}

    </div> // Închidere div principal Post
  ); // Închidere return Post
} // Închidere funcție Post

// --- Funcție Fetcher pentru SWR ---
const fetcher = async (url: string): Promise<ApiPostType[]> => {
    const response = await fetch(url);
    if (!response.ok) {
        let errorMsg = `HTTP error! status: ${response.status}`;
        try { const errorData = await response.json(); errorMsg = errorData.message || errorMsg; } catch (e) {}
        throw new Error(errorMsg);
    }
    return response.json();
};

// --- Componenta Principală a Paginii (ex: ProfilePage) ---
export default function ProfilePage() {
    // Starea formularului
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [newPostDescription, setNewPostDescription] = useState('');
    const [newPostImage, setNewPostImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [includeGithubButton, setIncludeGithubButton] = useState(true);
    const [specificGithubLink, setSpecificGithubLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pageError, setPageError] = useState<string | null>(null);

    const { data: session } = useSession();

    // TODO: Adaptează URL-ul SWR dacă e profilul altcuiva (ex: folosind params.id)
    const swrKey = '/api/posts'; // Poate fi `/api/posts/user/${params.id}`
    const { data: posts, error: swrError, isLoading, mutate: mutatePosts } = useSWR<ApiPostType[]>(swrKey, fetcher, {
        revalidateOnFocus: true,
        onError: (err) => { setPageError(`Failed to load posts: ${err.message}`); }
    });

    // --- Handlers Formular (majoritatea neschimbate) ---
    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.type.startsWith('image/')) {
                setSubmitError("Please select an image file."); return;
            }
            setNewPostImage(file);
            const reader = new FileReader();
            reader.onloadend = () => { setImagePreview(reader.result as string); };
            reader.readAsDataURL(file);
            setSubmitError(null);
        } else {
            setNewPostImage(null); setImagePreview(null);
        }
    }, []);

    const resetForm = useCallback(() => {
        setNewPostDescription(''); setNewPostImage(null); setImagePreview(null);
        setIncludeGithubButton(true); setSpecificGithubLink(''); setEditingPostId(null);
        setSubmitError(null); setIsSubmitting(false);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) { fileInput.value = ''; }
    }, []);

    const handlePostSubmit = useCallback(async () => {
        if (!editingPostId && !newPostDescription.trim() && !newPostImage) {
             setSubmitError("Please write something or add an image."); return;
        }
        let finalGithubLink: string | null = null;
        if (includeGithubButton) {
             if (specificGithubLink.trim()) {
                  try { new URL(specificGithubLink); finalGithubLink = specificGithubLink.trim(); }
                  catch (_) { setSubmitError("Invalid GitHub URL."); return; }
             } else { finalGithubLink = DEFAULT_GITHUB_PROFILE_URL; }
        }

        setIsSubmitting(true); setSubmitError(null); setPageError(null);
        const formData = new FormData();
        formData.append('description', newPostDescription.trim());
        formData.append('githubLink', finalGithubLink ?? '');

        let apiUrl = '/api/posts'; let method = 'POST';
        if (editingPostId) {
            apiUrl = `/api/posts/${editingPostId}`; method = 'PUT';
            const originalPost = posts?.find(p => p.id === editingPostId);
            const imageRemoved = !newPostImage && !imagePreview && originalPost?.fileUrl;
            if (newPostImage) { formData.append('imageFile', newPostImage); }
            else if (imageRemoved) { formData.append('removeCurrentImage', 'true'); }
        } else if (newPostImage) { formData.append('imageFile', newPostImage); }

        try {
            const response = await fetch(apiUrl, { method, body: formData });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                throw new Error(errorData.message);
            }
            await mutatePosts(); // Revalidare SWR (await e bun aici)
            resetForm();
        } catch (err: any) {
            console.error(`ProfilePage: Failed to ${editingPostId ? 'update' : 'submit'} post:`, err);
            setSubmitError(err.message || `Could not ${editingPostId ? 'update' : 'save'} the post.`);
            setIsSubmitting(false);
        }
    }, [editingPostId, newPostDescription, newPostImage, imagePreview, includeGithubButton, specificGithubLink, posts, mutatePosts, resetForm]);

    const handleEditPost = useCallback((post: ApiPostType) => {
        setEditingPostId(post.id); setNewPostDescription(post.description);
        setNewPostImage(null); setImagePreview(post.fileUrl ?? null);
        if (post.githubLink) {
            setIncludeGithubButton(true);
            setSpecificGithubLink(post.githubLink === DEFAULT_GITHUB_PROFILE_URL ? '' : post.githubLink);
        } else { setIncludeGithubButton(false); setSpecificGithubLink(''); }
        document.getElementById('create-post-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setSubmitError(null); setPageError(null);
    }, []); // Dependency array gol e ok dacă funcția nu depinde de state extern schimbător

    const cancelEdit = useCallback(() => { resetForm(); }, [resetForm]);

    const handleDeletePost = useCallback(async (postId: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        setPageError(null);
        const previousPosts = posts; // Păstrează starea curentă pentru rollback
        mutatePosts(posts?.filter(p => p.id !== postId), false); // Optimistic update

        try {
            const response = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                throw new Error(errorData.message);
            }
            console.log("Post deleted successfully via API");
            if (editingPostId === postId) cancelEdit();
            // Nu mai facem mutate explicit aici, lăsăm SWR să revalideze la următoarea ocazie sau focus
        } catch (err: any) {
            console.error("ProfilePage: Failed to delete post:", err);
            setPageError(err.message || "Could not delete the post.");
            mutatePosts(previousPosts, false); // Rollback manual la starea anterioară
        }
    }, [posts, editingPostId, mutatePosts, cancelEdit]);

    const isSubmitDisabled = useCallback(() => {
        if (isSubmitting) return true;
        if (editingPostId) {
             const originalPost = posts?.find(p => p.id === editingPostId); if (!originalPost) return true;
             const descriptionChanged = newPostDescription.trim() !== originalPost.description;
             const currentGithubLink = includeGithubButton ? (specificGithubLink.trim() || DEFAULT_GITHUB_PROFILE_URL) : null;
             const githubLinkChanged = currentGithubLink !== originalPost.githubLink;
             const imageChanged = newPostImage !== null || imagePreview !== (originalPost.fileUrl ?? null);
             return !(descriptionChanged || githubLinkChanged || imageChanged);
        } else { return !newPostDescription.trim() && !newPostImage; }
    }, [isSubmitting, editingPostId, posts, newPostDescription, newPostImage, imagePreview, includeGithubButton, specificGithubLink]);

    // --- Date profil (Exemplu - TODO: Înlocuiește cu date reale/dinamice) ---
    const profileUserName = 'lacra269'; // Numele profilului vizitat
    const profileUserAvatar = '/image/githubprofil.png'; // TODO: Verifică calea
    const profileUserCover = 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg';

    // --- Eroare combinată ---
    const displayError = swrError || pageError;

    // --- JSX Return pentru Pagină ---
    return (
        <div className="flex flex-col lg:flex-row gap-6 bg-gray-100 min-h-screen p-4 md:p-6">
            {/* Left Menu */}
            <div className="hidden xl:block w-[20%] flex-shrink-0"> <LeftMenu type="profile" /> </div>

            {/* Content Principal */}
            <div className="w-full lg:w-[calc(70%-1.5rem)] xl:w-[calc(50%-1.5rem)] flex flex-col gap-6 flex-shrink-0 order-2 lg:order-1">
                {/* Header Profil */}
                <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                    {/* ... (JSX Header Profil neschimbat) ... */}
                    <div className="relative">
                         <div className="w-full h-48 md:h-64 bg-gray-300 relative"><Image src={profileUserCover} alt="cover photo" layout="fill" objectFit="cover" priority /></div>
                         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"><Image src={profileUserAvatar} alt="profile picture" width={128} height={128} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-white" onError={(e) => { (e.target as HTMLImageElement).src = '/image/noAvatar.png'; }}/></div>
                     </div>
                     <div className="pt-16 pb-6 px-6 text-center">
                         <h1 className="text-2xl font-bold text-gray-800">{profileUserName}</h1>
                         <div className="flex justify-center gap-6 md:gap-10 mt-4 text-sm text-gray-600">
                              <div className="text-center"><div className="font-semibold text-lg text-gray-800">{posts ? posts.length : 0}</div><div className="text-xs uppercase tracking-wide">Proiecte postate</div></div>
                             
                         </div>
                     </div>
                </div>

                {/* Feed Section */}
                <div className="flex flex-col gap-6">
                    {isLoading && <div className="text-center text-gray-500 mt-10 p-6 bg-white rounded-lg shadow border">Loading posts...</div>}
                    {displayError && <div className="text-center text-red-600 mt-10 p-4 bg-red-50 rounded-lg shadow border border-red-200">Error: {typeof displayError === 'string' ? displayError : displayError.message} <button onClick={() => { mutatePosts(); setPageError(null); }} className="ml-2 text-blue-600 underline">Retry</button></div>}
                    {!isLoading && !displayError && (!posts || posts.length === 0) && ( <div className="text-center text-gray-500 mt-10 bg-white p-6 rounded-lg shadow border border-gray-200">No posts yet.</div> )}
                    {!isLoading && !displayError && posts && posts.map((post) => (
                        <Post key={post.id} post={post} onEdit={handleEditPost} onDelete={handleDeletePost} />
                    ))}
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[30%] xl:w-[30%] flex-shrink-0 flex flex-col gap-6 order-1 lg:order-2">
                {/* User Info Card */}
                <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
                    {/* ... (JSX User Info neschimbat) ... */}
                    <h2 className="font-semibold text-lg text-gray-800 mb-4">Lacramioara Bordeanu</h2>
                    <div className="text-sm text-gray-600 space-y-2 border-b border-gray-100 pb-4 mb-4">
                        <p className="flex items-center gap-2"><span className="text-xl">👨‍💻</span> Software Developer</p>
                       
                        <p className="flex items-center gap-2"><span className="text-xl">📝</span> Experiență: Începător/Student</p>
                        <p className="mt-2 text-gray-500 italic">Tehnologie și programare 💻</p>
                        
                        </div>
                        <div className="text-sm text-gray-600 space-y-3 border-b border-gray-100 pb-4 mb-4">
                            <div className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 text-lg">📍</span>
                            <div>
                                <p className="font-medium text-gray-700">Locatie</p>
                                <p>Iași, Romania</p></div></div><div className="flex items-start gap-2">
                                    <span className="text-gray-400 mt-0.5 text-lg">📅</span>
                                    <div>
                                        <p className="font-medium text-gray-700">Înregistrat</p>
                                        <p>Feb 11, 2020</p></div></div><div className="flex items-start gap-2">
                                            <span className="text-gray-400 mt-0.5 text-lg">🌐</span>
                                            <div>
                                                <p className="font-medium text-gray-700">Website</p>
                                                <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">https://example.com</a>
                                                </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-gray-400 mt-0.5 text-lg">🎓</span>
                                                    <div><p className="font-medium text-gray-700">Educație</p><p>Absolvent Informatică Economică</p></div></div><div className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 text-lg">💼</span><div><p className="font-medium text-gray-700">Muncă</p><p>Software Developer</p></div></div></div><div><h3 className="font-semibold text-base text-gray-800 mb-3">Conectare</h3><div className="flex flex-col gap-3"><a href="mailto:lacramioara@example.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"><Image src="/image/mail.png" alt="email" width={18} height={18} /><span className="text-sm break-all">lacramioara@gmail.com</span></a><a href={DEFAULT_GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"><Image src="/image/github.png" alt="GitHub" width={18} height={18} /><span className="text-sm">Profil GitHub </span></a><a href="https://www.linkedin.com/in/lacramioara-bordeanu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"><Image src="/image/linkedin.png" alt="LinkedIn" width={18} height={18} /><span className="text-sm">Profil LinkedIn</span></a></div></div>
                </div>

                {/* Create Post Section */}
                 {/* TODO: Adaugă condiție: Afișează doar dacă e profilul userului autentificat */}
                {/* Exemplu: session?.user?.id === userIdFromParams && ( ... ) */}
                <div id="create-post-section" className="p-4 bg-white shadow rounded-lg border border-gray-200">
                    {/* ... (JSX Create Post Section neschimbat, dar cu handler și state actualizate) ... */}
                     <h2 className="font-semibold text-lg text-gray-800 mb-4 pb-3 border-b border-gray-100"> {editingPostId ? 'Modifică Proiectul' : 'Creează proiect'} </h2>
                     {submitError && (
                        <div className="mb-4 text-sm text-red-600 p-3 bg-red-50 rounded-lg border border-red-200 flex justify-between items-center">
                           <span>{submitError}</span>
                           <button onClick={() => setSubmitError(null)} className="font-semibold text-red-700 hover:text-red-900 text-lg leading-none">&times;</button>
                       </div>
                    )}
                     <div className="flex flex-col gap-4">
                          <textarea value={newPostDescription} onChange={(e) => setNewPostDescription(e.target.value)} placeholder={`Ce proiect nou ai , ${session?.user?.name || 'User'}?`} rows={4} className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition duration-150 ease-in-out text-sm resize-none shadow-sm ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`} disabled={isSubmitting} />
                          {imagePreview && ( <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-full"> <Image src={imagePreview} alt="Preview" width={500} height={280} layout="responsive" objectFit="contain" /> <button onClick={() => { setImagePreview(null); setNewPostImage(null); const fileInput = document.getElementById('file-upload') as HTMLInputElement; if (fileInput) fileInput.value = ''; }} className={`absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition ${isSubmitting ? 'hidden' : ''}`} aria-label="Sterge image" disabled={isSubmitting} > <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> </button> </div> )}
                          <div className={`mt-2 space-y-3 border-t border-gray-100 pt-4 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
                                <div className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 ${isSubmitting ? '' : 'cursor-pointer'}`} onClick={() => !isSubmitting && setIncludeGithubButton(prev => !prev)}> <input id="include-github-button" type="checkbox" readOnly checked={includeGithubButton} disabled={isSubmitting} className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`} /> <label htmlFor="include-github-button" className={`text-sm font-medium text-gray-700 select-none ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}> Include 'GitHub'? </label> </div>
                                {includeGithubButton && ( <div className="pl-6 pb-2"> <label htmlFor="specific-github-link" className="block text-sm font-medium text-gray-500 mb-1">GitHub Link (optional)</label> <input type="url" id="specific-github-link" value={specificGithubLink} disabled={isSubmitting} onChange={(e) => setSpecificGithubLink(e.target.value)} placeholder="https://github.com/user/repo" className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`} /> <p className="mt-1 text-xs text-gray-500">If empty, links to: <span className='font-medium'>{DEFAULT_GITHUB_PROFILE_URL}</span></p> </div> )}
                          </div>
                          <div className="flex justify-between items-center mt-4 border-t border-gray-100 pt-4">
                                <label htmlFor="file-upload" title="Add Image" className={`flex items-center gap-2 text-gray-500 transition p-2 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:text-blue-600 hover:bg-gray-50'}`}> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> <span className="text-sm font-medium hidden sm:inline">Imagine</span> </label>
                                <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isSubmitting} />
                                <div className="flex gap-2">
                                     {editingPostId && ( <button onClick={cancelEdit} type="button" disabled={isSubmitting} className={`bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold text-sm transition shadow-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}> Anulează </button> )}
                                     <button onClick={handlePostSubmit} disabled={isSubmitDisabled()} className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg font-semibold text-sm transition shadow-sm flex items-center justify-center ${isSubmitDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`} >
                                         {isSubmitting ? ( /* Loading spinner */ <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>{editingPostId ? 'Updating...' : 'Posting...'}</> ) : ( editingPostId ? 'Modifică proiectul' : 'Postează proiectul' )}
                                     </button>
                                </div>
                          </div>
                     </div>
                </div>
            </div>
        </div> // Închidere div principal pagină
    ); // Închidere return ProfilePage
} // Închidere funcție ProfilePage

// --- SFÂRȘIT FIȘIER ---