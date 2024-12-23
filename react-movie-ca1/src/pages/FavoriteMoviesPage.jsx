import { useQueries } from "@tanstack/react-query";
import { useContext } from "react";

import { getMovie } from "../api/movies-api";
import RemoveFromFavorites from "../components/CardIcons/RemoveFromFavorites";
import WriteReview from "../components/CardIcons/WriteReview";
import Spinner from "../components/Spinner";
import PageTemplate from "../components/TemplateMovieListPage";
import { MoviesContext } from "../contexts/MoviesContext";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;
