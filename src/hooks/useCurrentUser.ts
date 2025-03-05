import { getFetcher } from '@/libs/fetcher';
import type { User } from '@prisma/client';
import useSWR, { type SWRResponse } from 'swr';

export default function useCurrentUser(): SWRResponse<User, Error> {
  return useSWR('/users', getFetcher<User>);
}
