import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpService: HttpService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const configMap: Record<string, string> = {
        TMDB_API_URL: 'https://api.themoviedb.org/3',
        TMDB_BEARER_TOKEN: 'mock-token',
      };
      return configMap[key] ?? null;
    }),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  const createMockResponse = <T>(data: T): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: undefined, params: undefined },
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    httpService = module.get<HttpService>(HttpService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return popular movies on success', async () => {
      const mockData = { results: ['movie1', 'movie2'] };
      const response: AxiosResponse = {
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };

      mockHttpService.get.mockReturnValue(of(response));

      const result = await service.getMovies('en-US').toPromise();
      expect(result).toEqual(mockData);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/popular',
        expect.objectContaining({
          params: { language: 'en-US' },
        })
      );
    });

    it('should handle API failure gracefully', async () => {
      const errorResponse = new Error('Failed to fetch data from TMDB API');
      mockHttpService.get.mockReturnValue(throwError(() => errorResponse));

      await expect(service.getMovies('en-US').toPromise()).rejects.toThrow(
        'Failed to fetch data from TMDB API'
      );
    });
  });

  describe('getMovieById', () => {
    it('should return movie data for a valid ID', async () => {
      const mockData = { id: 123, title: 'Inception' };
      const response: AxiosResponse = {
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };

      mockHttpService.get.mockReturnValue(of(response));

      const result = await service.getMovieById(123, 'en-US').toPromise();
      expect(result).toEqual(mockData);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/123',
        expect.objectContaining({
          params: { language: 'en-US' },
        })
      );
    });

    it('should throw error if the movie ID is invalid or API fails', async () => {
      const errorResponse = new Error('Failed to fetch data from TMDB API');
      mockHttpService.get.mockReturnValue(throwError(() => errorResponse));

      await expect(service.getMovieById(999, 'en-US').toPromise()).rejects.toThrow(
        'Failed to fetch data from TMDB API'
      );
    });
  });
});
