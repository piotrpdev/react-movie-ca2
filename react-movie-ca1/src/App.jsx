import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SiteHeader from "./components/SiteHeader";
import MoviesContextProvider from "./contexts/MoviesContextProvider";
import AddMovieReviewPage from "./pages/AddMovieReviewPage";
import FavoriteMoviesPage from "./pages/FavoriteMoviesPage";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MovieDetailsPage";
import MovieReviewPage from "./pages/MovieReviewPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import SignInPage from "./pages/SignInPage";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage";
import ToWatchMoviesPage from "./pages/ToWatchMoviesPage";
import TrendingMoviesPage from "./pages/TrendingMoviesPage";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import { supabase } from "./supabaseClient";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <SiteHeader session={session} />
          <MoviesContextProvider>
            <Routes>
              <Route
                path="/movies/favorites"
                element={<FavoriteMoviesPage session={session} />}
              />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route
                path="/reviews/form"
                element={<AddMovieReviewPage session={session} />}
              />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/trending" element={<TrendingMoviesPage />} />
              <Route
                path="/movies/top-rated"
                element={<TopRatedMoviesPage />}
              />
              <Route path="/person/:id" element={<PersonDetailsPage />} />
              <Route path="/signIn" element={<SignInPage />} />
              <Route
                path="/movies/to-watch"
                element={<ToWatchMoviesPage session={session} />}
              />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
