import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import authConfig from "@/auth.config";

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
      session.user.role = token?.role;
      session.user.id = token?.sub;     // Para incluir ID de usuario
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await prisma.user.findUnique({   where: { id: token.sub }   }); 
      if (!user) return token;

      token.role = user?.role;
      return token;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({ ...options, ...authConfig });
