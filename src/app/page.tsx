'use client';
import Billboard from '@/components/Billboard';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { status } = useSession({
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
      <Navbar />
      <Billboard />
    </>
  );
}
