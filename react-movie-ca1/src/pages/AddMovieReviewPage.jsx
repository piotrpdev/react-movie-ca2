import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";

import { getMovie } from "../api/tmdb-api";
import ReviewForm from "../components/ReviewForm";
import Spinner from "../components/Spinner";
import PageTemplate from "../components/TemplateMoviePage";

const WriteReviewPage = ({ session }) => {
  const location = useLocation();
  const movieId = location.state.movieId;

  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", { id: movieId }],
    queryFn: getMovie,
  });

  if (!session) {
    return <Navigate to="/signIn" replace />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
  );
};

export default WriteReviewPage;
