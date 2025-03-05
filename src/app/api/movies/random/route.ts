import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';
import type { Movie } from '@prisma/client';

export async function GET() {
  try {
    await serverAuth();

    const randomIndex: number = Math.floor(
      Math.random() * (await prismadb.movie.count())
    );
    const randomMovies: Movie[] = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return new Response(JSON.stringify(randomMovies[0]));
  } catch (error) {
    console.error(error);
  }
}
