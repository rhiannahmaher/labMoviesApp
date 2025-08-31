import React from "react";
import { Review } from "../../../types/interfaces";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TvShowReview: React.FC<Review> =  (props) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        Review By: <b>{props.author}</b>
      </Typography>
      <Box sx={{ pl: 1 }}>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          {props.content}
        </Typography>
      </Box>
    </Paper>
  );
};
export default TvShowReview