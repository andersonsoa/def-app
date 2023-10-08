import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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
    signIn: "",
    signOut: "",
  },
});

export { handler as GET, handler as POST };
