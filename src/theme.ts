import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
      contrastText: "#fff"
    },
    secondary: {
      main: "#ffd600",
      contrastText: "#000"
    },
    background: {
      default: "#111",
      paper: "#222"
    },
    text: {
      primary: "#fff",
      secondary: "#ffd600"
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#d32f2f"
        },
      },
    },
  },
});

export default theme;