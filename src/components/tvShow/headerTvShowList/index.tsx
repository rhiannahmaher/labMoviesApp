import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5
  }
};

interface HeaderProps {
  title: string;
  backTarget?: string;
  forwardTarget?: string;
}

const Header: React.FC<HeaderProps> = (headerProps) => {
  const title = headerProps.title;
  // Targets used to navigate through menu options in navigation bar
  const backTarget = headerProps.backTarget || "/"; // Defaults home
  const forwardTarget = headerProps.forwardTarget || "/";
  const navigate = useNavigate();
  return (
    <Paper component="div" sx={{ ...styles.root, backgroundColor: "#111" }}>
      <IconButton aria-label="go back" onClick={() => navigate(backTarget)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <IconButton aria-label="go forward" onClick={() => navigate(forwardTarget)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;