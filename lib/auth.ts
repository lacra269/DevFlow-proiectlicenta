import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

export const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],

  adapter: PrismaAdapter(prisma),

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        try {
          // Căutăm contul existent în baza de date
          const existingAccount = await prisma.account.findUnique({
            where: {
              providerAccountId_provider: {
                providerAccountId: account.providerAccountId,
                provider: account.provider,
              },
            },
            select: {
              user: true,
            },
          });

          // Dacă nu găsim contul, îl creăm
          if (!existingAccount) {
            await prisma.user.create({
              data: {
                name: user.name || null,
                email: user.email,
                image: user.image || null,
              },
            });
          }

        } catch (error) {
          console.error("Error saving user in DB:", error);
        }
      }
      return true;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 5 * 60,
    updateAge: 1 * 60,
  },
};

export default NextAuth(authConfig);
