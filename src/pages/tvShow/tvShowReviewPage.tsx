import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../../components/tvShow/templateTvShowPage";
import TvShowReview from "../../components/tvShow/tvShowReview";

const TvShowReviewPage: React.FC = () => {
  const { state : {show, review } } = useLocation()
  return (
    <PageTemplate show={show}>
      <TvShowReview {...review} /> {/* Child prop */}
    </PageTemplate>
  );
};

export default TvShowReviewPage;