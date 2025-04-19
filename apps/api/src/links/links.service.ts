import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Link } from '@repo/types/links/entities/link.entity';

@Injectable()
export class LinksService {
    private readonly _links: Link[];

    constructor(private configService: ConfigService) {
        const frontendOrigin = this.configService.get<string>('FRONTEND_ORIGIN');
        const apiUrl = this.configService.get<string>('API_URL');

        this._links = [
            {
                id: 0,
                title: 'Docs',
                url: 'https://turbo.build/docs',
                description: 'Find in-depth information about Turborepo features and API.',
            },
            {
                id: 1,
                title: 'Learn',
                url: 'https://turbo.build/docs/handbook',
                description: 'Learn more about monorepos with our handbook.',
            },
            {
                id: 2,
                title: 'Templates',
                url: 'https://turbo.build/docs/getting-started/from-example',
                description: 'Choose from over 15 examples and deploy with a single click.',
            },
            {
                id: 3,
                title: 'Deploy',
                url: 'https://vercel.com/new',
                description: 'Instantly deploy your Turborepo to a shareable URL with Vercel.',
            },
            {
                id: 4,
                title: 'ENV FRONTEND_ORIGIN',
                url: `FRONTEND_ORIGIN: ${frontendOrigin}`,
                description: 'Test ENV FRONTEND_ORIGIN value',
            },
            {
                id: 4,
                title: 'ENV API_URL',
                url: `API_URL: ${apiUrl}`,
                description: 'Test ENV API_URL value',
            },
        ];
    }

    findAll() {
        return this._links;
    }

    findOne(id: number) {
        return `This action returns a #${id} link`;
    }
}
