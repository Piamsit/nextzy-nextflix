"use client";

import { MovieCard } from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";
import Header from "@/components/layout/Header";
import HeroBanner from "@/features/movie/components/HeroBanner";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export const MoviePage = () => {
    const { data: movies, isLoading, error } = useMovies();

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Failed to load</p>;
    }

    if (!movies || movies.length === 0) {
        return <p className="text-center text-red-500">No movies found</p>;
    }

    const heroMovie = movies[0];

    return (
        <main className="max-w-screen min-h-screen bg-black text-white">
            <Header />

            {heroMovie && <HeroBanner movie={heroMovie} />}
            <section className="-mt-20 lg:-mt-36 relative z-20">
                <div className="px-4 lg:px-16 py-5">
                    <h2 className="text-2xl font-bold mb-4">Popular on Netflix</h2>
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
        </main>
    );
};
