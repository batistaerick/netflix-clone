import { useRouter } from 'next/navigation';
import { BsFillPlayFill } from 'react-icons/bs';

interface PlayButtonProps {
  movieId: string;
}

export default function PlayButton({ movieId }: PlayButtonProps) {
  const router = useRouter();

  return (
    <button
      className={`
        bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto
        text-xs lg:text-lg font-semibold
        flex flex-row items-center hover:bg-neutral-300 transition
      `}
      onClick={() => router.push(`/watch/${movieId}`)}
    >
      <BsFillPlayFill className="mr-1" size={20} />
      Play
    </button>
  );
}
