import serverAuth from '@/lib/serverAuth';

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    return new Response(JSON.stringify(currentUser));
  } catch (error) {
    console.error(error);
  }
}
