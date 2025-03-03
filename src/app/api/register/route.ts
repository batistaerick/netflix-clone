import { prismadb } from '@/libs/prismadb';
import type { User } from '@prisma/client';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    const existingUser: User | null = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response('Error', { status: 422, statusText: 'Email taken' });
    }
    const hashedPassword: string = await hash(password, 12);
    const user: User | null = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });
    return new Response(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
}
