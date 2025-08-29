import type { Meta, StoryObj } from '@storybook/react';
import TvShowDetails from "../../components/tvShow/tvShowDetails";
import SampleTvShow from "./sampleData";
import { MemoryRouter } from "react-router";
import TvShowsContextProvider from "../../contexts/tvShowsContext";

const meta = {
  title: "Tv Show Details Page/TvShowDetails",
  component: TvShowDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <TvShowsContextProvider>{Story()}</TvShowsContextProvider>,
  ],
} satisfies Meta<typeof TvShowDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: SampleTvShow
};
Basic.storyName = "Default";