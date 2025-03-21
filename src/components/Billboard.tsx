import PlayButton from '@/components/PlayButton';
import useBillboard from '@/hooks/useBillboard';
import useInfoModal from '@/hooks/useInfoModal';
import { useCallback } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function Billboard() {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal: () => void = useCallback(
    (): void => openModal(data?.id ?? ''),
    [openModal, data?.id]
  );

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="h-[56.25vw] w-full object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      />
      <div className="absolute top-[30%] ml-4 md:top-[40%] md:ml-16">
        <p className="h-full w-[50%] text-xl font-bold text-white drop-shadow-xl md:text-5xl lg:text-6xl">
          {data?.title}
        </p>
        <p className="mt-3 w-[90%] text-[8px] text-white drop-shadow-xl md:mt-8 md:w-[80%] md:text-lg lg:w-[50%]">
          {data?.description}
        </p>
        <div className="mt-3 flex flex-row items-center gap-3 md:mt-4">
          <PlayButton movieId={data?.id ?? ''} />
          <button
            className="flex w-auto cursor-pointer flex-row items-center rounded-md bg-white/30 px-2 py-1 text-xs font-semibold text-white transition hover:bg-white/20 md:px-4 md:py-2 lg:text-lg"
            onClick={handleOpenModal}
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
