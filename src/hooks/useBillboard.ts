import fetcher from '@/libs/fetcher';
import type { Movie } from '@prisma/client';
import useSWR from 'swr';

export default function useBillboard() {
  const { data, error, isLoading } = useSWR('/api/random', fetcher<Movie>, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading };
}
