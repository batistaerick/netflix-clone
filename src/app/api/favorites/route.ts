import serverAuth from '@/lib/getCurrentUser';
import prismadb from '@/lib/prismadb';

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
