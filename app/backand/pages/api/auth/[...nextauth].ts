import NextAuth from "next-auth";
import { authConfig } from "../../../../../lib/auth"; // Asigură-te că calea este corectă

export default NextAuth(authConfig);
