import React from "react";
import FantasyMovieHeader from "../headerFantasyMovie";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

interface TemplateFantasyMoviePageProps {
  title?: string;
  children: React.ReactNode;
}

const TemplateFantasyMoviePage: React.FC<TemplateFantasyMoviePageProps> = ({ children }) => {
  return (
    <>
      <FantasyMovieHeader />
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateFantasyMoviePage;