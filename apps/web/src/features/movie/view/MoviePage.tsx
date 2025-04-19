"use client";

import { MovieCard } from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";
import HeroBanner from "@/features/movie/components/HeroBanner";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieLoading } from "@/components/state/MovieLoading";
import { MovieError } from "@/components/state/MovieError";
import { MovieNotFound } from "@/components/state/MovieNotFound";
import { useLocale, useTranslations } from "next-intl";

export const MoviePage = () => {
    const locale = useLocale();
    const t = useTranslations();
    const { data: movies, isLoading, isError } = useMovies({ locale });

    if (isLoading) {
        return <MovieLoading />
    }

    if (isError) {
        return <MovieError />
    }

    if (!movies || movies.length === 0) {
        return <MovieNotFound />
    }

    const heroMovie = movies[0];

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            {heroMovie && <HeroBanner movie={heroMovie} />}
            <section className="-mt-20 lg:-mt-30 relative z-20">
                <div className="px-4 lg:px-16 py-5">
                    <h2 className="text-3xl font-bold mb-4">{t("popularOnNetflix")}</h2>
                    <Carousel
                        opts={{
                            align: "start",
                            slidesToScroll: 6,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2">
                            {movies.map((movie) => (
                                <CarouselItem
                                    key={movie.id}
                                    className="p-2 basis-[110px] md:basis-[220px] lg:basis-[250px]"
                                >
                                    <MovieCard movie={movie} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="bg-transparent border-0 h-full" />
                        <CarouselNext className="bg-transparent border-0 h-full" />
                    </Carousel>
                </div>
            </section>
        </div>
    );
};
