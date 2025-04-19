import { Movie } from '@repo/types/movie/entities/movie.entity'
import { useQuery } from '@tanstack/react-query'
import { fetchMovieById } from '../services/movieService'

export const useMovie = ({ movieId, locale }: { movieId: string, locale: string }) =>
    useQuery<Movie>({
        queryKey: ['movie', movieId, locale],
        queryFn: async () => {
            const data = await fetchMovieById(movieId, locale)
            return data;
        },
        enabled: !!movieId,
    })