import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function GET(request: Request) {
  try {
    await serverAuth();

    const test = await request.json();
    console.log('MovieID:', test);

    const { movieId } = await request.json();

    if (!movieId || typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return new Response(JSON.stringify(movies));
  } catch (error) {
    console.error(error);
  }
}
