import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  const mockMovieService = {
    getMovies: jest.fn(),
    getMovieById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMovies', () => {
    it('should call movieService.getMovies with default lang (en-US)', async () => {
      const mockResult = ['movie1', 'movie2'];
      mockMovieService.getMovies.mockResolvedValue(mockResult);

      const result = await controller.getMovies(undefined);
      expect(result).toEqual(mockResult);
      expect(service.getMovies).toHaveBeenCalledWith('en-US');
    });

    it('should call movieService.getMovies with th language (th-TH)', async () => {
      const mockResult = ['movie1', 'movie2'];
      mockMovieService.getMovies.mockResolvedValue(mockResult);

      const result = await controller.getMovies('th');
      expect(result).toEqual(mockResult);
      expect(service.getMovies).toHaveBeenCalledWith('th-TH');
    });
  });

  describe('getMovieById', () => {
    it('should call movieService.getMovieById with default lang (en-US)', async () => {
      const mockResult = { id: 123, title: 'Test Movie' };
      mockMovieService.getMovieById.mockResolvedValue(mockResult);

      const result = await controller.getMovieById('123');
      expect(result).toEqual(mockResult);
      expect(service.getMovieById).toHaveBeenCalledWith(123, 'en-US');
    });

    it('should call movieService.getMovieById with th language (th-TH)', async () => {
      const mockResult = { id: 123, title: 'Test Movie' };
      mockMovieService.getMovieById.mockResolvedValue(mockResult);

      const result = await controller.getMovieById('123', 'th');
      expect(result).toEqual(mockResult);
      expect(service.getMovieById).toHaveBeenCalledWith(123, 'th-TH');
    });
  });

  describe('Error Handling', () => {
    it('should throw an error if movieService fails to fetch movies', async () => {
      mockMovieService.getMovies.mockRejectedValue(new Error('Service unavailable'));

      await expect(controller.getMovies(undefined)).rejects.toThrow('Service unavailable');
    });

    it('should throw an error if movieService fails to fetch movie by id', async () => {
      mockMovieService.getMovieById.mockRejectedValue(new Error('Movie not found'));

      await expect(controller.getMovieById('999')).rejects.toThrow('Movie not found');
    });
  });
});
