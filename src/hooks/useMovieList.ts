import { getFetcher } from '@/libs/fetcher';
import { Movie } from '@prisma/client';
import useSWR, { type SWRResponse } from 'swr';

export default function useMovieList(): SWRResponse<Movie[], Error> {
  return useSWR('/movies', getFetcher<Movie[]>, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
