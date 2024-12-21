import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/CardIcons/AddToFavorites";
import AddToToWatchListIcon from "../components/CardIcons/AddToToWatchList";
import Spinner from "../components/Spinner";
import PageTemplate from "../components/TemplateMovieListPage";

const UpcomingMoviesPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["upcoming", { page }],
    queryFn: getUpcomingMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToToWatchListIcon movie={movie} />
          </>
        );
      }}
      page={page}
      setPage={setPage}
      totalPages={data.total_pages}
    />
  );
};
export default UpcomingMoviesPage;
