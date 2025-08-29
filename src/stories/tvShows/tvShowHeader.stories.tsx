import type { Meta, StoryObj } from '@storybook/react';
import TvShowHeader from "../../components/movie/headerMovie";
import SampleTvShow from "./sampleData";
import { MemoryRouter } from "react-router";
import React from 'react';

const meta = {
  title: "Tv Show Details Page/TvShowHeader",
  component: TvShowHeader,
  decorators: [
    (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
  ],
} satisfies Meta<typeof TvShowHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: {
    ...SampleTvShow
  }
};
Basic.storyName = "Default";