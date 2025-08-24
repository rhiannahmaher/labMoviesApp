import React from "react";
import PageTemplate from "../../components/movie/templateMovieListPage";
import { getUpcomingMovies } from "../../api/tmdb-api";
import useFiltering from "../../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../../components/movie/movieFilterUI";
import { BaseMovieProps, DiscoverMovies, SortOption } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../../components/spinner";
import AddToMustWatchIcon from "../../components/cardIcons/movie/addToMustWatch";
import MovieSortUI from "../../components/movie/movieSortUI";
import useSorting from "../../hooks/useSortingMovies";

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

// Updated to cache movies using react-query library.
const UpcomingMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("upcoming", getUpcomingMovies); // Used existing DiscoverMovies interface. 
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
        title="Upcoming Movies"
        movies={sortedMovies}
        // Render prop.
        action={(movie: BaseMovieProps) => {
          return <AddToMustWatchIcon {...movie} />
        }}    
        backTarget="/movies/popular"
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
    </>
  );
};

export default UpcomingMoviesPage;