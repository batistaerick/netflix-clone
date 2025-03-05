import { getFetcher } from '@/libs/fetcher';
import type { Movie } from '@prisma/client';
import useSWR, { type SWRResponse } from 'swr';

export default function useBillboard(): SWRResponse<Movie, Error> {
  return useSWR('/movies/random', getFetcher<Movie>, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
