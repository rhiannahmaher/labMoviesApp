import React, { useContext } from "react"
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
  const { favourites: showIds } = useContext(TvShowsContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );
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
  const displayedShows = allFavourites
    ? filterFunction(allFavourites)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const changeSortOption = (type: "sort", value: SortOption) => {
    if (type === "sort") setSortOption(value);
  };

  const sortedShows = sortFunction(displayedShows);

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
      />
      <TvShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <TvShowSortUI
        onSortChange={changeSortOption}
        sortOption={sortOption}
      />
    </>
  );
};

export default FavouriteTvShowsPage;