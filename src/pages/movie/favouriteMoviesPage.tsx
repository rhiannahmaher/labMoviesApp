import React, { useContext, useState } from "react"
import PageTemplate from "../../components/movie/templateMovieListPage";
import { MoviesContext } from "../../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../../api/tmdb-api";
import Spinner from "../../components/spinner";
import useFiltering from "../../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../../components/movie/movieFilterUI";
import RemoveFromFavourites from "../../components/cardIcons/movie/removeFromFavourites";
import WriteReview from "../../components/cardIcons/movie/writeReview";
import { SortOption } from '../../types/interfaces';
import MovieSortUI from "../../components/movie/movieSortUI";
import useSorting from "../../hooks/useSortingMovies";
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

const FavouriteMoviesPage: React.FC = () => {
  // Gets premium status from auth context
  const { isPremium } = useContext(AuthContext) || {};
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );
  const [yearFilter, setYearFilter] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState("");
  
  const { sortOption, setSortOption, sortFunction } = useSorting("none");

  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);

  // Handler for filter value changes
  const changeFilterValues = (type: string, value: string) => {
    if (type === "title" || type === "genre") {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
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

  let filteredMovies = allFavourites ? filterFunction(allFavourites) : [];

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
        title="Favourite Movies"
        movies={sortedMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
        backTarget="/movies/upcoming"
        forwardTarget="/tv"
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
    </>
  );
};

export default FavouriteMoviesPage;