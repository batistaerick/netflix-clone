import currentUser from '@/libs/currentUser';
import { prismadb } from '@/libs/prismadb';
import type { Movie, User } from '@prisma/client';
import { without } from 'lodash';

export async function POST(request: Request) {
  try {
    const { email } = await currentUser();
    const { movieId } = await request.json();

    const existingMovie: Movie | null = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }
    const user: User = await prismadb.user.update({
      where: { email: email ?? '' },
      data: { favoriteIds: { push: movieId } },
    });
    return new Response(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { email, favoriteIds } = await currentUser();
    const { movieId } = await request.json();

    const existingMovie: Movie | null = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }
    const updatedFavoriteIds: string[] = without(favoriteIds, movieId);

    const updatedUser: User = await prismadb.user.update({
      where: { email: email ?? '' },
      data: { favoriteIds: updatedFavoriteIds },
    });
    return new Response(JSON.stringify(updatedUser));
  } catch (error) {
    console.error(error);
  }
}

export async function GET() {
  try {
    const { favoriteIds } = await currentUser();

    const favoriteMovies: Movie[] = await prismadb.movie.findMany({
      where: { id: { in: favoriteIds } },
    });
    return new Response(JSON.stringify(favoriteMovies));
  } catch (error) {
    console.error(error);
  }
}
