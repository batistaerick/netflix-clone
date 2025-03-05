import { hashPassword } from '@/libs/crypt';
import currentUser from '@/libs/currentUser';
import { prismadb } from '@/libs/prismadb';
import type { User } from '@prisma/client';

export async function GET() {
  try {
    const user: User = await currentUser();
    return new Response(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    const existingUser: User | null = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response('Error', { status: 422, statusText: 'Email taken' });
    }
    const hashedPassword: string = await hashPassword(password);
    const user: User | null = await prismadb.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });
    return new Response(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
}
