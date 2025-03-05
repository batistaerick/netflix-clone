import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import type { User } from '@prisma/client';
import { useCallback, useMemo } from 'react';
import type { IconType } from 'react-icons';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';

interface FavoriteButtonProps {
  movieId: string;
}

export default function FavoriteButton({
  movieId,
}: Readonly<FavoriteButtonProps>) {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite: boolean | undefined = useMemo(
    (): boolean | undefined => currentUser?.favoriteIds.includes(movieId),
    [currentUser, movieId]
  );

  const toggleFavorites: () => Promise<void> =
    useCallback(async (): Promise<void> => {
      let response: User;

      if (isFavorite) {
        response = await fetch('/api/favorites', {
          method: 'DELETE',
          body: JSON.stringify({ movieId }),
        }).then((response: Response): Promise<User> => response.json());
      } else {
        response = await fetch('/api/favorites', {
          method: 'POST',
          body: JSON.stringify({ movieId }),
        }).then((response: Response): Promise<User> => response.json());
      }
      const updatedFavoritesIds: string[] = response?.favoriteIds;

      if (currentUser) {
        mutate({ ...currentUser, favoriteIds: updatedFavoritesIds });
      }
      mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon: IconType = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <button
      className="group/item flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10"
      onClick={toggleFavorites}
    >
      <Icon className="w-4 text-white group-hover/item:text-neutral-300 lg:w-6" />
    </button>
  );
}
