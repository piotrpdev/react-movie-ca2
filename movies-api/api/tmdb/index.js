import express from "express";
import asyncHandler from "express-async-handler";

import {
  getGenres, // /tmdb/genre/movie/list
  getLanguages, // /tmdb/configuration/languages
  getMovie, // /tmdb/movie/:id
  getMovieCredits, // /tmdb/movie/:id/credits
  getMovieImages, // /tmdb/movie/:id/images
  getMovieReviews, // /tmdb/movie/:id/reviews
  getMovies, // /tmdb/discover/movie
  getPersonDetails, // /tmdb/person/:id
  getPersonMovies, // /tmdb/person/:id/movie_credits
  getTopRatedMovies, // /tmdb/movie/top_rated
  getTrendingMovies, // /tmdb/trending/movie/day
  getUpcomingMovies, // /tmdb/movie/upcoming
} from "../tmdb-api";

const router = express.Router();

router.get(
  "/discover/movie",
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const movies = await getMovies({ page });
    res.status(200).json(movies);
  }),
);

router.get(
  "/movie/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie({ id });
    res.status(200).json(movie);
  }),
);

router.get(
  "/genres",
  asyncHandler(async (req, res) => {
    const movieGenres = await getGenres();
    res.status(200).json(movieGenres);
  }),
);

router.get(
  "/movie/:id/images",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieImages = await getMovieImages({ id });
    res.status(200).json(movieImages);
  }),
);

router.get(
  "/movie/:id/reviews",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    const movieReviews = await getMovieReviews({ id, page });
    res.status(200).json(movieReviews);
  }),
);

router.get(
  "/upcoming",
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const upcomingMovies = await getUpcomingMovies({ page });
    res.status(200).json(upcomingMovies);
  }),
);

router.get(
  "/trending/movie/day",
  asyncHandler(async (req, res) => {
    const trendingMovies = await getTrendingMovies();
    res.status(200).json(trendingMovies);
  }),
);

router.get(
  "/top_rated",
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const topRatedMovies = await getTopRatedMovies({ page });
    res.status(200).json(topRatedMovies);
  }),
);

router.get(
  "/movie/:id/credits",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieCredits = await getMovieCredits({ id });
    res.status(200).json(movieCredits);
  }),
);

router.get(
  "/person/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const personDetails = await getPersonDetails({ id });
    res.status(200).json(personDetails);
  }),
);

router.get(
  "/person/:id/movie_credits",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const personMovies = await getPersonMovies({ id });
    res.status(200).json(personMovies);
  }),
);

router.get(
  "/configuration/languages",
  asyncHandler(async (req, res) => {
    const languages = await getLanguages();
    res.status(200).json(languages);
  }),
);

export default router;
