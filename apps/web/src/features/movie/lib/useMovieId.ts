import { useParams } from "next/navigation";

export const useMovieId = () => {
    const params = useParams();
    return params.movieId as string;
};
