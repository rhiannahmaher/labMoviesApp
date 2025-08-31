import { useState } from "react";
import { SortOption, BaseMovieProps } from "../types/interfaces";

const useSorting = (initialSort: SortOption = "none") => {
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);

  // Sorts a collection of movies based on the current sort option
  const sortFunction = (collection: BaseMovieProps[]) => {
    const sorted = [...collection];
    switch (sortOption) {
      case "title":
        // Sort alphabetically by title
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "date":
        // Sort by release date, newest first
        return sorted.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
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