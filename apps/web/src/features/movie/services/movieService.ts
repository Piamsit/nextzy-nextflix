import { Movie, MovieResponse } from '@repo/types/movie/entities/movie.entity';
import axios from 'axios';

export const fetchMovies = async (locale = 'en'): Promise<MovieResponse> => {
    const response = await axios.get<MovieResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/movie?lang=${locale}`)
    return response.data
}

export const fetchMovieById = async (movieId: string, locale = 'en'): Promise<Movie> => {
    const { data } = await axios.get<Movie>(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${movieId}?lang=${locale}`)
    return data
}
