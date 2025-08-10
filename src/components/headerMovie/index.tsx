import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { MovieDetailsProps } from "../../types/interfaces"; 
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";

const styles = {
    root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)" // Red color for the heart icon
  }
};

const MovieHeader: React.FC<MovieDetailsProps> = (movie) => {
  const [displayFavourite, setDisplayFavourite] = useState(false); 

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites") || "[]"); // When headerMovie component initially loads, it checks local storage for favourited movies.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matched = storedFavourites.some((fav: any) => fav.id === movie.id); // Returns true or false.
    setDisplayFavourite(matched); // Updates displayFavourite state (true/false).
  }, [movie.id]);

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {displayFavourite && ( // If setDisplayFavourite is true, component is re-rendered and icon is displayed.
          <Avatar sx={styles.avatar}>
            <FavoriteIcon />
          </Avatar>
        )} 
      </Typography>
      
      <Typography variant="h4" component="h3"> 
        {movie.title}{"   "}
        <a href={movie.homepage}>
          <HomeIcon color="primary"  fontSize="large"/>
        </a>
        <br />
        <span>{`${movie.tagline}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;