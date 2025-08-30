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
import { BaseTvShowProps } from "../../../types/interfaces"; 
import { Link } from "react-router-dom";
import { TvShowsContext } from "../../../contexts/tvShowsContext";
import { Box } from "@mui/material";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)"
  }
};

interface TvShowCardProps  {
  show: BaseTvShowProps;
  action: (m: BaseTvShowProps) => React.ReactNode;
}

const TvShowCard: React.FC<TvShowCardProps> = ({show, action}) => {
  const { favourites } = useContext(TvShowsContext);
  const isFavourite = favourites.find((id) => id === show.id)? true : false;

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
            {show.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="p" sx={{ display: "flex", alignItems: "center" }}>
              <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
              {show.first_air_date}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="p" sx={{ display: "flex", alignItems: "center" }}>
              <StarRateIcon fontSize="small" sx={{ mr: 1 }} />
              {"  "} {show.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(show)}
        <Box sx={{ ml: "auto" }}>
          <Link to={`/tv/${show.id}`}>
            <Button variant="outlined" size="medium" color="primary">
              More Info ...
            </Button>
          </Link>
        </Box>
      </CardActions>
    </Card>
  );
}

export default TvShowCard;