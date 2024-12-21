import { useQueries } from "@tanstack/react-query";
import { useContext } from "react";

import { getMovie } from "../api/tmdb-api";
import RemoveFromToWatch from "../components/CardIcons/RemoveFromToWatch";
import WriteReview from "../components/CardIcons/WriteReview";
import Spinner from "../components/Spinner";
import PageTemplate from "../components/TemplateMovieListPage";
import { MoviesContext } from "../contexts/MoviesContext";

const ToWatchMoviesPage = ({ session }) => {
  const { toWatchMovies: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const toWatchMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });
  // Check if any of the parallel queries is still loading.
  const isLoading = toWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = toWatchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="To Watch Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromToWatch movie={movie} />
            <WriteReview movie={movie} session={session} />
          </>
        );
      }}
    />
  );
};

export default ToWatchMoviesPage;
