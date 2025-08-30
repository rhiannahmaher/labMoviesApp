import type { Meta, StoryObj } from '@storybook/react';
import TvShowReview from "../../components/tvShow/tvShowReview";
import { MemoryRouter } from "react-router";
import SampleReview from "./sampleReview";

const meta = {
  title: 'TV Show Review/TvShowReview',
  component: TvShowReview,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
} satisfies Meta<typeof TvShowReview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    ...SampleReview,
  }
};
Basic.storyName = "Default";