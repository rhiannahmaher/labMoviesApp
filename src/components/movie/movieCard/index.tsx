import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../../images/film-poster-placeholder.png';
import { BaseMovieProps } from "../../../types/interfaces"; 
import { Link } from "react-router-dom";
import { MoviesContext } from "../../../contexts/moviesContext";
import { Box } from "@mui/material";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)"
  }
};

interface MovieCardProps  {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const MovieCard: React.FC<MovieCardProps> = ({movie, action}) => {
  const { favourites } = useContext(MoviesContext);
  const isFavourite = favourites.find((id) => id === movie.id)? true : false;

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" align="center">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="p" sx={{ display: "flex", alignItems: "center" }}>
              <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="p" sx={{ display: "flex", alignItems: "center" }}>
              <StarRateIcon fontSize="small" sx={{ mr: 1 }} />
              {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Box sx={{ ml: "auto" }}>
            <Link to={`/movies/${movie.id}`}>
              <Button variant="outlined" size="medium" color="primary">
                More Info ...
              </Button>
            </Link>
          </Box>
      </CardActions>
    </Card>
  );
}

export default MovieCard;