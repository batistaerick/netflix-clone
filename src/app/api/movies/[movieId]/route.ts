import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

interface TypeContext {
  params: {
    movieId: string;
  };
}

export async function GET(request: Request, context: TypeContext) {
  try {
    await serverAuth();

    if (!context.params.movieId || typeof context.params.movieId !== 'string') {
      throw new Error('Invalid Id' + context.params.movieId);
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: context.params.movieId,
      },
    });

    return new Response(JSON.stringify(movies));
  } catch (error) {
    console.error(error);
  }
}
