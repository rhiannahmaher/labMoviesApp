import { useState } from "react";
import { SortOption, BaseTvShowProps } from "../types/interfaces";

const useSorting = (initialSort: SortOption = "none") => {
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);

  const sortFunction = (collection: BaseTvShowProps[]) => {
    const sorted = [...collection];
    switch (sortOption) {
      case "title":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "date":
        return sorted.sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime());
      case "rating":
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