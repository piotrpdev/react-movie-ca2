import express from "express";
import asyncHandler from "express-async-handler";

import movieModel from "./movieModel";

const router = express.Router();

/**
 * @swagger
 * /movies/:
 *   get:
 *     summary: Get all movies.
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: page number
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: number of movies per page
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
      movieModel.estimatedDocumentCount(),
      movieModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit),
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page)

    //construct return Object and insert into response object
    const returnObject = {
      page,
      total_pages,
      total_results,
      results,
    };
    res.status(200).json(returnObject);
  }),
);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie details by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie to get
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Movie not found
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({
        message: "The movie you requested could not be found.",
        status_code: 404,
      });
    }
  }),
);

export default router;
