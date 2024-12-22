import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const NEXT_AUTH ={
    providers: [
      CredentialsProvider({
        name: "Email",
        credentials: {
          username: {
            label: "email",
            type: "email",
            placeholder: "Enter Email",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Enter Password",
          },
        },
        async authorize(credentials) {
          console.log(credentials);
          return {
            id: "User1",
            name: "Aakash KC",
            email: "kcaakash04",
          };
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      jwt: ({ token }) => {
        token.userid = token.sub;
        console.log(token);
        return token;
      },
      session: ({ token, session }) => {
        if (session && session.user) {
          session.user.id = token.userid;
        }
        return session;
      },
    },
  }