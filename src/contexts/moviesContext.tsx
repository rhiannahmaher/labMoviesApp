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

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
  }, []);

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(movie.id)) {

        return [...prevMustWatch, movie.id];
      }
      return prevMustWatch;
    });
  }, []);

  const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
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