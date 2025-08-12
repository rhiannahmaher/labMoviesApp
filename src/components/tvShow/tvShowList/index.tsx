import React from "react";
import TvShow from "../tvShowCard";
import Grid from "@mui/material/Grid";
import { BaseTvShowListProps } from "../../../types/interfaces";

const TvShowList: React.FC<BaseTvShowListProps> = ({shows, action}) => {
  const tvShowCards = shows.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TvShow key={m.id} show={m} action={action}/>    </Grid>
  ));
  return tvShowCards;
}

export default TvShowList;