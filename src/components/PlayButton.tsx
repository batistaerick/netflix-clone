import { useRouter } from 'next/navigation';
import { BsFillPlayFill } from 'react-icons/bs';

interface PlayButtonProps {
  movieId: string;
}

export default function PlayButton({ movieId }: PlayButtonProps) {
  const { push } = useRouter();

  return (
    <button
      className="flex w-auto flex-row items-center rounded-md bg-white px-2 py-1 text-xs font-semibold transition hover:bg-neutral-300 md:px-4 md:py-2 lg:text-lg"
      onClick={(): void => push(`/watch/${movieId}`)}
    >
      <BsFillPlayFill className="mr-1" size={20} />
      Play
    </button>
  );
}
