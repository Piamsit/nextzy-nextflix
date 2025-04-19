'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useMovieId } from '../lib/useMovieId'
import { useMovie } from '../hooks/useMovie'
import { Play, Plus, Info, Star, Calendar, Globe, Users, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/useIsMobile'
import { MovieLoading } from '@/components/state/MovieLoading'
import { MovieError } from '@/components/state/MovieError'
import { MovieNotFound } from '@/components/state/MovieNotFound'

export const MovieDetailPage = () => {
  const router = useRouter()
  const movieId = useMovieId()
  const isMobile = useIsMobile()
  const { data: movie, isPending, isError } = useMovie({ movieId })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (isPending) {
    return <MovieLoading />
  }

  if (isError) {
    return <MovieError message="Failed to load movie details" />
  }

  if (!movie) {
    return <MovieNotFound />
  }

  return (
    <div className="relative min-h-screen text-white bg-black overflow-x-hidden">
      {movie.backdrop_path && (
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90 z-10" />
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className={`object-cover z-0 transform scale-110 ${isLoaded ? 'animate-kenburns' : ''}`}
            priority
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      )}

      <div className={`absolute top-[15vh] sm:top-[10vh] px-4 sm:px-6 md:px-16 w-full z-20 pb-20 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col items-center gap-6 md:gap-10 max-w-7xl mx-auto">

          {movie.poster_path && (
            <div className={`${isMobile ? 'mx-auto mb-6' : 'hidden sm:block'} min-w-[180px] md:min-w-[300px] transform transition-all duration-300 hover:scale-105 group mx-auto md:mx-0`}>
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-xl transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold">
                    <Play className="mr-2" /> Watch Now
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-center md:text-left text-white">
              {movie.title}
            </h1>

            <div className="text-white mb-4 sm:mb-6 space-x-2 sm:space-x-3 text-sm sm:text-lg md:text-xl font-medium flex flex-wrap justify-center md:justify-start gap-y-2">
              <span className="bg-red-600/90 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
                <Calendar className="size-4 sm:size-5" /> {movie.release_date?.split('-')[0]}
              </span>
              <span className="bg-gray-800/90 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
                <Globe className="size-4 sm:size-5" /> {movie.original_language?.toUpperCase()}
              </span>
              <span className="bg-gray-800/90 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="size-4 sm:size-5 fill-yellow-400 text-yellow-400" /> {movie.vote_average?.toFixed(1)}/10
              </span>
              {movie.adult &&
                <span className="bg-red-700/90 px-2 sm:px-3 py-1 rounded-full font-bold flex items-center gap-1">
                  <Users className="size-4 sm:size-5" /> 18+
                </span>
              }
            </div>

            <div className="flex justify-center md:justify-start flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fadeIn">
              <Button className="bg-white text-black hover:bg-gray-300 flex items-center gap-1 sm:gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105">
                <Play className="size-5 sm:size-6 md:size-7 fill-black" />
                <span>Play</span>
              </Button>
              <Button className="bg-gray-700/90 text-white hover:bg-gray-600 flex items-center gap-1 sm:gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105">
                <Plus className="size-5 sm:size-6 md:size-7" />
                <span>My List</span>
              </Button>
              <Button className="text-white dark:bg-gray-800/80 hover:bg-gray-800/80 flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl font-semibold rounded-full transition-all duration-300 border border-gray-500/50">
                <Info className="size-5 sm:size-6 md:size-7" />
                <span>Info</span>
              </Button>
            </div>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 text-white max-w-3xl bg-black/50 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-gray-800/50 text-left mx-auto md:mx-0 animate-fadeIn">
              {movie.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 bg-black/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-800/50 transform transition-all duration-500 hover:scale-[1.02]">
              <div className="transition-all duration-300 hover:text-white hover:bg-gray-800/70 p-3 rounded-lg flex items-center gap-2">
                <Info className="size-5 text-red-500" />
                <div className='ml-2'>
                  <span className="font-semibold text-white block">Original Title</span>
                  <span>{movie.original_title}</span>
                </div>
              </div>
              <div className="transition-all duration-300 hover:text-white hover:bg-gray-800/70 p-3 rounded-lg flex items-center gap-2">
                <Star className="size-5 text-yellow-500" />
                <div className='ml-2'>
                  <span className="font-semibold text-white block">Popularity</span>
                  <span>{movie.popularity?.toFixed(0)} points</span>
                </div>
              </div>
              <div className="transition-all duration-300 hover:text-white hover:bg-gray-800/70 p-3 rounded-lg flex items-center gap-2">
                <Video className="size-5 text-green-500" />
                <div className='ml-2'>
                  <span className="font-semibold text-white block">Video</span>
                  <span className={movie.video ? 'text-green-400' : 'text-red-400'}>
                    {movie.video ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>
              <div className="transition-all duration-300 hover:text-white hover:bg-gray-800/70 p-3 rounded-lg flex items-center gap-2">
                <Calendar className="size-5 text-purple-500" />
                <div className='ml-2'>
                  <span className="font-semibold text-white block">Release Date</span>
                  <span>{movie.release_date}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <Button
                onClick={() => router.back()}
                className="mt-4 sm:mt-8 border-white text-white dark:text-black hover:bg-white hover:text-black font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 text-base sm:text-lg group"
              >
                <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span> Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
