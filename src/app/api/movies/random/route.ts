import currentUser from '@/libs/currentUser';
import { prismadb } from '@/libs/prismadb';
import type { Movie } from '@prisma/client';

export async function GET() {
  try {
    await currentUser();

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
