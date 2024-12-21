import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import StarRate from "@mui/icons-material/StarRate";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import MovieReviews from "./MovieReviews";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Stack>
      <Typography variant="h5">Overview</Typography>

      <Typography
        variant="h6"
        component="p"
        sx={{ marginTop: "10px", marginBottom: "25px" }}
      >
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip
            sx={{ ...chip }}
            icon={<AccessTimeIcon />}
            label={`${movie.runtime} min.`}
          />
        </li>
        <li>
          <Chip
            sx={{ ...chip }}
            icon={<MonetizationIcon />}
            label={`${movie.revenue.toLocaleString()}`}
          />
        </li>
        <li>
          <Chip
            sx={{ ...chip }}
            icon={<StarRate />}
            label={`${movie.vote_average} (${movie.vote_count}`}
          />
        </li>
        <li>
          <Chip sx={{ ...chip }} label={`Released: ${movie.release_date}`} />
        </li>
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries.map((c) => (
          <li key={c.name}>
            <Chip label={c.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </Stack>
  );
};
export default MovieDetails;
