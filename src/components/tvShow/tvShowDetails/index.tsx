import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { TvShowDetailsProps } from "../../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TvShowReviews from '../tvShowReviews';
import { getTvShowCredits, getTvShowImdb } from "../../../api/tmdb-api";
import { CastMember } from "../../../types/interfaces";
import Link from "@mui/material/Link";
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

const TvShowDetails: React.FC<TvShowDetailsProps> = (show) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [imdbId, setImdbId] = useState<string | null>(null);

  useEffect(() => {
    getTvShowCredits(show.id).then(data => {
      setCast(Array.isArray(data.cast) ? data.cast.slice(0, 5) : []);
    });
  }, [show.id]);

  useEffect(() => {
    getTvShowImdb(show.id).then((data) => {
      setImdbId(data.imdb_id || null);
    });
  }, [show.id]);

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
          {show.overview}
        </Typography>
      </Box>

      <Paper component="ul" sx={{ ...styles.chipSet, mb: 2 }}>        <Chip icon={<AccessTimeIcon />} label={`${show.number_of_seasons} seasons`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`Status: ${show.status}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${show.vote_average} (${show.vote_count}`}
        />
        <Chip label={`First aired: ${show.first_air_date}`} />
      </Paper>

     <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper component="ul" sx={{ ...styles.chipSet, p: 2 }}>
            <li>
              <Chip label="Genres" sx={styles.chipLabel} color="primary" />
            </li>
            {show.genres.map((g) => (
              <li key={g.name}>
                <Chip label={g.name} />
              </li>
            ))}
          </Paper>
        </Grid>
       <Grid item xs={12} md={6}>
          <Paper component="ul" sx={{ ...styles.chipSet, p: 2 }}>
            <li>
              <Chip label="Cast" sx={styles.chipLabel} color="primary" />
            </li>
            {cast.map((actor) => (
              <li key={actor.id}>
                <Chip label={actor.name} />
              </li>
            ))}
            <li style={{ width: "100%", display: "flex", justifyContent: "center"}}>
              <Link
                href={`https://www.themoviedb.org/tv/${show.id}/cast`}
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
            {show.production_companies.map((pc) => (
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
            {show.production_countries.map((c) => (
              <li key={c.iso_3166_1}>
                <Chip label={c.name} />
              </li>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          {imdbId && (
            <Paper component="ul" sx={{ ...styles.chipSet, mb: 2 }}>
              <li>
                <Link
                  href={`https://www.imdb.com/title/${imdbId}`}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  sx={{ ml: 2 }}
                >
                  IMDB
                </Link>
              </li>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper component="ul" sx={{ ...styles.chipSet, mb: 2 }}>
            <li>
              <Link
                href={`https://www.themoviedb.org/tv/${show.id}/recommendations`}
                target="_blank"
                rel="noopener"
                underline="hover"
                sx={{ ml: 2 }}
              >
                Recommended Shows
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
        <TvShowReviews {...show} />
      </Drawer>
    </>
  );
};
export default TvShowDetails;