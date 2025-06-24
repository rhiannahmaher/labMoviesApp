import React, { useState, useCallback } from "react";
import { BaseMovieProps } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    mustWatch: number[];
    addToMustWatch: (movie: BaseMovieProps) => void;
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    mustWatch: [], // Value.
    addToMustWatch: () => {} // Function. 
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites ] = useState<number[]>([]);
    const [mustWatch, setMustWatch ] = useState<number[]>([]); // useState only takes two variables (state and function). 

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
                
                // Test for checking success of feature.
                /*
                const updatedMustWatch = [...prevMustWatch, movie.id];
                console.log("Added to Must Watch:", updatedMustWatch);
                return updatedMustWatch
                */

                return [...prevMustWatch, movie.id];
            }
            return prevMustWatch;
        });
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                mustWatch,
                addToMustWatch
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;