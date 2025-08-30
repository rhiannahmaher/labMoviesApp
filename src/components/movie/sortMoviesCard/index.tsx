import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SortIcon from '@mui/icons-material/Sort';
import { SortOption } from "../../../types/interfaces";
import { Box } from "@mui/material";

const styles = {
  root: {
    maxWidth: 345,
  },
  filterCard: {
    backgroundColor: "#222",
    padding: 2,
    borderRadius: 2,
    boxShadow: 3,
    marginTop: 2,
  },
  filterTitle: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  },
  filterField: {
    my: 1,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "#222"
  }
};

interface SortMoviesCardProps {
  sortOption: SortOption;
  onUserInput: (type: "sort", value: SortOption) => void;
}

const SortMoviesCard: React.FC<SortMoviesCardProps> = ({ sortOption, onUserInput }) => {
  const handleSortChange = (e: SelectChangeEvent) => {
    onUserInput("sort", e.target.value as SortOption);
  };

  return (
    <Card sx={styles.filterCard} variant="outlined">
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
          <Typography variant="h5" component="h1" sx={styles.filterTitle}>
            <SortIcon fontSize="large" sx={{ mr: 1 }}/> Sort
          </Typography>
          <FormControl variant="filled" sx={{ ...styles.formControl, ...styles.filterField }}>
            <InputLabel id="sort-label" shrink>Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="title">Alphabetical (A–Z)</MenuItem>
              <MenuItem value="date">Release Date</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SortMoviesCard;