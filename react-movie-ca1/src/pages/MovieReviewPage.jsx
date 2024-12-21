import { useLocation } from "react-router-dom";

import MovieReview from "../components/MovieReview";
import PageTemplate from "../components/TemplateMoviePage";

const MovieReviewPage = () => {
  let location = useLocation();
  const { movie, review } = location.state;

  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
