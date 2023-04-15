'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
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
    <>
      <h1 className="text-4xl text-white">Netflix Clone</h1>
      <p className="text-white">{data?.user?.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
}
