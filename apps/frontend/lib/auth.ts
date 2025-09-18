import { NextAuth } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    KeycloakProvider({
      id: "spring-auth",
      name: "Spring Auth",
      clientId: "nextjs-app",
      clientSecret: "",
      issuer: "http://localhost:9000",
      authorization: { params: { scope: "openid profile message.read" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      return session;
    },
  },
});
