import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { TvShowDetailsProps } from "../../../types/interfaces"; 
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

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

const TvShowHeader: React.FC<TvShowDetailsProps> = (show) => {
  const [displayFavourite, setDisplayFavourite] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites") || "[]"); // When headerMovie component initially loads, it checks local storage for favourited movies.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matched = storedFavourites.some((fav: any) => fav.id === show.id); // Returns true or false.
    setDisplayFavourite(matched); // Updates displayFavourite state (true/false).
  }, [show.id]);

  return (
    <Paper component="div" sx={styles.root}>
      {/* Go back arrow returns to previous page in browser history */}
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {displayFavourite && ( // If setDisplayFavourite is true, component is re-rendered and icon is displayed.
          <Avatar sx={styles.avatar}>
            <FavoriteIcon />
          </Avatar>
        )} 
      </Typography>

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <span style={{ fontSize: "2rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: 8 }}>
          {show.name}
          {show.homepage && (
            <a href={show.homepage} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>
              <HomeIcon color="primary"  fontSize="large"/>
            </a>
          )}
        </span>

        <div style={{ fontSize: "1.1rem", color: "#aaa", fontStyle: "italic", marginTop: 4 }}>
          {show.tagline}
        </div>
      </div>

      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default TvShowHeader;