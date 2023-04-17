import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function GET() {
  try {
    const {
      currentUser: { favoriteIds },
    } = await serverAuth();

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: favoriteIds,
        },
      },
    });
    return new Response(JSON.stringify(favoriteMovies));
  } catch (error) {
    console.error(error);
  }
}
