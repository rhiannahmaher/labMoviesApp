import React, { MouseEvent, useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {BaseMovieProps} from "../../../types/interfaces"
import { MoviesContext } from "../../../contexts/moviesContext";
import { IconButton } from "@mui/material";

const AddToMustWatchIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);
  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;