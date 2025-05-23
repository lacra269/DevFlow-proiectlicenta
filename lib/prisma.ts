// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Declară o variabilă globală pentru a stoca instanța PrismaClient
// Acest lucru previne crearea de multiple instanțe în modul de dezvoltare
// datorită reîncărcării modulelor de către Next.js (Hot Module Replacement).
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Creează instanța PrismaClient dacă nu există deja în global, altfel o refolosește.
// În producție, `globalThis.prisma` va fi mereu undefined la început.
const prisma = globalThis.prisma || new PrismaClient();

// Dacă suntem în dezvoltare, stochează instanța în global.
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Exportă instanța configurată.
export default prisma;
