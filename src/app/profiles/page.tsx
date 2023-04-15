'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Profiles() {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth');
    },
  });

  if (status === 'loading') {
    return <></>;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className="text-3xl text-white text-center md:text-6xl">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push('/')}>
            <div className="group flex-row w-44 mx-auto">
              <div
                className={`
                  w-44 h-44 rounded-md flex items-center justify-center
                  border-2 border-transparent overflow-hidden
                  group-hover:cursor-pointer group-hover:border-white
                `}
              >
                <img src="/images/default-blue.png" alt="default-blue" />
              </div>
              <div
                className={`
                  mt-4 text-gray-400 text-2xl text-center
                  group-hover:text-white
                `}
              >
                {data.user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
