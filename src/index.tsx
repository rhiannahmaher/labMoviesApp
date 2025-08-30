import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/movie/homePage";
import MoviePage from "./pages/movie/movieDetailsPage";
import FavouriteMoviesPage from "./pages/movie/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movie/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/movie/upcomingMoviesPage";
import PopularMoviesPage from "./pages/movie/popularMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/movie/addMovieReviewPage';

import TvShowsContextProvider from "./contexts/tvShowsContext";
import TvShowsPage from "./pages/tvShow/tvShowsPage";
import TvShowPage from "./pages/tvShow/tvShowDetailsPage";
import FavouriteTvShowsPage from "./pages/tvShow/favouriteTvShowsPage"; // NEW
import TvShowReviewPage from "./pages/tvShow/tvShowReviewPage";
import AddTvShowReviewPage from './pages/tvShow/addTvShowReviewPage';

import MyFantasyMoviesPage from './pages/fantasy/myFantasyMoviesPage';
import LoginPage from "./pages/profile/loginPage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoute from "./components/protectedRoute";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <BrowserRouter>
            <AuthContextProvider>
              <SiteHeader /> 
                <MoviesContextProvider>
                  <TvShowsContextProvider>
                      <Routes>
                        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                        <Route path="/movies/popular" element={<PopularMoviesPage />} />
                        <Route path="/movies/favourites" element={
                          <ProtectedRoute>
                            <FavouriteMoviesPage />
                          </ProtectedRoute>} 
                        />
                        <Route path="/movies/:id" element={<MoviePage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/reviews/:id" element={<MovieReviewPage/>} />
                        <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                        <Route path="/tv" element={<TvShowsPage/>} />
                        <Route path="/tv/favourites" element={
                          <ProtectedRoute>
                            <FavouriteTvShowsPage />
                          </ProtectedRoute>} 
                        />
                        <Route path="/tv/:id" element={<TvShowPage />} />
                        <Route path="/tv/reviews/:id" element={<TvShowReviewPage />} />
                        <Route path="/tv/reviews/form" element={<AddTvShowReviewPage />} />
                        <Route path="/fantasy" element={
                          <ProtectedRoute>
                            <MyFantasyMoviesPage />
                          </ProtectedRoute>} 
                        />
                        <Route path="/login" element={<LoginPage />} />
                      </Routes>
                  </TvShowsContextProvider>
                </MoviesContextProvider>
            </AuthContextProvider>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)