import React from "react";
import TvShowHeader from "../headerTvShow";
import Grid from "@mui/material/Grid";
import { getTvShowImages } from "../../../api/tmdb-api";
import { TvShowImage, TvShowDetailsProps } from "../../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../../spinner';

interface TemplateTvShowPageProps {
  show: TvShowDetailsProps;
  children: React.ReactElement;
}

const TemplateTvShowPage: React.FC<TemplateTvShowPageProps> = ({show, children}) => {
  const { data, error, isLoading, isError } = useQuery<TvShowImage[], Error>(
    ["images", show.id],
    () => getTvShowImages(show.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error).message}</h1>;
  }

  const images = data as TvShowImage[];
  return (
    <>
      <TvShowHeader {...show} />
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div>
            {images.length > 0 && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${images[0].file_path}`}
                alt="Tv Show"
                style={{ width: "100%", height: 500, objectFit: "cover", borderRadius: 10 }}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateTvShowPage;