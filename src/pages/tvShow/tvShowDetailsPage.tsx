import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import TvShowDetails from "../../components/tvShow/tvShowDetails";
import PageTemplate from "../../components/tvShow/templateTvShowPage";
import { getTvShow } from '../../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../../components/spinner';
import { TvShowDetailsProps } from "../../types/interfaces";

const TvShowDetailsPage: React.FC= () => {
  const { id } = useParams();
  const { data: show, error, isLoading, isError } = useQuery<TvShowDetailsProps, Error>(
    ["tv", id],
    ()=> getTvShow(id||"")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {show ? (
        <>
        <PageTemplate show={show}> 
          <TvShowDetails {...show} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for show details</p>
    )}
    </>
  );
};

export default TvShowDetailsPage;