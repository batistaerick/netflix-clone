import fetcher from '@/libs/fetcher';
import { Movie } from '@prisma/client';
import useSWR from 'swr';

export default function useMovie(id?: string) {
  const { data, error, isLoading } = useSWR(
    id && `/api/movies/${id}`,
    fetcher<Movie>,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading };
}
