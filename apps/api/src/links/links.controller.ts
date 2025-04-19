import { Controller, Get, Param } from '@nestjs/common';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
    constructor(private readonly linksService: LinksService) { }

    @Get()
    findAll() {
        return this.linksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.linksService.findOne(+id);
    }
}
