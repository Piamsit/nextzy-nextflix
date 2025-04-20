'use client'

import { Movie } from '@repo/types';
import Image from 'next/image'
import Link from 'next/link'

export const MovieCard = ({ movie }: { movie: Movie }) => {
    return (
        <Link href={`/${movie.id}`} className="block">
            <div className="cursor-pointer rounded-xl overflow-hidden hover:scale-105 shadow transition relative">
                <Image
                    src="/netflix-n.png"
                    alt="Netflix N"
                    width={16}
                    height={16}
                    className="absolute top-3 left-3 z-10"
                    priority
                />

                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={165}
                    className="object-cover"
                />
            </div>
        </Link>
    )
}

