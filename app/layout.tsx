import { Inter } from "next/font/google";
import "./globals.css"; 
import { PostProvider } from "./backand/context/PostContext"; 
import SessionProvider from "./providers/SessionProvider"; 
import MainLayoutContent from "./components/MainLayoutContent"; 
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

    <html lang="ro">
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
