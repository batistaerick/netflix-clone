import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

export default function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
