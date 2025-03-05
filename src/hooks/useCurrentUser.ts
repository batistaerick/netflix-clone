import fetcher from '@/libs/fetcher';
import type { User } from '@prisma/client';
import useSWR from 'swr';

export default function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/users',
    fetcher<User>
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
