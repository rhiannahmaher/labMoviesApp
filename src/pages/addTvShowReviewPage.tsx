import React from "react";
import PageTemplate from "../components/templateTvShowPage";
import ReviewForm from "../components/tvShowReviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { TvShowDetailsProps } from "../types/interfaces";

const WriteReviewPage: React.FC = () => {
  const location = useLocation()
  const { showId } = location.state;
  const { data: show, error, isLoading, isError } = useQuery<TvShowDetailsProps, Error>(
    ["show", showId],
    () => getTvShow(showId)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      {show ? (
        <PageTemplate show={show}>
          <ReviewForm {...show} />
        </PageTemplate>
      ) : (
        <p>Waiting for tv show review details</p>
      )}
    </>
  );
};

export default WriteReviewPage;