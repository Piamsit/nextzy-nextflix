import { Movie, MovieResponse } from '@repo/types/movie/entities/movie.entity';
import axios from 'axios';

export const fetchMovies = async (): Promise<MovieResponse> => {
    const response = await axios.get<MovieResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/movie`)
    return response.data
}

export const fetchMovieById = async (movieId: string): Promise<Movie> => {
    const { data } = await axios.get<Movie>(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${movieId}`)
    return data
}
