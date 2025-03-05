import { prismadb } from '@/libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { User } from '@prisma/client';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { comparePassword } from './crypt';

export const authOptions: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    Credentials({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize,
    }),
  ],
  pages: { signIn: '/auth' },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt', maxAge: 604800 },
  secret: process.env.NEXTAUTH_SECRET,
};

type Credentials = {
  email: string;
  password: string;
};

async function authorize(
  credentials: Partial<Record<'email' | 'password', unknown>>
): Promise<User | null> {
  const { email, password } = credentials as Credentials;

  if (!email || !password) {
    throw new Error('Email and password required');
  }
  const user: User | null = await prismadb.user.findUnique({
    where: { email },
  });

  if (!user?.hashedPassword) {
    throw new Error('Email does not exist');
  }
  const isAuthorized: boolean = await comparePassword(
    password,
    user.hashedPassword
  );

  if (!isAuthorized) {
    throw new Error('Incorrect password');
  }
  return user;
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
