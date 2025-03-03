import fetcher from '@/libs/fetcher';
import { Movie } from '@prisma/client';
import useSWR from 'swr';

export default function useMovieList() {
  const { data, error, isLoading } = useSWR('/api/movies', fetcher<Movie[]>, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading };
}
