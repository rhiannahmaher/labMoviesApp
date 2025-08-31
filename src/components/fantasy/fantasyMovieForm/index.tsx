import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, MenuItem, Typography, Box, Snackbar, Alert, InputLabel, Select, FormControl, Paper } from "@mui/material";
import { useQuery } from "react-query";
import { getGenres } from "../../../api/tmdb-api";
import Spinner from '../../spinner';
import { FantasyMovieFormInputs } from '../../../types/interfaces';

const FantasyMovieForm: React.FC = () => {
  const [fantasyMovies, setFantasyMovies] = useState<FantasyMovieFormInputs[]>([]);
  const { data, error, isLoading } = useQuery("genres", getGenres);
  const genresList = data?.genres || [];
  const defaultValues = {
    defaultValues: {
      title: "",
      overview: "",
      genres: [],
      releaseDate: "",
      runtime: 90,
      productionCompanies: "",
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FantasyMovieFormInputs>(defaultValues);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fantasyMovies");
    if (stored) {
      setFantasyMovies(JSON.parse(stored));
    }
  }, []);

  if (isLoading) 
    return <Spinner />;
  if (error) 
    return <div>Error loading genres</div>;

  const handleSnackClose = () => setOpen(false);

  const onSubmit: SubmitHandler<FantasyMovieFormInputs> = (data) => {
    const updatedMovies = [...fantasyMovies, data];
    setFantasyMovies((prev) => [...prev, data]);
    localStorage.setItem("fantasyMovies", JSON.stringify(updatedMovies));
    setOpen(true);
    reset();
  };

  return (
    <Box component="div" sx={{ maxWidth: 500, margin: "0 auto", p: 2 }}>
      {fantasyMovies.length > 0 && (
        <Paper sx={{ mb: 4, p: 3, borderRadius: 3, backgroundColor: '#23272f' }} elevation={3}>
          <Typography variant="h4" gutterBottom>My Fantasy Movies</Typography>
            <Box>
              {fantasyMovies.map((movie, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 2,
                    pr: 3,
                    backgroundColor: '#242526',
                    color: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mb: 2,
                    width: '100%'
                  }}
                  elevation={4}
                >
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>{movie.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'white', wordBreak: 'break-word' }}>
                    <span style={{ color: '#ffd600' }}>Overview:</span> {movie.overview}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    <span style={{ color: '#ffd600' }}>Genres:</span> {movie.genres.join(", ")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    <span style={{ color: '#ffd600' }}>Release Date:</span> {movie.releaseDate}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    <span style={{ color: '#ffd600' }}>Runtime:</span> {movie.runtime} min
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    <span style={{ color: '#ffd600' }}>Production Companies:</span> {movie.productionCompanies}
                  </Typography>
                </Paper>
              ))}
            </Box>
        </Paper>
      )}
      <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: '#23272f', mb: 2 }} elevation={3}>
        <Typography component="h2" variant="h4" gutterBottom>
          Create Your Fantasy Movie
        </Typography>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={handleSnackClose}
        >
          <Alert severity="success" variant="filled" onClose={handleSnackClose}>
            <Typography variant="h6">
              Fantasy movie created!
            </Typography>
          </Alert>
        </Snackbar>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                margin="normal"
                required
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name="overview"
            control={control}
            rules={{ required: "Overview is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Overview"
                fullWidth
                margin="normal"
                multiline
                minRows={3}
                required
                error={!!errors.overview}
                helperText={errors.overview?.message}
              />
            )}
          />
          <Controller
            name="genres"
            control={control}
            rules={{ required: "At least one genre is required" }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Genres</InputLabel>
                <Select
                  {...field}
                  multiple
                  label="Genres"
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  {genresList.map((genre: { id: number; name: string }) => (
                    <MenuItem key={genre.id} value={genre.name}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="releaseDate"
            control={control}
            rules={{ required: "Release date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Release Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                error={!!errors.releaseDate}
                helperText={errors.releaseDate?.message}
              />
            )}
          />
          <Controller
            name="runtime"
            control={control}
            rules={{
              required: "Runtime is required",
              min: { value: 1, message: "Runtime must be at least 1 minute" }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Runtime (minutes)"
                type="number"
                fullWidth
                margin="normal"
                required
                error={!!errors.runtime}
                helperText={errors.runtime?.message}
              />
            )}
          />
          <Controller
            name="productionCompanies"
            control={control}
            rules={{ required: "Production company is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Production Company(s)"
                fullWidth
                margin="normal"
                required
                error={!!errors.productionCompanies}
                helperText={errors.productionCompanies?.message}
              />
            )}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
              Create
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default FantasyMovieForm;