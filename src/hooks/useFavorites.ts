import fetcher from '@/libs/fetcher';
import { type Movie } from '@prisma/client';
import useSWR from 'swr';

export default function useFavorites() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/favorites',
    fetcher<Movie[]>,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
}
