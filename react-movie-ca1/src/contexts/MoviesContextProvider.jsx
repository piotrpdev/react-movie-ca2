import { useEffect, useState } from "react";

import { MoviesContext } from "./MoviesContext";

// https://stackoverflow.com/a/71402775/19020549

const getStoredFavorites = () =>
  JSON.parse(localStorage.getItem("favorites")) || [];
const getStoredToWatchMovies = () =>
  JSON.parse(localStorage.getItem("toWatchMovies")) || [];

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState(getStoredFavorites());
  const [toWatchMovies, setToWatchMovies] = useState(getStoredToWatchMovies());

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addToToWatchMovies = (movie) => {
    let newToWatchMovies = [];
    if (!toWatchMovies.includes(movie.id)) {
      newToWatchMovies = [...toWatchMovies, movie.id];
    } else {
      newToWatchMovies = [...toWatchMovies];
    }
    setToWatchMovies(newToWatchMovies);
  };

  // We will use this function in the next step
  const removeFromToWatchMovies = (movie) => {
    setToWatchMovies(toWatchMovies.filter((mId) => mId !== movie.id));
  };

  useEffect(() => {
    const jsonFavorites = JSON.stringify(favorites);
    localStorage.setItem("favorites", jsonFavorites);

    const jsonToWatchMovies = JSON.stringify(toWatchMovies);
    localStorage.setItem("toWatchMovies", jsonToWatchMovies);
  }, [favorites, toWatchMovies]);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toWatchMovies,
        addToToWatchMovies,
        removeFromToWatchMovies,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
