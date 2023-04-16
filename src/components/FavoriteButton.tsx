import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';

interface FavoriteButtonProps {
  movieId: string;
}

export default function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const { mutate: mutateFavorites } = useFavorites();
  const { data, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = data?.favoriteIds || [];
    return list.includes(movieId);
  }, [data, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }
    const updatedFavoritesIds = response?.data?.favoriteIds;

    mutate({
      ...data,
      favoriteIds: updatedFavoritesIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, data, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className={`
        cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10
        flex justify-center items-center transition
        border-white rounded-full
        hover:border-neutral-300
      `}
      onClick={toggleFavorites}
    >
      <Icon className="text-white" size={25} />
    </div>
  );
}
