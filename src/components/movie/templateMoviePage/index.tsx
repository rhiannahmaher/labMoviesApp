import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import { getMovieImages } from "../../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../../spinner';

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({movie, children}) => {
  const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
    ["images", movie.id],
    () => getMovieImages(movie.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error).message}</h1>;
  }

  const images = data as MovieImage[];
  return (
    <>
      <MovieHeader {...movie} />
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div>
            {images.length > 0 && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${images[0].file_path}`}
                alt="Movie"
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

export default TemplateMoviePage;