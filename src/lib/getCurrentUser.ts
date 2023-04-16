import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import prismadb from './prismadb';

export default async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error('Email: Not signed in');
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }
  return { currentUser };
}
