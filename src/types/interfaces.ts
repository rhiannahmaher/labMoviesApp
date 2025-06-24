export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    genre_ids?: number[];
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
  }

  export interface BaseMovieListProps {
    movies: BaseMovieProps[];
    selectFavourite: (movieId: number) => void;  //add this
  }

  export interface MovieDetailsProps extends BaseMovieProps { // Inherits info from BaseMovieProps
    genres: {
      id: number;
      name: string;
    }[];
    production_countries: {
      iso_3166_1: string; // From sampleData.ts
      name: string;
    }[];
  }

  export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export type FilterOption = "title" | "genre"; // Restricts filtering/filter option to either "title" or "genre". 

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}

export interface Review{
  id: string;
  content: string
  author: string
}
