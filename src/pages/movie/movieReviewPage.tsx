import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../../components/movie/templateMoviePage";
import MovieReview from "../../components/movie/movieReview";

const MovieReviewPage: React.FC = () => {
  const { state : {movie, review } } = useLocation()
  return (
    <PageTemplate movie={movie}>
      <MovieReview {...review} /> {/* Child prop */}
    </PageTemplate>
  );
};

export default MovieReviewPage;