import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = {
          id: "1",
          name: "Anderson Soares",
          email: "anderson.ceu@gmail.com",
          password: "123",
        };

        if (
          user.email === credentials?.email &&
          user.password === credentials.password
        ) {
          return user;
        } else {
          throw new Error("deu ruim");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
