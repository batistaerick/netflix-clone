import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import type { Movie } from '@prisma/client';

export async function GET() {
  try {
    const { favoriteIds } = await serverAuth();

    const favoriteMovies: Movie[] = await prismadb.movie.findMany({
      where: { id: { in: favoriteIds } },
    });
    return new Response(JSON.stringify(favoriteMovies));
  } catch (error) {
    console.error(error);
  }
}
