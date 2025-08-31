/*
  This context allows any component in the app to add/remove favourites, add to must-watch, and add reviews.
*/
import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  addToFavourites: ((movie: BaseMovieProps) => void);
  removeFromFavourites: ((movie: BaseMovieProps) => void);
  mustWatch: number[];
  addToMustWatch: (movie: BaseMovieProps) => void;
  addReview: ((movie: BaseMovieProps, review: Review) => void);
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  mustWatch: [], // Value.
  addToMustWatch: () => {},
  addReview: (movie, review) => { movie.id, review}
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites ] = useState<number[]>([]);
  const [mustWatch, setMustWatch ] = useState<number[]>([]); // useState only takes two variables (state and function). 
  const [myReviews, setMyReviews] = useState<Review[]>( [] );

  // Adds a movie to favourites if not already present
  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }
      return prevFavourites;
    });
  }, []);

  // Remove a movie from favourites
  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
  }, []);

  // Add a movie to must-watch if not already present
  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(movie.id)) {

        return [...prevMustWatch, movie.id];
      }
      return prevMustWatch;
    });
  }, []);

  // Add a review for a movie
  const addReview = (movie:BaseMovieProps, review: Review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        mustWatch,
        addToMustWatch,
        addReview
      }}
    >
    {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;