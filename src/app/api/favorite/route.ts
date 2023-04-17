import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { without } from 'lodash';

export async function POST(request: Request) {
  try {
    const {
      currentUser: { email },
    } = await serverAuth();
    const { movieId } = await request.json();

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }
    const user = await prismadb.user.update({
      where: {
        email: email || '',
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });
    return new Response(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const {
      currentUser: { email, favoriteIds },
    } = await serverAuth();
    const { movieId } = await request.json();

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }
    const updatedFavoriteIds = without(favoriteIds, movieId);

    const user = await prismadb.user.update({
      where: {
        email: email || '',
      },
      data: {
        favoriteIds: {
          push: updatedFavoriteIds,
        },
      },
    });
    return new Response(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
}
