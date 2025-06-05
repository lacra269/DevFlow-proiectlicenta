'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signIn("github", { callbackUrl: "/app" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignup = () => {
    window.location.href = "https://github.com/join";
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full ">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/image/background.jpg')" }}></div> 
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl space-y-6 z-10"> 
        <div className="text-center">
          <Image src="/image/logo.png" alt="Logo" width={150} height={150} className="mx-auto animate__animated animate__fadeIn animate__delay-1s" />
          <h1 className="text-4xl font-extrabold text-gray-900 mt-4 animate__animated animate__fadeIn animate__delay-1s">
            Bine ai revenit!
          </h1>
          <p className="text-gray-500 mt-2">Te rog loghează-te cu contul de GitHub pentru a continua</p>
        </div>

        <div className="mt-8">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-400 transition duration-300 transform hover:scale-105"
          >
            {loading ? (
              <span>Conectare...</span>
            ) : (
              <>
                <Image src="/image/github.png" alt="GitHub" width={24} height={24} />
                Conectare cu GitHub
              </>
            )}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
           Nu ai un cont de GitHub?{' '}
            <button
              onClick={handleGitHubSignup}
              className="text-blue-600 hover:underline transition duration-300 transform hover:scale-105"
            >
              Înregistrează-te
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
