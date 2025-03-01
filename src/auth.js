import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import authConfig from "@/auth.config";
import { getUserById } from "@/lib/data";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const options = {
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },

  callbacks: {
    async session({ session, token }) {
      session.user.id = token?.sub;     // Para recuperar ID de usuario desde el token
      session.user.role = token?.role   // Para recuperar rol de usuario desde el token
      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub)
      if (!user) return token;

      token.role = user?.role
      return token
    }
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({ ...options, ...authConfig });
