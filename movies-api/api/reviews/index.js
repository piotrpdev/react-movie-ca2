import reviewModel from './reviewModel';
import userModel from '../users/userModel';
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
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
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $unwind: '$author'
            },
            {
                $project: {
                    _id: 1,
                    movieId: 1,
                    author: {
                        _id: 1,
                        username: 1
                    },
                    rating: 1,
                    review: 1
                }
            },
            {
                $limit: limit
            },
            {
                $skip: (page - 1) * limit
            }
        ])     
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

router.get('/movie/:movieId', asyncHandler(async (req, res) => {
    const { movieId: movieIdParam } = req.params;
    const movieId = parseInt(movieIdParam);
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const movieReviews = await reviewModel.aggregate([
        {
            $match: {
                movieId
            }
        },
        {
            $lookup: {
                from: userModel.collection.name,
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }
        },
        {
            $unwind: '$author'
        },
        {
            $project: {
                _id: 1,
                movieId: 1,
                author: {
                    _id: 1,
                    username: 1
                },
                rating: 1,
                review: 1
            }
        },
        {
            $limit: limit
        },
        {
            $skip: (page - 1) * limit
        }
    ]);

    const total_results = movieReviews.length;

    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results: movieReviews
    };

    res.status(200).json(returnObject);
}));

export default router;