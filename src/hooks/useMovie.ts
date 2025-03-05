import { getFetcher } from '@/libs/fetcher';
import { Movie } from '@prisma/client';
import useSWR, { type SWRResponse } from 'swr';

export default function useMovie(id?: string): SWRResponse<Movie, Error> {
  return useSWR(id && `/movies/${id}`, getFetcher<Movie>, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
