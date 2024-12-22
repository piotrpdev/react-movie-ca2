import "./db";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerjsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import moviesRouter from "./api/movies"; //import movies router
import reviewsRouter from "./api/reviews";
import tmdbRouter from "./api/tmdb";
import usersRouter from "./api/users";
import authenticate from "./authenticate";
import defaultErrHandler from "./errHandler";

// https://medium.com/@sagiweizmann/express-to-impress-documenting-apis-with-swagger-3744e95c1870
const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'Movies API',
          description: 'Movies API Information',
          contact: {
              name: 'Piotr Placzek'
          },
      },
      servers: [
          {
              url: "http://localhost:8080/api/"
          }
      ],
      tags: [
          {
              name: 'Movies',
          },
          {
              name: 'Users',
          },
          {
              name: 'Reviews',
          },
          {
              name: 'TMDB',
          }
      ]
  },
  apis: ['./api/**/index.js']
}

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
const swaggerDocs = swaggerjsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use("/api/users", usersRouter);
// app.use('/api/movies', authenticate, moviesRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/tmdb", tmdbRouter);
app.use("/api/reviews", authenticate, reviewsRouter); // TODO: Add authentication
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
