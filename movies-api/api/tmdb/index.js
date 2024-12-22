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

/**
 * @swagger
 * /tmdb/discover/movie:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get all movies.
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: page number
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/discover/movie",
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const movies = await getMovies({ page });
    res.status(200).json(movies);
  }),
);

/**
 * @swagger
 * /tmdb/movie/{id}:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get a movie by ID.
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the movie to get
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/movie/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie({ id });
    res.status(200).json(movie);
  }),
);

/**
 * @swagger
 * /tmdb/genres:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get all movie genres.
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/genres",
  asyncHandler(async (req, res) => {
    const movieGenres = await getGenres();
    res.status(200).json(movieGenres);
  }),
);

/**
 * @swagger
 * /tmdb/movie/{id}/images:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get images for a movie by ID.
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the movie to get images for
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/movie/:id/images",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieImages = await getMovieImages({ id });
    res.status(200).json(movieImages);
  }),
);

/**
 * @swagger
 * /tmdb/movie/{id}/reviews:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get reviews for a movie by ID.
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the movie to get reviews for
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: page number
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/movie/:id/reviews",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    const movieReviews = await getMovieReviews({ id, page });
    res.status(200).json(movieReviews);
  }),
);

/**
 * @swagger
 * /tmdb/upcoming:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get upcoming movies.
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: page number
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/upcoming",
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const upcomingMovies = await getUpcomingMovies({ page });
    res.status(200).json(upcomingMovies);
  }),
);

/**
 * @swagger
 * /tmdb/trending/movie/day:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get trending movies.
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/trending/movie/day",
  asyncHandler(async (req, res) => {
    const trendingMovies = await getTrendingMovies();
    res.status(200).json(trendingMovies);
  }),
);

/**
 * @swagger
 * /tmdb/movie/top_rated:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get top rated movies.
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: page number
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/top_rated",
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const topRatedMovies = await getTopRatedMovies({ page });
    res.status(200).json(topRatedMovies);
  }),
);

/**
 * @swagger
 * /tmdb/movie/{id}/credits:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get credits for a movie by ID.
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the movie to get credits for
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/movie/:id/credits",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieCredits = await getMovieCredits({ id });
    res.status(200).json(movieCredits);
  }),
);

/**
 * @swagger
 * /tmdb/person/{id}:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get person details by ID.
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the person to get details for
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/person/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const personDetails = await getPersonDetails({ id });
    res.status(200).json(personDetails);
  }),
);

/**
 * @swagger
 * /tmdb/person/{id}/movie_credits:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get movies for a person by ID.
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the person to get movies for
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/person/:id/movie_credits",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const personMovies = await getPersonMovies({ id });
    res.status(200).json(personMovies);
  }),
);

/**
 * @swagger
 * /tmdb/configuration/languages:
 *   get:
 *     tags:
 *      - TMDB
 *     summary: Get all languages.
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/configuration/languages",
  asyncHandler(async (req, res) => {
    const languages = await getLanguages();
    res.status(200).json(languages);
  }),
);

export default router;
