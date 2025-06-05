// components/Navbar.tsx
'use client';

import Link from "next/link";
import MobileMenu from "./MobileMenu"; 
import Image from "next/image"; 
import { useSession, signIn, signOut } from "next-auth/react"; 
import { Search, Bell, User, LogIn, LogOut } from "lucide-react"; 

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const userId = session?.user?.id;
  const userImage = session?.user?.image;

  return (
    <div className="h-20 md:h-24 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl h-full flex items-center justify-between px-4 md:px-6 lg:px-8 gap-4">
        <div className="flex-shrink-0">
          <Link
            href="/app" 
            className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-1 hover:opacity-90 transition-opacity"
          >
            DevFlow
          </Link>
        </div>

        <div className="hidden lg:flex flex-grow justify-start px-4 min-w-0">
          <div className="relative w-full max-w-2xl ml-40"> 
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Caută proiecte, discuții, utilizatori..." 
              className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 md:gap-4 flex-shrink-0">
          {/* Acțiuni Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session ? (
       
              <>
                {/* Notificări */}
                <Link href={'/notification'} className="flex items-center" title="Notificări">
                  <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Bell size={20} className="text-gray-600" />
                  </div>
                </Link>
                {/* Profil */}
                <Link href={`/profile/${userId}`} className="flex items-center" title="Profil">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt="Avatar"
                      width={32} height={32}
                      className="w-8 h-8 rounded-full object-cover border-2 border-transparent hover:border-purple-300 transition-colors"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-blue-400 flex items-center justify-center text-white text-sm font-semibold border-2 border-transparent hover:border-purple-300 transition-colors">
                      {session.user?.name?.charAt(0).toUpperCase() || <User size={16} />}
                    </div>
                  )}
                </Link>
          
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center" 
                  title="Deconectare"
                >
                  <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <LogOut size={20} className="text-gray-600 hover:text-red-500 transition-colors" />
                  </div>
                </button>
              </>
            ) : (
       
              <button
                onClick={() => signIn('github')} 
                className="flex items-center space-x-2 px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:opacity-90 transition-opacity"
              >
                <LogIn size={16} />
                <span>Autentificare</span> 
              </button>
            )}
          </div>
          <div className="md:hidden">
            <MobileMenu session={session} /> 
          </div>
        </div>
      </div>
    </div>
  );
}
