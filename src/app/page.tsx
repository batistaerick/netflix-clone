'use client';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useMovieList from '@/hooks/useMovieList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data: movies = [] } = useMovieList();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth');
    },
  });

  if (status === 'loading') {
    return <></>;
  }

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending Now" />
      </div>
    </>
  );
}
