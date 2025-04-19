import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { MovieService } from './movie.service';

@Controller('movie')
@ApiQuery({
    name: 'lang',
    required: false,
    description: 'Language code (e.g. "en", "th")',
})
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Get()
    async getMovies(@Query('lang') lang = 'en-US') {
        const language = this.mapLanguage(lang);
        return this.movieService.getMovies(language);
    }

    @Get(':id')
    async getMovieById(@Param('id') id: string, @Query('lang') lang = 'en-US') {
        const language = this.mapLanguage(lang);
        return this.movieService.getMovieById(Number(id), language);
    }

    private mapLanguage(lang: string): string {
        return lang.toLowerCase() === 'th' ? 'th-TH' : 'en-US';
    }
}
