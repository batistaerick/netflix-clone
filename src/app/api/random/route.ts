import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function GET() {
  try {
    await serverAuth();

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
