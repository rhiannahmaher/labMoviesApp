import React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface TemplateFantasyMoviePageProps {
  title?: string;
  children: React.ReactNode;
}

const TemplateFantasyMoviePage: React.FC<TemplateFantasyMoviePageProps> = ({ title = "My Fantasy Movie", children }) => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Paper elevation={3} sx={{ maxWidth: 700, margin: "0 auto", p: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {title}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
};

export default TemplateFantasyMoviePage;