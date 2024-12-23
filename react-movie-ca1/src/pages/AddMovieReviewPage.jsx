import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { getMovie } from "../api/movies-api";
import ReviewForm from "../components/ReviewForm";
import Spinner from "../components/Spinner";
import PageTemplate from "../components/TemplateMoviePage";

const WriteReviewPage = () => {
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
