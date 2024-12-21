import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarRateIcon from "@mui/icons-material/StarRate";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { MoviesContext } from "../contexts/MoviesContext";
import img from "../images/film-poster-placeholder.png";
import { excerpt } from "../util";

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  return (
    <Card>
      <CardHeader
        sx={{ height: 100, textAlign: "center" }}
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: "red" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {excerpt(movie.title, 30)}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            justifyContent: "space-around",
            marginTop: "10px",
            marginLeft: "5px",
            marginRight: "15px",
          }}
        >
          <Stack spacing={1} direction="row" sx={{ alignItems: "baseline" }}>
            <CalendarIcon
              fontSize="small"
              sx={{ transform: "translateY(2px)" }}
            />
            <Typography variant="h6">
              {movie.release_date.split("-").reverse().join("/")}
            </Typography>
          </Stack>
          <Stack spacing={1} direction="row" sx={{ alignItems: "baseline" }}>
            <StarRateIcon
              fontSize="small"
              sx={{ transform: "translateY(1px)" }}
            />
            <Typography variant="h6">
              {Math.round(movie.vote_average * 10) / 10}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around" }}>
        {action(movie)}

        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
