import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TvShowsContext } from "../../contexts/tvShowsContext";
import {BaseTvShowProps} from "../../types/interfaces";

const RemoveFromFavouritesIcon: React.FC<BaseTvShowProps> = (show) => {
  const context = useContext(TvShowsContext);
  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromFavourites(show);
  };

  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={onUserRequest}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesIcon;