import { auth } from '@/libs/auth';
import { prismadb } from '@/libs/prismadb';
import type { User } from '@prisma/client';
import type { Session } from 'next-auth';

export default async function serverAuth(): Promise<User> {
  const session: Session | null = await auth();

  if (!session?.user?.email) {
    throw new Error('Email: Not signed in');
  }
  const currentUser: User | null = await prismadb.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }
  return currentUser;
}
