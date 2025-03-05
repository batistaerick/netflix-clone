import { getFetcher } from '@/libs/fetcher';
import { type Movie } from '@prisma/client';
import useSWR, { type SWRResponse } from 'swr';

export default function useFavorites(): SWRResponse<Movie[], Error> {
  return useSWR('/favorites', getFetcher<Movie[]>, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
