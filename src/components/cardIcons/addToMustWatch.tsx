import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {BaseMovieProps} from "../../types/interfaces"

const AddToMustWatchIcon:React.FC<BaseMovieProps> = (movie) => {
  return (
    <PlaylistAddIcon color="primary" fontSize="large" />
  );
};

export default AddToMustWatchIcon;