// Movie interfaces

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
  action: (m: BaseMovieProps) => React.ReactNode;
  backTarget?: string;
  forwardTarget?: string;
}

export interface MovieDetailsProps extends BaseMovieProps { // Inherits info from BaseMovieProps
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  production_companies: {
    id: number;
    name: string;
    logo_path?: string;
    origin_country?: string;
  }[];
  imdb_id: string;
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

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}

export interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface Review {
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  movieId?: number,
  showId?: number
}

export interface Review{
  id: string;
  content: string
  author: string
}

// Tv Show interfaces

export interface BaseTvShowProps {
  name: string;
  id: number;
  genre_ids?: number[];
  original_language: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  episode_run_time: number[];
  vote_count: number;
  status: string;
  number_of_seasons: number;
  favourite?: boolean;
  tagline: string;
}

export interface BaseTvShowListProps {
  shows: BaseTvShowProps[];
  action: (m: BaseTvShowProps) => React.ReactNode;
  backTarget?: string;
  forwardTarget?: string;
}

export interface TvShowDetailsProps extends BaseTvShowProps {
  homepage: string | undefined; // Inherits info from BaseMovieProps
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  production_companies: {
    id: number;
    name: string;
    logo_path?: string;
    origin_country?: string;
  }[];
}

export interface TvShowListPageTemplateProps extends BaseTvShowListProps {
  title: string;
}

export interface TvShowImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface TvShowPageProps {
  show: TvShowDetailsProps;
  images: TvShowImage[];
}

export interface DiscoverTvShows {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseTvShowProps[];
}

// Fantasy Movie interfaces

export interface FantasyMoviePageTemplateProps {
  title: string;
  backTarget?: string;
  forwardTarget?: string;
  children?: React.ReactNode;
}

export type FantasyMovieFormInputs = {
  title: string;
  overview: string;
  genres: string[];
  releaseDate: string;
  runtime: number;
  productionCompanies: string;
};

// Shared interfaces

export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
}

export type FilterOption = "title" | "genre"; // Restricts filtering/filter option to either "title" or "genre". 

export type SortOption = "none" | "title" | "date" | "rating" | "popularity";

export type CastMember = {
  id: number;
  name: string;
  character: string;
}

