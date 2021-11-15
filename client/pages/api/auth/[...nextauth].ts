import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/db";
import axios from "axios";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
        name: { label: "Ad Soyad", type: "text" },
        token: { label: "Token", type: "text" },
        type: { label: "type", type: "text" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        let user = null;
        let error = null;
        const response: any = await axios({
          params: {
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: credentials.token,
          },
          method: "POST",
          baseURL: "https://www.google.com",
          url: "/recaptcha/api/siteverify",
        })
          .then(function (response) {
            return response.data;
          })
          .catch(function (err) {
            error = err.response.data.error;
            console.error(error);
          });
        if (!response.success) return user;

        if (credentials.type === "login") {
          user = await axios({
            data: {
              username: credentials.username,
              password: credentials.password,
            },
            method: "POST",
            url: "/user/login",
            baseURL: process.env.BASE_API_URL,
          })
            .then(function (response) {
              return response.data;
            })
            .catch(function (err) {
              error = err.response.data.error;
            });
        }
        if (credentials.type === "register") {
          user = await axios({
            data: {
              name: credentials.name,
              username: credentials.username,
              password: credentials.password,
            },
            method: "POST",
            url: "/user/register",
            baseURL: process.env.BASE_API_URL,
          })
            .then(function (response) {
              return response.data;
            })
            .catch(function (err) {
              error = err.response.data.error;
            });
        }
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          throw new Error(error);

          // If you return null or false then the credentials will be rejected

          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (user) {
        session.id = user.id;
        session.role = user.role;
      }
      if (!user && token) {
        session.id = token.id;
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.SECRET_KEY,
  jwt: {
    secret: process.env.SECRET_KEY,
  },
  session: {
    jwt: true,
  },
  pages: { error: "/giris" },
});
