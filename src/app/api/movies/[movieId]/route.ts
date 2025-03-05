import currentUser from '@/libs/currentUser';
import { prismadb } from '@/libs/prismadb';
import type { Movie } from '@prisma/client';

interface TypeContext {
  params: Promise<{ movieId: string }>;
}

export async function GET(_: Request, { params }: TypeContext) {
  try {
    await currentUser();
    const { movieId } = await params;

    if (!movieId || typeof movieId !== 'string') {
      throw new Error('Invalid Id' + movieId);
    }
    const movies: Movie | null = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    return new Response(JSON.stringify(movies));
  } catch (error) {
    console.error(error);
  }
}
