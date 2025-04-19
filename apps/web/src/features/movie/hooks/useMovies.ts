import { Movie } from '@repo/types/movie/entities/movie.entity'
import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from '../services/movieService'

export const useMovies = ({ locale }: { locale: string }) =>
    useQuery<Movie[]>({
        queryKey: ['movies', locale],
        queryFn: async () => {
            const data = await fetchMovies(locale)
            return data.results
        },
    })