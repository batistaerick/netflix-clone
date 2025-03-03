import serverAuth from '@/libs/serverAuth';
import type { User } from '@prisma/client';

export async function GET() {
  try {
    const currentUser: User = await serverAuth();
    return new Response(JSON.stringify(currentUser));
  } catch (error) {
    console.error(error);
  }
}
