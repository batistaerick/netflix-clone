import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import type { Movie } from '@prisma/client';

export async function GET() {
  try {
    await serverAuth();

    const movies: Movie[] = await prismadb.movie.findMany();

    return new Response(JSON.stringify(movies));
  } catch (error) {
    console.error(error);
  }
}
