import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: {
      id: string;
      email: string;
      role: "team-member" | "admin";
      emailVerified: Date;
    };
  }
}
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: "team-member" | "admin";
      emailVerified: Date;
    };
  }
  interface User {
    emailVerified: Date;
    email: string;
    role: "team-member" | "admin";
    emailVerified: Date;
    id: string;
  }
}
