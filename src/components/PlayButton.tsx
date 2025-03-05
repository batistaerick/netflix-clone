import { redirect } from 'next/navigation';
import { BsFillPlayFill } from 'react-icons/bs';

interface PlayButtonProps {
  movieId: string;
}

export default function PlayButton({ movieId }: Readonly<PlayButtonProps>) {
  return (
    <button
      className="flex w-auto cursor-pointer flex-row items-center rounded-md bg-white/30 px-2 py-1 text-xs font-semibold transition hover:bg-white/20 md:px-4 md:py-2 lg:text-lg"
      onClick={(): void => redirect(`/watch/${movieId}`)}
    >
      <BsFillPlayFill className="mr-1" size={20} />
      Play
    </button>
  );
}
