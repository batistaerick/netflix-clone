import MovieCard from '@/components/MovieCard';
import type { Movie } from '@prisma/client';
import { isEmpty } from 'lodash';
import type { JSX } from 'react';

interface MovieListProps {
  data: Movie[];
  title: string;
}

export default function MovieList({ data, title }: Readonly<MovieListProps>) {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="mt-4 space-y-8 px-4 md:px-12">
      <div>
        <p className="mb-4 text-base font-semibold text-white md:text-xl lg:text-2xl">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map(
            (movie: Movie): JSX.Element => (
              <MovieCard key={movie.id} data={movie} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
