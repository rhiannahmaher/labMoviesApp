import React, { useState } from "react";
import PageTemplate from "../../components/movie/templateMovieListPage";
import { getPopularMovies } from "../../api/tmdb-api";
import useFiltering from "../../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../../components/movie/movieFilterUI";
import { BaseMovieProps, DiscoverMovies, SortOption } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../../components/spinner";
import AddToFavouritesIcon from '../../components/cardIcons/movie/addToFavourites'
import MovieSortUI from "../../components/movie/movieSortUI";
import useSorting from "../../hooks/useSortingMovies";
import { Box, Pagination } from "@mui/material";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(["popular", page], () => getPopularMovies(page));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );
  const { sortOption, setSortOption, sortFunction } = useSorting("none");

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const changeSortOption = (type: "sort", value: SortOption) => {
    if (type === "sort") setSortOption(value);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);
  const sortedMovies = sortFunction(displayedMovies);

  return (
    <>
      <PageTemplate
        title="Popular Movies"
        movies={sortedMovies}
        // Render prop.
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />
        }}    
        forwardTarget="/movies/upcoming" 
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <MovieSortUI
        onSortChange={changeSortOption}
        sortOption={sortOption}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <Pagination
          count={data?.total_pages || 1}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          color="primary"
          size="large"
        />
      </Box>
    </>
  );
};

export default HomePage;