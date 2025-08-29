
import type { Meta } from '@storybook/react';
import TvShowList from "../../components/tvShow/tvShowList";
import SampleTvShow from "./sampleData";
import { MemoryRouter } from "react-router";
import AddToTvShowFavouritesIcon from "../../components/cardIcons/tvShow/addToTvShowFavourites";
import Grid from "@mui/material/Grid";
import TvShowsContextProvider from "../../contexts/tvShowsContext";

const meta = {
  title: "Tv Shows/TvShowList",
  component: TvShowList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    (Story) => <TvShowsContextProvider><Story /></TvShowsContextProvider>,
  ],
} satisfies Meta<typeof TvShowList>;
export default meta;


export const Basic = () => {
  const movies = [
    { ...SampleTvShow, id: 1 },
    { ...SampleTvShow, id: 2 },
    { ...SampleTvShow, id: 3 },
    { ...SampleTvShow, id: 4 },
    { ...SampleTvShow, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <TvShowList
        shows={movies}
        action={(movie) => <AddToTvShowFavouritesIcon {...movie} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


