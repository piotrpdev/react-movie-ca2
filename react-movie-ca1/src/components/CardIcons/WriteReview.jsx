import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";

const WriteReviewIcon = ({ movie, session }) => {
  return (
    <Link
      to={`/reviews/form`}
      state={{
        movieId: movie.id,
      }}
    >
      <RateReviewIcon
        sx={{ transform: "translateY(4px)" }}
        color={session ? "primary" : "disabled"}
        fontSize="large"
      />
    </Link>
  );
};

export default WriteReviewIcon;
