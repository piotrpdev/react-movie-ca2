import "./db";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import moviesRouter from "./api/movies"; //import movies router
import reviewsRouter from "./api/reviews";
import tmdbRouter from "./api/tmdb";
import usersRouter from "./api/users";
import authenticate from "./authenticate";
import defaultErrHandler from "./errHandler";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
// app.use('/api/movies', authenticate, moviesRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/tmdb", tmdbRouter);
app.use("/api/reviews", authenticate, reviewsRouter); // TODO: Add authentication
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
