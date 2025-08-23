import React from "react";
import TemplateFantasyMoviePage from "../../components/fantasy/templateFantasyMoviesPage";
import FantasyMovieForm from "../../components/fantasy/fantasyMovieForm";

const MyFantasyMoviesPage: React.FC = () => {

  return (
    <TemplateFantasyMoviePage>
      <FantasyMovieForm />
    </TemplateFantasyMoviePage>
  );
};

export default MyFantasyMoviesPage;