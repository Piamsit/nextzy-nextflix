import { Movie } from '@repo/types/movie/entities/movie.entity'
import { useQuery } from '@tanstack/react-query'
import { fetchMovieById } from '../services/movieService'

export const useMovie = ({ movieId }: { movieId: string }) =>
    useQuery<Movie>({
        queryKey: ['movie', movieId],
        queryFn: async () => {
            const data = await fetchMovieById(movieId)
            return data;
        },
        enabled: !!movieId,
    })