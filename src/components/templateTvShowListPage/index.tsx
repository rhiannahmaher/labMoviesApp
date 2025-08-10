import React from "react";
import Header from "../headerTvShowList";
import Grid from "@mui/material/Grid";
import TvShowList from "../tvShowList";
import {  TvShowListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const TvShowListPageTemplate: React.FC<TvShowListPageTemplateProps> = ({ shows, title, action })=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <TvShowList action={action} shows={shows}></TvShowList>
      </Grid>
    </Grid>
  );
}

export default TvShowListPageTemplate;