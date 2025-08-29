import type { Meta, StoryObj } from '@storybook/react';
import TvShowCard from "../../components/tvShow/tvShowCard";
import SampleTvShow from "./sampleData";
import { MemoryRouter } from "react-router";
import TvShowsContextProvider from "../../contexts/tvShowsContext";
import AddToFavouritesIcon from "../../components/cardIcons/tvShow/addToTvShowFavourites";

const meta = {
  title: 'Tv Shows/TvShowCard',
  component: TvShowCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <TvShowsContextProvider>{Story()}</TvShowsContextProvider>,
  ],
} satisfies Meta<typeof TvShowCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (show ) => <AddToFavouritesIcon {...show} />,
    show: SampleTvShow,
  }
};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleTvShow, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    show: sampleNoPoster,
    action: (show ) => <AddToFavouritesIcon {...show} />,
  }
};
Exceptional.storyName = "Exception";