import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import SortCard from "../sortMoviesCard";
import { SortOption } from "../../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 20,
    left: 2
  }
};

interface MovieSortUIProps {
  onSortChange: (type: "sort", value: SortOption) => void;
  sortOption: SortOption;
}

const MovieSortUI: React.FC<MovieSortUIProps> = ({ onSortChange, sortOption }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}      >
        Sort
      </Fab>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300, padding: 2 }}>
          <SortCard sortOption={sortOption} onUserInput={onSortChange} />
        </Box>
      </Drawer>
    </>
  );
};

export default MovieSortUI;