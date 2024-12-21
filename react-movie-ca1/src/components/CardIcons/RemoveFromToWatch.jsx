import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";

import { MoviesContext } from "../../contexts/MoviesContext";

const RemoveFromToWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveToWatch = (e) => {
    e.preventDefault();
    context.removeFromToWatchMovies(movie);
  };
  return (
    <IconButton aria-label="remove from to watch" onClick={handleRemoveToWatch}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromToWatchIcon;
