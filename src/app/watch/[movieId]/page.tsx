'use client';
import useMovie from '@/hooks/useMovie';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface WatchProps {
  params: Promise<{ movieId: string }>;
}

export default function Watch({ params }: Readonly<WatchProps>) {
  const { push }: AppRouterInstance = useRouter();
  const [movieId, setMovieId] = useState<string | null>(null);

  useEffect((): void => {
    params.then(({ movieId }): void => setMovieId(movieId));
  }, [params]);

  const { data } = useMovie(movieId ?? '');

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed z-10 flex w-full flex-row items-center gap-8 bg-black/70 p-4">
        <AiOutlineArrowLeft
          className="cursor-pointer text-white"
          size={40}
          onClick={() => push('/')}
        />
        <p className="text-white">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video className="h-full w-full" src={data?.videoUrl} autoPlay controls />
    </div>
  );
}
