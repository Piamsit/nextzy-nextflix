'use client';

import { Play, Info, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@repo/types';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface HeroBannerProps {
    movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
    const t = useTranslations();
    const isMobile = useIsMobile();
    return (
        <div
            className="relative w-full h-screen overflow-hidden box-border"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {isMobile && <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent z-10" />}

            <div className="lg:absolute z-10 h-full flex flex-col justify-end lg:justify-start items-center lg:items-start pb-25 lg:pt-50 px-2 lg:px-15 max-w-screen lg:max-w-2xl mx-auto">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <Image
                        src={"/netflix-series.png"}
                        alt={movie.title}
                        width={isMobile ? 128 : 256}
                        height={48}
                        priority
                    />
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-center  font-light tracking-wide mb-6">
                    <span className="block">{movie.title}</span>
                </h1>

                {!isMobile ? (
                    <>
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={"/netflix-top10.png"}
                                alt={movie.title}
                                width={44}
                                height={44}
                                priority
                            />
                            <span className="text-white text-3xl font-bold">{t("topTVShowToday")}</span>
                        </div>

                        <p className="text-white text-lg mb-6 font-bold line-clamp-3"
                            style={{
                                contentVisibility: 'auto',
                                textRendering: 'optimizeSpeed'
                            }}>
                            {movie.overview}
                        </p>
                        <div className="flex gap-4">
                            <Button className="w-[160px] h-[60px] bg-white text-black hover:bg-gray-300 flex items-center gap-3 px-8 py-3 text-lg font-semibold rounded">
                                <Play className="size-9 fill-black" />
                                <span className='text-2xl font-bold'>{t("play")}</span>
                            </Button>
                            <Button
                                variant="secondary"
                                className="w-[215px] h-[60px] bg-gray-500/70 text-white hover:bg-gray-500/40 flex items-center gap-3 px-8 py-3 text-lg font-semibold rounded"
                                asChild
                            >
                                <Link href={`/${movie.id}`}>
                                    <Info className="size-9" />
                                    <span className='text-2xl font-bold'>{t("moreInfo")}</span>
                                </Link>
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-row w-full items-center justify-center bg-black gap-2 px-2">
                        <Button className="w-1/3 h-full bg-black dark:text-white flex flex-col items-center gap-1 p-0 font-semibold text-lg rounded">
                            <Plus className="size-6 fill-black" />
                            <span className='font-bold text-wrap'>{t("myList")}</span>
                        </Button>
                        <Button className="w-1/3 h-full bg-white text-black hover:bg-gray-300 flex flex-row items-center gap-1 font-semibold text-lg rounded">
                            <Play className="size-6 fill-black" />
                            <span className='font-bold'>{t("play")}</span>
                        </Button>
                        <Button
                            className="w-1/3 h-full bg-black dark:text-white flex flex-col items-center gap-1 font-semibold text-lg rounded"
                            asChild
                        >
                            <Link href={`/${movie.id}`}>
                                <Info className="size-6" />
                                <span className='font-bold'>{t("info")}</span>
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div >
    );
}