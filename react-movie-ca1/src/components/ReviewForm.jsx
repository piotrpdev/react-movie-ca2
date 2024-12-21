import StarIcon from "@mui/icons-material/Star";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabaseClient";

const labels = {
  1: "Terrible",
  2: "Poor",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

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

const ReviewForm = ({ movie }) => {
  const [hover, setHover] = useState(-1);
  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const defaultValues = {
    author: "",
    review: "",
    agree: false,
    rating: 3,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/favorites");
  };

  const handleRatingChange = (event) => {
    console.log(event.target.value);
    setRating(Number(event.target.value));
  };

  const onSubmit = async (review) => {
    review.movieId = movie.id;
    review.rating = rating;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("reviews").insert({
      movieId: movie.id,
      author: user.id,
      review: review.review,
      rating: review.rating,
    });

    setOpen(true); // NEW
  };

  return (
    <Stack component="div" spacing={1} sx={styles.root}>
      <Typography component="h5" variant="h5">
        Write a review
      </Typography>

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
          <Typography variant="h4">
            Thank you for submitting a review
          </Typography>
        </MuiAlert>
      </Snackbar>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="review"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: { value: 10, message: "Review is too short" },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="review"
              value={value}
              onChange={onChange}
              label="Review text"
              id="review"
              multiline
              minRows={10}
            />
          )}
        />
        {errors.review && (
          <Typography variant="h6" component="p">
            {errors.review.message}
          </Typography>
        )}

        <Controller
          control={control}
          name="rating"
          render={() => (
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                marginBottom: "25px",
              }}
            >
              <Rating
                id="select-rating"
                name="select-rating"
                value={rating}
                onChange={handleRatingChange}
                onChangeActive={(_, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {rating !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover !== -1 ? hover : rating]}
                </Box>
              )}
            </Box>
          )}
        />

        <Box sx={styles.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset({
                author: "",
                content: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Stack>
  );
};

export default ReviewForm;
