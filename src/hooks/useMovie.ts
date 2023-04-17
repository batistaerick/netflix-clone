import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

export default function useMovie(id?: string) {
  const movieId = `/api/movies/${id}`;

  const { data, error, isLoading } = useSWR(id && movieId, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  console.log('Test:', data, isLoading);
  return { data, error, isLoading };
}
