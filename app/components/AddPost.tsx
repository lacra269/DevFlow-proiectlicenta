'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Paperclip, X, Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { mutate } from 'swr';

export default function AddPost() {
    const { data: session } = useSession();
    const [postText, setPostText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    // --- Gestionare Fișier și Preview (neschimbat) ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setError(null);

        if (localPreviewUrl) {
            URL.revokeObjectURL(localPreviewUrl);
            setLocalPreviewUrl(null);
        }
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setLocalPreviewUrl(previewUrl);
        }
    };

    useEffect(() => {
        const currentPreviewUrl = localPreviewUrl;
        return () => {
            if (currentPreviewUrl) {
                URL.revokeObjectURL(currentPreviewUrl);
            }
        }
    }, [localPreviewUrl]);

    const handleRemoveFile = () => {
        setFile(null);
        setLocalPreviewUrl(null);
        const fileInput = document.getElementById('file-upload-compact') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }
    // --- Sfârșit Gestionare Fișier ---

    // --- Resetare Formular (neschimbat) ---
    const resetForm = () => {
        setPostText('');
        setFile(null);
        setLocalPreviewUrl(null);
        setError(null);
        setIsPosting(false);
        setIsFocused(false);
        const fileInput = document.getElementById('file-upload-compact') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }

    // --- Trimitere Postare către API (neschimbat) ---
    const handlePostSubmit = async () => {
     
        if (!postText.trim() && !file) {
            setError("Scrie ceva sau alege un fișier."); return;
        }
        if (!session?.user) {
            setError("Autentificarea este necesară."); return;
        }
        if (isPosting) return;

        setIsPosting(true);
        setError(null);
        const formData = new FormData();
        formData.append('description', postText.trim());
        if (file) formData.append('imageFile', file);

        try {
            const response = await fetch('/api/posts', { method: 'POST', body: formData });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Eroare necunoscută la server.' }));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }
            resetForm();
            mutate('/api/posts');
        } catch (err: any) {
            console.error("AddPost Submit Error:", err);
            setError(err.message || 'Eroare la postare.');
            setIsPosting(false);
        }
    };

   
    if (!session) {
        return (
            <div className="p-3 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-lg text-center text-xs text-gray-600 mb-4 shadow-sm">
                Trebuie să fii <a href="/api/auth/signin" className="text-blue-600 hover:underline font-medium">autentificat</a> pentru a posta.
            </div>
        );
    }

    // --- JSX Colorat și Compact ---
    return (
       
        <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br from-purple-50 via-blue-50 to-white mb-4 transition-all duration-300 ease-in-out ${isFocused ? 'shadow-md' : 'shadow-sm'}`}>
            <div className="flex items-start space-x-2 sm:space-x-3">
               
                <Image
                    src={session.user?.image || "https://placehold.co/36x36/cccccc/ffffff?text=?"}
                    alt="User Avatar"
                    className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full flex-shrink-0 mt-0.5" 
                    width={36} height={36}
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/36x36/cccccc/ffffff?text=?")}
                />
          
                <div className="flex-1 min-w-0">
            
                    <textarea
                        name="PostTextCompact"
                        placeholder={`Ce mai e nou, ${session.user?.name?.split(' ')[0] || 'utilizator'}?`}
                        className={`w-full px-1 pt-1 pb-1 text-sm bg-transparent border-b border-gray-300/70 outline-none resize-none focus:ring-0 focus:border-purple-500 focus:border-b-2 placeholder-gray-400 transition-colors duration-200 ${isPosting ? 'text-gray-400 cursor-not-allowed' : 'text-gray-800'}`}
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        rows={isFocused || postText || file ? 2 : 1} 
                        disabled={isPosting}
                    />

                    {error && <p className="text-red-600 text-xs mt-1 px-1">{error}</p>}

             
                    {localPreviewUrl && file && (
                        <div className="mt-2 mb-1.5 relative inline-block bg-gray-100/70 p-0.5 rounded-md shadow-sm max-w-[120px]"> 
                            {file.type.startsWith("image") ? (
                                <Image src={localPreviewUrl} alt="Preview" className="max-h-16 w-auto object-contain rounded" width={100} height={64} /> 
                            ) : file.type.startsWith("video") ? (
                                <video controls className="max-h-16 w-full object-contain rounded bg-black" src={localPreviewUrl} /> 
                            ) : ( <p className='text-xs text-gray-700 truncate p-1'>{file.name}</p> )}
                            <button
                                onClick={handleRemoveFile}
                                className={`absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0 leading-none hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-red-400 focus:ring-offset-1 ${isPosting ? 'hidden' : 'flex items-center justify-center'}`}
                                aria-label="Șterge fișierul"
                                disabled={isPosting}
                                style={{ width: '14px', height: '14px' }} 
                            >
                                <X size={8} strokeWidth={3}/>
                            </button>
                        </div>
                    )}

                 
                    <div className="flex items-center justify-between mt-1.5"> 
                   
                        <label htmlFor="file-upload-compact" className={`text-purple-600 hover:text-purple-800 cursor-pointer p-1 rounded-full hover:bg-purple-100/70 transition-colors duration-200 ${isPosting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Paperclip size={16} /> 
                        </label>
                        <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" id="file-upload-compact" disabled={isPosting}/>

             
                        <button
                            onClick={handlePostSubmit}
                            className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white py-1 px-3 rounded-full hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 focus:ring-offset-purple-50 disabled:opacity-60 disabled:cursor-not-allowed text-xs font-medium transition-all duration-200 flex items-center shadow-sm hover:shadow-md`} 
                            disabled={isPosting || (!postText.trim() && !file)}
                        >
                            {isPosting ? (
                                <>
                                    <div className="w-3 h-3 border-t-2 border-b-2 border-white rounded-full animate-spin mr-1.5"></div> 
                                    <span>...</span>
                                </>
                             ) : (
                                <>
                                    <Send size={12} className="mr-1"/> 
                                    <span>Postează</span>
                                </>
                             )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}