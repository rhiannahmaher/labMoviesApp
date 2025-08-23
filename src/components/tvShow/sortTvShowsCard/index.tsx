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

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  }
};

interface SortTvShowsCardProps {
  sortOption: SortOption;
  onUserInput: (type: "sort", value: SortOption) => void;
}

const SortTvShowsCard: React.FC<SortTvShowsCardProps> = ({ sortOption, onUserInput }) => {
  const handleSortChange = (e: SelectChangeEvent) => {
    onUserInput("sort", e.target.value as SortOption);
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SortIcon fontSize="large" /> Sort the tv shows.
        </Typography>
        <FormControl sx={styles.formControl}>
          <InputLabel id="sort-label">Sort By</InputLabel>
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
      </CardContent>
    </Card>
  );
};

export default SortTvShowsCard;