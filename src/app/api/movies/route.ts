import currentUser from '@/libs/currentUser';
import { prismadb } from '@/libs/prismadb';
import type { Movie } from '@prisma/client';

export async function GET() {
  try {
    await currentUser();

    const movies: Movie[] = await prismadb.movie.findMany();

    return new Response(JSON.stringify(movies));
  } catch (error) {
    console.error(error);
  }
}
