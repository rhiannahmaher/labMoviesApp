import React, { useContext, useState } from "react"
import PageTemplate from "../../components/tvShow/templateTvShowListPage";
import { TvShowsContext } from "../../contexts/tvShowsContext";
import { useQueries } from "react-query";
import { getTvShow } from "../../api/tmdb-api";
import Spinner from "../../components/spinner";
import useFiltering from "../../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../../components/tvShow/tvShowFilterUI";
import RemoveFromFavourites from "../../components/cardIcons/tvShow/removeFromTvShowFavourites";
import WriteReview from "../../components/cardIcons/tvShow/writeTvShowReview";
import { SortOption } from '../../types/interfaces';
import TvShowSortUI from "../../components/tvShow/tvShowSortUI";
import useSorting from "../../hooks/useSortingTvShows";
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

const FavouriteTvShowsPage: React.FC = () => {
  // Gets premium status from auth context
  const { isPremium } = useContext(AuthContext) || {};
  const { favourites: showIds } = useContext(TvShowsContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );
  const [yearFilter, setYearFilter] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState("");
  
  const { sortOption, setSortOption, sortFunction } = useSorting("none");

  const favouriteTvShowQueries = useQueries(
    showIds.map((showId) => {
      return {
        queryKey: ["show", showId],
        queryFn: () => getTvShow(showId.toString()),
      };
    })
  );

  const isLoading = favouriteTvShowQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTvShowQueries.map((q) => q.data);
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

  let filteredShows = allFavourites ? filterFunction(allFavourites) : [];

  // Applies minimum rating filter
  if (yearFilter) {
    filteredShows = filteredShows.filter((show: { first_air_date: string; }) =>
      show.first_air_date && show.first_air_date.startsWith(yearFilter)
    );
  }

  // Applies minimum rating filter
  if (minRatingFilter) {
    const rating = parseFloat(minRatingFilter);
    if (!isNaN(rating)) {
      filteredShows = filteredShows.filter((show: { vote_average: number; }) =>
        show.vote_average >= rating
      );
    }
  }
  // Applies sorting
  const sortedShows = sortFunction(filteredShows);
  return (
    <>
      <PageTemplate
        title="Favourite TV Shows"
        shows={sortedShows}
        action={(show) => {
          return (
            <>
              <RemoveFromFavourites {...show} />
              <WriteReview {...show} />
            </>
          );
        }}
        backTarget="/tv"
        forwardTarget="/fantasy"
      />
      <TvShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        yearFilter={yearFilter}
        minRatingFilter={minRatingFilter}
      />
      {/* If logged in (premium status), show sort filter */}
      {isPremium && (
        <TvShowSortUI
          onSortChange={changeSortOption}
          sortOption={sortOption}
        />
      )}
    </>
  );
};

export default FavouriteTvShowsPage;