import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

import FilterCard from "./FilterMoviesCard";
import Header from "./HeaderMovieList";
import MovieList from "./MovieList";

function MovieListPageTemplate({
  movies,
  title,
  action,
  page,
  setPage,
  totalPages,
}) {
  const currentYear = new Date().getFullYear();

  const [nameFilter, setNameFilter] = useState("");
  const [overviewFilter, setOverviewFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState([1895, currentYear]);
  const [movieSort, setMovieSort] = useState("none");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return (
        m.overview.toLowerCase().search(overviewFilter.toLowerCase()) !== -1
      );
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return languageFilter !== "all"
        ? m.original_language === languageFilter
        : true;
    })
    .filter((m) => {
      const release_year = m.release_date.split("-")[0];
      return release_year >= yearFilter[0] && release_year <= yearFilter[1];
    })
    .sort((a, b) => {
      switch (movieSort) {
        case "popularity-asc":
          return a.popularity - b.popularity;
        case "popularity-desc":
          return b.popularity - a.popularity;
        case "vote_average-asc":
          return a.vote_average - b.vote_average;
        case "vote_average-desc":
          return b.vote_average - a.vote_average;
        case "release_year-asc":
          return (
            Number(a.release_date.split("-")[0]) -
            Number(b.release_date.split("-")[0])
          );
        case "release_year-desc":
          return (
            Number(b.release_date.split("-")[0]) -
            Number(a.release_date.split("-")[0])
          );
        default:
          return 0;
      }
    });

  const handleChange = (type, value) => {
    switch (type) {
      case "name":
        setNameFilter(value);
        break;
      case "overview":
        setOverviewFilter(value);
        break;
      case "genre":
        setGenreFilter(value);
        break;
      case "language":
        setLanguageFilter(value);
        break;
      case "year":
        setYearFilter(value);
        break;
      case "sort":
        setMovieSort(value);
        break;
      default:
        break;
    }
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      {typeof totalPages === "undefined" ? null : (
        <Grid size={12} sx={{ padding: "20px" }}>
          <Pagination
            sx={{ display: "flex", justifyContent: "space-around" }}
            count={totalPages}
            siblingCount={3}
            size="large"
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Grid>
      )}
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            languageFilter={languageFilter}
            overviewFilter={overviewFilter}
            yearFilter={yearFilter}
            sort={movieSort}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
