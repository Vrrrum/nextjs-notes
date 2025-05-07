import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@/app/generated/prisma';
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({ where: { email: credentials.email } });

                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    username: user.username || "",
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login",  // Możesz odczytać `error` z query param
        newUser: "/register", // Umożliwia rejestrację
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
            }
            return session;
        },
    },
};
