import React, { useState, MouseEvent, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";
import NavDropdown from "../../components/dropdownMenu";

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  // Gets authentication context
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // Nested menu options for dropdown
  const menuOptions = [
    { label: "Home", path: "/" },
    {
      label: "Movies",
      dropdown: true,
      options: [
        { label: "Popular", path: "/movies/popular" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "Favourites", path: "/movies/favourites" }
      ]
    },
    {
      label: "TV Shows",
      dropdown: true,
      options: [
        { label: "TV Shows", path: "/tv" },
        { label: "Favourites", path: "/tv/favourites" }
      ]
    },
    { label: "My Fantasy Movies", path: "/fantasy" }
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) =>
                  opt.dropdown
                    ? opt.options.map((sub) => (
                        <MenuItem
                          key={sub.label}
                          onClick={() => {
                            handleMenuSelect(sub.path);
                            setAnchorEl(null);
                          }}
                        >
                          {sub.label}
                        </MenuItem>
                      ))
                    : (
                        <MenuItem
                          key={opt.label}
                          onClick={() => {
                            if (opt.path) {
                              handleMenuSelect(opt.path);
                            }
                            setAnchorEl(null);
                          }}
                        >
                          {opt.label}
                        </MenuItem>
                      )
                )}
                {!auth?.isAuthenticated ? (
                  <MenuItem onClick={() => { handleMenuSelect("/login"); setAnchorEl(null); }}>Login</MenuItem>
                ) : (
                  <MenuItem onClick={() => { auth.signout(); setAnchorEl(null); }}>Logout</MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) =>
                opt.dropdown ? (
                  <NavDropdown key={opt.label} label={opt.label} options={opt.options} />
                ) : (
                  <Button
                    key={opt.label}
                    color="inherit"
                    sx={{ mx: 1 }}
                    onClick={() => {
                      if (opt.path) {
                        navigate(opt.path);
                      }
                    }}
                  >
                    {opt.label}
                  </Button>
                )
              )}
              {/* Updates login/logout view depending on if user is logged in */}
              {!auth?.isAuthenticated ? (
                <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
              ) : (
                <Button color="inherit" onClick={auth.signout}>Logout</Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;