import express from "express";
import asyncHandler from "express-async-handler";

import userModel from "../users/userModel";
import reviewModel from "./reviewModel";

const router = express.Router();

/**
 * @swagger
 * /reviews/:
 *   get:
 *     summary: Get all reviews.
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
 *        description: number of reviews per page
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
      reviewModel.estimatedDocumentCount(),
      // reviewModel.find().limit(limit).skip((page - 1) * limit)
      reviewModel.aggregate([
        {
          $lookup: {
            from: userModel.collection.name,
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $project: {
            _id: 1,
            movieId: 1,
            author: {
              _id: 1,
              username: 1,
            },
            rating: 1,
            review: 1,
          },
        },
        {
          $limit: limit,
        },
        {
          $skip: (page - 1) * limit,
        },
      ]),
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
 * /reviews/movie/{movieId}:
 *   get:
 *     summary: Get reviews for a movie by movieId.
 *     parameters:
 *      - in: path
 *        name: movieId
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the movie to get reviews for
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: page number
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: number of reviews per page
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/movie/:movieId",
  asyncHandler(async (req, res) => {
    const { movieId: movieIdParam } = req.params;
    const movieId = parseInt(movieIdParam);
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const movieReviews = await reviewModel.aggregate([
      {
        $match: {
          movieId,
        },
      },
      {
        $lookup: {
          from: userModel.collection.name,
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          _id: 1,
          movieId: 1,
          author: {
            _id: 1,
            username: 1,
          },
          rating: 1,
          review: 1,
        },
      },
      {
        $limit: limit,
      },
      {
        $skip: (page - 1) * limit,
      },
    ]);

    const total_results = movieReviews.length;

    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page)

    //construct return Object and insert into response object
    const returnObject = {
      page,
      total_pages,
      total_results,
      results: movieReviews,
    };

    res.status(200).json(returnObject);
  }),
);

/**
 * @swagger
 * /reviews/:
 *   post:
 *     summary: Create a review.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               review:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Review created
 *       '500':
 *         description: Internal server error
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const review = req.body;
    const newReview = new reviewModel({ ...review, author: req.user._id });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  }),
);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to delete
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedReview = await reviewModel.findByIdAndDelete(id);
    res.status(200).json(deletedReview);
  }),
);

export default router;
