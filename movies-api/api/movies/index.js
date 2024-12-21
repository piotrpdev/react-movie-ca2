import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getMovies, // /tmdb/discover/movie
    getMovie, // /tmdb/movie/:id
    getGenres, // /tmdb/genre/movie/list
    getMovieImages, // /tmdb/movie/:id/images
    getMovieReviews, // /tmdb/movie/:id/reviews
    getUpcomingMovies, // /tmdb/movie/upcoming
    getTrendingMovies, // /tmdb/trending/movie/day
    getTopRatedMovies, // /tmdb/movie/top_rated
    getMovieCredits, // /tmdb/movie/:id/credits
    getPersonDetails, // /tmdb/person/:id
    getPersonMovies, // /tmdb/person/:id/movie_credits
    getLanguages // /tmdb/configuration/languages
  } from '../tmdb-api';  

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/discover/movie', asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const movies = await getMovies({ page });
    res.status(200).json(movies);
}));

router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie({ id });
    res.status(200).json(movie);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const movieGenres = await getGenres();
    res.status(200).json(movieGenres);
}));

router.get('/tmdb/movie/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieImages = await getMovieImages({ id });
    res.status(200).json(movieImages);
}));

router.get('/tmdb/movie/:id/reviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    const movieReviews = await getMovieReviews({ id, page });
    res.status(200).json(movieReviews);
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const upcomingMovies = await getUpcomingMovies({ page });
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/trending/movie/day', asyncHandler(async (req, res) => {
    const trendingMovies = await getTrendingMovies();
    res.status(200).json(trendingMovies);
}));

router.get('/tmdb/top_rated', asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const topRatedMovies = await getTopRatedMovies({ page });
    res.status(200).json(topRatedMovies);
}));

router.get('/tmdb/movie/:id/credits', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieCredits = await getMovieCredits({ id });
    res.status(200).json(movieCredits);
}));

router.get('/tmdb/person/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const personDetails = await getPersonDetails({ id });
    res.status(200).json(personDetails);
}));

router.get('/tmdb/person/:id/movie_credits', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const personMovies = await getPersonMovies({ id });
    res.status(200).json(personMovies);
}));

router.get('/tmdb/configuration/languages', asyncHandler(async (req, res) => {
    const languages = await getLanguages();
    res.status(200).json(languages);
}));

export default router;
