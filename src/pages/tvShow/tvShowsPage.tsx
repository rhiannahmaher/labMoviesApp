import React, { useContext, useState } from "react";
import PageTemplate from "../../components/tvShow/templateTvShowListPage";
import { getTvShows } from "../../api/tmdb-api";
import useFiltering from "../../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../../components/tvShow/tvShowFilterUI";
import { BaseTvShowProps, DiscoverTvShows } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../../components/spinner";
import AddToTvShowFavouritesIcon from '../../components/cardIcons/tvShow/addToTvShowFavourites'
import { SortOption } from '../../types/interfaces';
import TvShowSortUI from "../../components/tvShow/tvShowSortUI";
import useSorting from "../../hooks/useSortingTvShows";
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

const TvShowsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { isPremium } = useContext(AuthContext) || {};
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>(["tv", page], () => getTvShows(page));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );
  const [yearFilter, setYearFilter] = useState("");
  const [minRatingFilter, setMinRatingFilter] = useState("");
  
  const { sortOption, setSortOption, sortFunction } = useSorting("none");

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

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

  const changeSortOption = (type: "sort", value: SortOption) => {
  if (type === "sort") setSortOption(value);
  };

  const shows = data ? data.results : [];
  let filteredTvShows = filterFunction(shows);

  if (yearFilter) {
    filteredTvShows = filteredTvShows.filter((show: { first_air_date: string; }) =>
      show.first_air_date && show.first_air_date.startsWith(yearFilter)
    );
  }

  if (minRatingFilter) {
    const rating = parseFloat(minRatingFilter);
    if (!isNaN(rating)) {
      filteredTvShows = filteredTvShows.filter((show: { vote_average: number; }) =>
        show.vote_average >= rating
      );
    }
  }
  const sortedTvShows = sortFunction(filteredTvShows);
  return (
    <>
      <PageTemplate
        title="TV Shows"
        shows={sortedTvShows}
        // Render prop.
        action={(show: BaseTvShowProps) => {
          return <AddToTvShowFavouritesIcon {...show} />
        }}      
        backTarget="/movies/favourites"
        forwardTarget="/tv/favourites"
      />
      <TvShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        yearFilter={yearFilter}
        minRatingFilter={minRatingFilter}
      />
      {isPremium && (
        <TvShowSortUI
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

export default TvShowsPage;