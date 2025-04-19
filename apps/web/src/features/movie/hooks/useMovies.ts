import { Movie } from '@repo/types/movie/entities/movie.entity'
import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from '../services/movieService'

export const useMovies = () =>
    useQuery<Movie[]>({
        queryKey: ['movies'],
        queryFn: async () => {
            const data = await fetchMovies()
            return data.results
        },
    })