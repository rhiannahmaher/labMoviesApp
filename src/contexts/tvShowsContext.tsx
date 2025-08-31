/*
  This context allows any component in the app to add/remove favourites, add to must-watch, and add reviews for TV shows.
*/

import React, { useState, useCallback } from "react";
import { BaseTvShowProps, Review } from "../types/interfaces";

interface TvShowContextInterface {
  favourites: number[];
  addToFavourites: ((show: BaseTvShowProps) => void);
  removeFromFavourites: ((show: BaseTvShowProps) => void);
  mustWatch: number[];
  addToMustWatch: (show: BaseTvShowProps) => void;
  addReview: ((show: BaseTvShowProps, review: Review) => void);
}

const initialContextState: TvShowContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  mustWatch: [], // Value.
  addToMustWatch: () => {},
  addReview: (show, review) => { show.id, review}
};

export const TvShowsContext = React.createContext<TvShowContextInterface>(initialContextState);

const TvShowsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites ] = useState<number[]>([]);
  const [mustWatch, setMustWatch ] = useState<number[]>([]); // useState only takes two variables (state and function). 
  const [myReviews, setMyReviews] = useState<Review[]>( [] );

  // Add a show to favourites if not already present
  const addToFavourites = useCallback((show: BaseTvShowProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(show.id)) {
        return [...prevFavourites, show.id];
      }
      return prevFavourites;
    });
  }, []);

  // Remove a show from favourites
  const removeFromFavourites = useCallback((show: BaseTvShowProps) => {
    setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== show.id));
  }, []);

  // Add a show to must-watch if not already present
  const addToMustWatch = useCallback((show: BaseTvShowProps) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(show.id)) {
        return [...prevMustWatch, show.id];
      }
      return prevMustWatch;
    });
  }, []);

  // Add a review for a show
  const addReview = (show:BaseTvShowProps, review: Review) => {
    setMyReviews( {...myReviews, [show.id]: review } )
  };

  return (
    <TvShowsContext.Provider
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
    </TvShowsContext.Provider>
  );
};

export default TvShowsContextProvider;