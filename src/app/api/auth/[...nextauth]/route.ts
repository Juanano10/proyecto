import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../../libs/mongodb";
import { User } from "../../../../models/user";
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Correo Electrónico", type: "email", placeholder: "jsmith" },
        password: { label: "Contraseña", type: "password", placeholder: "********" },
      },
      async authorize(credentials, req) {
        // Verifica si se proporcionaron todas las credenciales necesarias
        if (!credentials.email || !credentials.password) {
          throw new Error("Por favor, proporciona tanto el correo electrónico como la contraseña");
        }

        await connectDB();

        // Busca el usuario por correo electrónico
        const userFound = await User.findOne({ email: credentials.email }).select('+password');
        
        // Verifica si se encontró el usuario
        if (!userFound) {
          throw new Error("Correo electrónico incorrecto");
        }

        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);

        // Verifica si la contraseña coincide
        if (!passwordMatch) {
          throw new Error("Contraseña incorrecta");
        }

        // Devuelve el objeto de usuario si las credenciales son válidas
        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, session, profile }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: '/',
    signOut: '/',
  },
});

export { handler as GET, handler as POST };
