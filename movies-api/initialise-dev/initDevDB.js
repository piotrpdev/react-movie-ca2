import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies';
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel';
import Review from '../api/reviews/reviewModel';

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    await mongoose.connect(process.env.MONGO_DB);
    // Drop collections
    await User.collection.drop().catch(err => console.log('User collection not found'));
    await Movie.collection.drop().catch(err => console.log('Movie collection not found'));
    await Review.collection.drop().catch(err => console.log('Review collection not found'));
    await User.create(users);
    await Movie.create(movies);

    const joe = await User.findOne({ username: 'joe' });
    if (!joe) {
        console.log('Joe not found');
        return;
    }
    await Review.create([
        {
            movieId: 845781,
            author: joe._id,
            rating: 5,
            review: 'It was a good movie'
        },
    ]);

    console.log('Database initialised');
    console.log(`${users.length} users loaded`);
    console.log(`${movies.length} movies loaded`);
    console.log(`1 reviews loaded`);
    await mongoose.disconnect();
}

main();
