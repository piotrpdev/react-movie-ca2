import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SiteHeader from "./components/SiteHeader";
import AuthContextProvider from "./contexts/AuthContextProvider";
import MoviesContextProvider from "./contexts/MoviesContextProvider";
import AddMovieReviewPage from "./pages/AddMovieReviewPage";
import FavoriteMoviesPage from "./pages/FavoriteMoviesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MoviePage from "./pages/MovieDetailsPage";
import MovieReviewPage from "./pages/MovieReviewPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SignUpPage from "./pages/SignUpPage";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage";
import ToWatchMoviesPage from "./pages/ToWatchMoviesPage";
import TrendingMoviesPage from "./pages/TrendingMoviesPage";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";

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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route element={<ProtectedRoutes />}>
                  <Route
                    path="/reviews/form"
                    element={<AddMovieReviewPage />}
                  />
                  <Route
                    path="/movies/favorites"
                    element={<FavoriteMoviesPage />}
                  />
                  <Route
                    path="/movies/to-watch"
                    element={<ToWatchMoviesPage />}
                  />
                </Route>
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route
                  path="/movies/upcoming"
                  element={<UpcomingMoviesPage />}
                />
                <Route
                  path="/movies/trending"
                  element={<TrendingMoviesPage />}
                />
                <Route
                  path="/movies/top-rated"
                  element={<TopRatedMoviesPage />}
                />
                <Route path="/person/:id" element={<PersonDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
            </MoviesContextProvider>
          </BrowserRouter>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
