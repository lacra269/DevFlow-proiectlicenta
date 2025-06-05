// În fișierul: my-app/app/layout.tsx (sau calea ta)

import { Inter } from "next/font/google";
import "./globals.css"; // Asigură-te că acest fișier există și este necesar
import { PostProvider } from "./backand/context/PostContext"; // Ajustează calea dacă este necesar
import SessionProvider from "./providers/SessionProvider"; // Ajustează calea dacă este necesar
import MainLayoutContent from "./components/MainLayoutContent"; // Ajustează calea dacă este necesar
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DEVFLOW",
  description: "Platforma pentru developeri, freelanceri și proiecte inovatoare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Asigură-te că nu există spații sau comentarii între <html lang="ro"> și <body>
    // Structura corectă este ca <body> să fie copilul direct al <html>
    // (Next.js va genera automat tag-ul <head> pe baza 'metadata' și a altor convenții)
    <html lang="ro">
      {/* Nu este necesar un <head> explicit aici dacă folosești metadata API.
          Next.js se va ocupa de generarea lui.
          Cel mai important este să nu existe spații libere între tag-ul <html> și <body>.
      */}
      <body className={inter.className}>
        <SessionProvider>
          <PostProvider>
            <MainLayoutContent>
              {children}
            </MainLayoutContent>
          </PostProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
