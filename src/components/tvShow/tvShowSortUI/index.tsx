import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import SortCard from "../sortTvShowsCard";
import { SortOption } from "../../../types/interfaces";

interface TvShowSortUIProps {
  onSortChange: (type: "sort", value: SortOption) => void;
  sortOption: SortOption;
}

const TvShowSortUI: React.FC<TvShowSortUIProps> = ({ onSortChange, sortOption }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{ position: "fixed", top: 120, right: 20, zIndex: 2000 }}
      >
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

export default TvShowSortUI;