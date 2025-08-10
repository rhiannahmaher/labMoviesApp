import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';

import TvShowsPage from "./pages/tvShowsPage";
import TvShowPage from "./pages/tvShowDetailsPage";
import FavouriteTvShowsPage from "./pages/favouriteTvShowsPage"; // NEW
import TvShowReviewPage from "./pages/tvShowReviewPage";
import AddTvShowReviewPage from './pages/addTvShowReviewPage';


// Declaration of query client - manages cache in browser.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />      {/* New Header  */}
          <MoviesContextProvider>
            <Routes>
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/:id" element={<MovieReviewPage/>} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/tv" element={<TvShowsPage/>} />
              <Route path="/tv/favourites" element={<FavouriteTvShowsPage />} />
              <Route path="/tv/:id" element={<TvShowPage />} />
              <Route path="/tv/reviews/:id" element={<TvShowReviewPage />} />
              <Route path="/tv/reviews/form" element={<AddTvShowReviewPage />} />
            </Routes>
          </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)