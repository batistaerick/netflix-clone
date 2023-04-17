import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

export default function useMovie(id?: string) {
  const { data, error, isLoading } = useSWR(
    id && `/api/movies/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading };
}
