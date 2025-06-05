// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prisma'; 


if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error('Variabilele de mediu GITHUB_CLIENT_ID și GITHUB_CLIENT_SECRET trebuie setate.');
}

export const authOptions: NextAuthOptions = {
  // Configurează Adaptorul Prisma pentru a stoca datele în baza ta de date
  adapter: PrismaAdapter(prisma),

  // Configurează provider-ul GitHub
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
  
    }),
  ],

  session: {
    strategy: 'database', // Folosește baza de date pentru a stoca sesiunile
    maxAge: 30 * 24 * 60 * 60, // 30 de zile (în secunde)
    updateAge: 24 * 60 * 60, // Actualizează sesiunea la fiecare 24 de ore
  },

 
  callbacks: {
    // Callback apelat după crearea/verificarea sesiunii
    async session({ session, user }) {
   
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
 
  },

  
  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
