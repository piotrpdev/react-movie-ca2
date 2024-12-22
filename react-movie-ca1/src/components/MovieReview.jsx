import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { removeReview } from "../api/movies-api";

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    form: {
      width: "100%",
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

const MovieReview = ({ movie, review }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSnackClose = () => {
    setOpen(false);
    navigate(`/movies/${movie.id}`);
  };

  const removeReviewFunc = async () => {
    await removeReview(review._id);
    setOpen(true);
  };

  return (
    <>
      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <MuiAlert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">Review Removed</Typography>
        </MuiAlert>
      </Snackbar>

      <Typography variant="h5" component="h3">
        Review By: {review.author}
      </Typography>

      <Typography variant="h6" component="p">
        {review.content}
      </Typography>

      {review._id && (
        <Button variant="contained" color="error" onClick={removeReviewFunc}>
          Remove Review
        </Button>
      )}
    </>
  );
};
export default MovieReview;
