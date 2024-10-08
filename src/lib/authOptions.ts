import { AuthOptions } from "next-auth";
import { userCollection } from "@/models/User";
import { ErrorHandler } from "@/utils/errorHandler";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDatabase } from "@/db/connectDb";
import { User } from "next-auth";
export const authOptions: AuthOptions = {
    session: {
      strategy: "jwt",
    },
  
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            placeholder: "Enter email id",
            type: "email",
          },
          password: {
            label: "Password",
            placeholder: "Enter password",
            type: "password",
          },
        },
  
        async authorize(credentials, req) {
          console.log({ credentials });
          if (!credentials?.email)
            throw new ErrorHandler("Please provide email id", 400);
          if (!credentials?.password)
            throw new ErrorHandler("Please provide password", 400);
          await connectDatabase();
          const user = await userCollection.findOne({
            email: credentials?.email,
          });
          if (!user) throw new ErrorHandler("User doesn't exists", 404);
          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password!,
            user.password
          );
          if (!isPasswordCorrect) throw new ErrorHandler("Invalid password", 400);
          return {
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
            id: String(user.id),
            image: undefined,
            name: undefined,
          };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) token.user = user as User;
        return token;
      },
      async session({ token, session }) {
        if (token) session.user = token.user;
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
  };