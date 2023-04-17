import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function GET() {
  try {
    await serverAuth();

    const movies = await prismadb.movie.findMany();

    return new Response(JSON.stringify(movies));
  } catch (error) {
    console.error(error);
  }
}
