import { useState } from "react";
import { SortOption, BaseTvShowProps } from "../types/interfaces";

const useSorting = (initialSort: SortOption = "none") => {
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);

  // Sorts a collection of TV shows based on the current sort option
  const sortFunction = (collection: BaseTvShowProps[]) => {
    const sorted = [...collection];
    switch (sortOption) {
      case "title":
        // Sort alphabetically by show name
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "date":
        // Sort by first air date, newest first
        return sorted.sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime());
      case "rating":
        // Sort by rating, highest first
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return sorted;
    }
  };

  return {
    sortOption,
    setSortOption,
    sortFunction,
  };
};

export default useSorting;