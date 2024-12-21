import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";

import { MoviesContext } from "../../contexts/MoviesContext";

const AddToToWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToToWatch = (e) => {
    e.preventDefault();
    context.addToToWatchMovies(movie);
  };

  return (
    <IconButton aria-label="add to to watch list" onClick={handleAddToToWatch}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToToWatchListIcon;
