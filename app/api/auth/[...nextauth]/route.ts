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
      // Poți solicita permisiuni suplimentare (scope) dacă este necesar
      // profile(profile) {
      //   // Poți modifica datele profilului returnate de GitHub înainte de a fi salvate
      //   return {
      //     id: profile.id.toString(),
      //     name: profile.name ?? profile.login,
      //     email: profile.email,
      //     image: profile.avatar_url,
      //   }
      // }
    }),
    // Poți adăuga alți provideri aici (Google, etc.)
  ],

  // Strategia de sesiune - 'jwt' sau 'database'
  // 'database' este recomandată când folosești un adaptor
  session: {
    strategy: 'database', // Folosește baza de date pentru a stoca sesiunile
    maxAge: 30 * 24 * 60 * 60, // 30 de zile (în secunde)
    updateAge: 24 * 60 * 60, // Actualizează sesiunea la fiecare 24 de ore
  },

  // Pagini personalizate (opțional)
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for email/passwordless login)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },

  // Callbacks pentru a personaliza fluxul de autentificare
  callbacks: {
    // Callback apelat după crearea/verificarea sesiunii
    async session({ session, user }) {
      // Adaugă ID-ul utilizatorului la obiectul de sesiune
      // pentru a-l putea accesa ușor în componentele client/server
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    // Poți adăuga alte callbacks (signIn, jwt, redirect) dacă ai nevoie de logică suplimentară
    // async signIn({ user, account, profile, email, credentials }) {
    //   const isAllowedToSignIn = true // Adaugă logica ta de permisiune aici
    //   if (isAllowedToSignIn) {
    //     return true
    //   } else {
    //     // Return false to display a default error message
    //     return false
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // }
  },

  // Secretul folosit pentru semnarea JWT și cookie-uri (preluat din .env)
  secret: process.env.NEXTAUTH_SECRET,

  // Opțiuni de debug (utile în dezvoltare)
  debug: process.env.NODE_ENV === 'development',
};

// Exportă handler-ul NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
