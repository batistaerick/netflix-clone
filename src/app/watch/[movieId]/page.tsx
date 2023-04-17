'use client';
import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface WatchProps {
  params: {
    movieId: string;
  };
}

export default function Watch({ params }: WatchProps) {
  const router = useRouter();
  const { data } = useMovie(params.movieId);

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className={`
          fixed w-full p-4 z-10 flex flex-row items-center gap-8
          bg-black bg-opacity-70
        `}
      >
        <AiOutlineArrowLeft
          className="text-white cursor-pointer"
          size={40}
          onClick={() => router.push('/')}
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
