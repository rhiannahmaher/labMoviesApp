import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps } from "../../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'
import Link from "@mui/material/Link";
import { getMovieCredits } from "../../../api/tmdb-api";
import { CastMember } from "../../../types/interfaces";
import { Box, Grid } from "@mui/material";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0
  },
  chipLabel: {
    margin: 0.5
  },
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  }
};

const MovieDetails: React.FC<MovieDetailsProps> = (movie) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cast, setCast] = useState<CastMember[]>([]);
  
  // Returns top 5 cast members from a movie
  useEffect(() => {
    getMovieCredits(movie.id).then((data) => {
      setCast(data.cast.slice(0, 5));
    });
  }, [movie.id]);
  return (
    <>
      <Box sx={{ p: 2, mb: 2, backgroundColor: "#181818", borderRadius: 2 }}>
        <Typography
          variant="h5"
          component="h3"
          align="center"
          sx={{ mb: 2, mt: 1, fontWeight: "bold", letterSpacing: 1 }}
        >
          Overview
        </Typography>
        <Typography variant="h6" component="p">
          {movie.overview}
        </Typography>
      </Box>

      <Paper component="ul" sx={{ ...styles.chipSet, mb: 2 }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper component="ul" sx={{ ...styles.chipSet, p: 2 }}>
            <li>
              <Chip label="Genres" sx={styles.chipLabel} color="primary" />
            </li>
            {movie.genres.map((g) => (
              <li key={g.name}>
                <Chip label={g.name} />
              </li>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper component="ul" sx={{ ...styles.chipSet, p: 2 }}>
            <li>
              <Chip label= "Cast" sx={styles.chipLabel} color="primary" />
            </li>
            {cast.map((actor) => (
              <li key={actor.id}>
                <Chip label={actor.name} />
              </li>
            ))}
            <li style={{ width: "100%", display: "flex", justifyContent: "center"}}>
              <Link
                href={`https://www.themoviedb.org/movie/${movie.id}/cast`}
                target="_blank"
                rel="noopener"
                underline="hover"
                sx={{ ml: 2 }}
              >
                Full Cast & Crew
              </Link>
            </li>
          </Paper>
        </Grid>
      </Grid>
      
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper component="ul" sx={{ ...styles.chipSet, mb: 2 }}>
            <li>
              <Chip label="Production Companies" sx={styles.chipLabel} color="primary" />
            </li>
            {movie.production_companies.map((pc) => (
              <li key={pc.id}>
                <Chip label={pc.name} />
              </li>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper component="ul" sx={{ ...styles.chipSet, mb: 2 }}>
            <li>
              <Chip label="Production Countries" sx={styles.chipLabel} color="primary" />
            </li>
            {movie.production_countries.map((c) => (
              <li key={c.iso_3166_1}>
                <Chip label={c.name} />
              </li>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper component="ul" sx={{ ...styles.chipSet, mb: 2 }}>
            <li>
              <Link
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener"
                underline="hover"
                sx={{ ml: 2 }}
              >
                IMDB
              </Link>
            </li>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper component="ul" sx={{ ...styles.chipSet, mb: 2 }}>
            <li>
              <Link
                href={`https://www.themoviedb.org/movie/${movie.id}/recommendations`}
                target="_blank"
                rel="noopener"
                underline="hover"
                sx={{ ml: 2 }}
              >
                Recommended Movies
              </Link>
            </li>
          </Paper>
        </Grid>
      </Grid>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews {...movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails;