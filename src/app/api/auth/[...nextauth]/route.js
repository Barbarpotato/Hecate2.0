import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                // check if user exists
                if (!user) throw new Error("user with that email does not exist");

                // check if password is correct
                const isPasswordValid = await bcrypt.compare(credentials?.password, user.password);
                if (!isPasswordValid) throw new Error("incorrect password");

                return user;
            },
        }),
    ],
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt", maxAge: 24 * 60 * 60, // 1 day in seconds
    },
    secret: process.env.JWT_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };