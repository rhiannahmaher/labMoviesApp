import React, { useState } from "react";
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
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>(["tv", page], () => getTvShows(page));
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

  const shows = data ? data.results : [];
  const displayedTvShows = filterFunction(shows);
  const sortedTvShows = sortFunction(displayedTvShows);

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
      />
      <TvShowSortUI
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

export default TvShowsPage;