import type { Meta, StoryObj } from '@storybook/react';
import TvShowListHeader from "../../components/tvShow/headerTvShowList";
import { MemoryRouter } from "react-router";
import TvShowsContextProvider from "../../contexts/tvShowsContext";
import React from 'react';

const meta = {
  title: 'Tv Shows/Header',
  component: TvShowListHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <TvShowsContextProvider>{Story()}</TvShowsContextProvider>,
  ],
} satisfies Meta<typeof TvShowListHeader>;
  
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ title:'TV Shows'}
};

Basic.storyName = "Default";

