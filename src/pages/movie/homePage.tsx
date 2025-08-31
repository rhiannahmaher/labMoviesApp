import React, { useState, useContext } from "react";
import PageTemplate from "../../components/movie/templateMovieListPage";
import { getMovies } from "../../api/tmdb-api";
import useFiltering from "../../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter
} from "../../components/movie/movieFilterUI";
import { BaseMovieProps, DiscoverMovies, SortOption } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../../components/spinner";
import AddToFavouritesIcon from '../../components/cardIcons/movie/addToFavourites'
import MovieSortUI from "../../components/movie/movieSortUI";
import useSorting from "../../hooks/useSortingMovies";
import { Box, Pagination } from "@mui/material";
import { AuthContext } from "../../contexts/authContext";

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
  // Sets pagination
  const [page, setPage] = useState(1);
  // Gets premium status from auth context
  const { isPremium } = useContext(AuthContext) || {};
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(["discover", page], () => getMovies(page));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );
  const [yearFilter, setYearFilter] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState("");

  const { sortOption, setSortOption, sortFunction } = useSorting("none");

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  // Handler for filter value changes
  const changeFilterValues = (type: string, value: string) => {
    if (type === "title" || type === "genre") {
      const changedFilter = { name: type, value };
      const updatedFilterSet =
        type === "title"
          ? [changedFilter, filterValues[1]]
          : [filterValues[0], changedFilter];
      setFilterValues(updatedFilterSet);
    } else if (type === "year") {
      setYearFilter(value);
    } else if (type === "minRating") {
      setMinRatingFilter(value);
    }
  };

  // Handler for sort option changes
  const changeSortOption = (type: "sort", value: SortOption) => {
  if (type === "sort") setSortOption(value);
  };

  const movies = data ? data.results : [];
  let filteredMovies = filterFunction(movies);

  // Applies year filter
  if (yearFilter) {
    filteredMovies = filteredMovies.filter((movie: { release_date: string; }) =>
      movie.release_date && movie.release_date.startsWith(yearFilter)
    );
  }

  // Applies minimum rating filter
  if (minRatingFilter) {
    const rating = parseFloat(minRatingFilter);
    if (!isNaN(rating)) {
      filteredMovies = filteredMovies.filter((movie: { vote_average: number; }) =>
        movie.vote_average >= rating
      );
    }
  }

  // Applies sorting
  const sortedMovies = sortFunction(filteredMovies);

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={sortedMovies}
        action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
        forwardTarget="/movies/popular"
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        yearFilter={yearFilter}
        minRatingFilter={minRatingFilter}
      />
      {/* If logged in (premium status), show sort filter */}
      {isPremium && (
        <MovieSortUI
          onSortChange={changeSortOption}
          sortOption={sortOption}
        />
      )}
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