'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Profiles() {
  const { data, isLoading } = useCurrentUser();

  if (isLoading || !data) {
    return <div />;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-center text-3xl text-white md:text-6xl">
          Who is watching?
        </h1>
        <div className="mt-10 flex items-center justify-center gap-8">
          <button onClick={(): void => redirect('/')}>
            <div className="group mx-auto w-44 flex-row">
              <div className="flex items-center justify-center overflow-hidden rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white">
                <Image
                  src="/images/default-blue.png"
                  alt="default-blue"
                  width={180}
                  height={180}
                />
              </div>
              <div className="mt-4 text-center text-2xl text-gray-400 group-hover:text-white">
                {data?.name}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
