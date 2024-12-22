import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getMongoReviews, getMovieReviews } from "../api/tmdb-api";
import { excerpt } from "../util";
import Spinner from "./Spinner";

export default function MovieReviews({ movie }) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["reviews", { id: movie.id }],
    queryFn: getMovieReviews,
  });

  const {
    data: mongoData,
    isLoading: mongoIsLoading,
    isError: mongoIsError,
  } = useQuery({
    queryKey: ["mongoReviews", { id: movie.id }],
    queryFn: getMongoReviews,
    retry: false,
  });

  if (isLoading || mongoIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const reviews = data.results;
  const ourReviews = mongoData?.results;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell>{excerpt(r.content)}</TableCell>
              <TableCell>
                <Link
                  to={`/reviews/${r.id}`}
                  state={{
                    review: r,
                    movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {mongoIsError ? (
            <TableRow>
              <TableCell colSpan={3}>Sign in to see our reviews</TableCell>
            </TableRow>
          ) : (
            ourReviews.map((r) => (
              <TableRow key={r._id}>
                <TableCell component="th" scope="row">
                  {r.author.username}
                </TableCell>
                <TableCell>{excerpt(r.review)}</TableCell>
                <TableCell>
                  <Link
                    to={`/reviews/${r._id}`}
                    state={{
                      review: {
                        author: r.author.username,
                        content: r.review,
                      },
                      movie: movie,
                    }}
                  >
                    Full Review
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
