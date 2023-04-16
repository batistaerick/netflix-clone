import getCurrentUser from '../../../lib/getCurrentUser';
import prismadb from '../../../lib/prismadb';

export async function GET() {
  try {
    await getCurrentUser();

    const randomIndex = Math.floor(
      Math.random() * (await prismadb.movie.count())
    );
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return new Response(JSON.stringify(randomMovies[0]));
  } catch (error) {
    console.error(error);
  }
}
