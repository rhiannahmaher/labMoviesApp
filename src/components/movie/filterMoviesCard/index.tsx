import React, { ChangeEvent } from "react";
import { FilterOption, GenreData } from "../../../types/interfaces";
import { Box, SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../../spinner';

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

interface FilterMoviesCardProps {
  titleFilter: string;
  genreFilter: string;
  yearFilter: string;
  minRatingFilter: string;
  onUserInput: (type: string, value: string) => void;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, yearFilter, minRatingFilter, onUserInput }) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  // Adds 'all' as first option
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }
  
  const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
    e.preventDefault()
      onUserInput(type, value)
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value)
  }

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value)
  }; 

  return (
    <>
      <Card sx={styles.filterCard} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1" sx={styles.filterTitle}>
            <FilterAltIcon fontSize="large" sx={{ mr: 1 }} />
            Filter
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
            <TextField
              sx={styles.filterField}
              id="filled-search"
              label="Search field"
              type="search"
              value={titleFilter}
              variant="filled"
              onChange={handleTextChange}
            />
            <FormControl variant="filled" sx={{ ...styles.formControl, ...styles.filterField }}>
              <InputLabel id="genre-label" shrink>Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre-select"
                value={genreFilter}
                onChange={handleGenreChange}
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
      {/* Advanced filter searching */}
      <Card sx={styles.filterCard} variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2,  }}>
            <Typography variant="h5" component="h1" sx={styles.filterTitle}>
              <SortIcon fontSize="large" sx={{ mr: 1 }} />
              Advanced Filter
            </Typography>
            <TextField
              label="Release Year"
              type="number"
              value={yearFilter}
              onChange={e => onUserInput("year", e.target.value)}
              variant="filled"
              sx={styles.filterField}
            />
            <TextField
              label="Min Rating"
              type="number"
              value={minRatingFilter}
              onChange={e => onUserInput("minRating", e.target.value)}
              inputProps={{ min: 0, max: 10, step: 0.1 }}
              variant="filled"
              sx={styles.filterField}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default FilterMoviesCard;