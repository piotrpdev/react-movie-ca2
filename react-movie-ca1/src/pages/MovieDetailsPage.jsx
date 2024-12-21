import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getMovie } from "../api/tmdb-api";
import MovieCast from "../components/MovieCast";
import MovieDetails from "../components/MovieDetails";
import Spinner from "../components/Spinner";
import PageTemplate from "../components/TemplateMoviePage";
// import useMovie from "../hooks/useMovie";   Redundant

const MoviePage = () => {
  const { id } = useParams();
  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", { id: id }],
    queryFn: getMovie,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <MovieCast movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
