import getCurrentUser from '../../../lib/getCurrentUser';
import prismadb from '../../../lib/prismadb';

export async function GET() {
  try {
    await getCurrentUser();

    const movies = await prismadb.movie.findMany();

    return new Response(JSON.stringify(movies));
  } catch (error) {
    console.error(error);
  }
}
