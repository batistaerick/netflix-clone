'use client';
import Navbar from '@/components/Navbar';
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
    <div>
      <Navbar />
    </div>
  );
}
