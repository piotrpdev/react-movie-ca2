import RateReviewIcon from "@mui/icons-material/RateReview";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

const WriteReviewIcon = ({ movie }) => {
  const context = useContext(AuthContext);

  return (
    <Link
      to={`/reviews/form`}
      state={{
        movieId: movie.id,
      }}
    >
      <RateReviewIcon
        sx={{ transform: "translateY(4px)" }}
        color={context.isAuthenticated ? "primary" : "disabled"}
        fontSize="large"
      />
    </Link>
  );
};

export default WriteReviewIcon;
