import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Movie } from '@repo/types';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MovieService {
    private BASE_URL: string;
    private BEARER_TOKEN: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {
        this.BASE_URL = this.configService.get<string>('TMDB_API_URL');
        this.BEARER_TOKEN = this.configService.get<string>('TMDB_BEARER_TOKEN');
    }

    private get<T>(
        endpoint: string,
        params?: Record<string, unknown>
    ): Observable<T> {
        return this.httpService
            .get<T>(`${this.BASE_URL}${endpoint}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${this.BEARER_TOKEN}`,
                },
                params,
            })
            .pipe(
                map((response) => response.data),
                catchError(() => {
                    throw new Error('Failed to fetch data from TMDB API');
                })
            );
    }

    getMovies(language = 'en-US'): Observable<Movie[]> {
        return this.get('/movie/popular', { language });
    }

    getMovieById(id: number, language = 'en-US'): Observable<Movie> {
        return this.get(`/movie/${id}`, { language });
    }
}
