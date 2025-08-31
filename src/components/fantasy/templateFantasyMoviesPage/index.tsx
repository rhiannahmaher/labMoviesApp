import React from "react";
import Header from "../headerFantasyMovie";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { FantasyMoviePageTemplateProps } from "../../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#1a1a1a",
  },
  paper: {
    padding: 2,
    margin: 2,
    backgroundColor: "#222"
  }
};

const FantasyMoviePageTemplate: React.FC<FantasyMoviePageTemplateProps> = ({ title, backTarget, children }) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} backTarget={backTarget} />
      </Grid>
      <Grid item container spacing={5} sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <Paper sx={styles.paper} elevation={3}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FantasyMoviePageTemplate;