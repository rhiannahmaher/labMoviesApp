import type { Meta, StoryObj } from '@storybook/react';
import MovieReview from "../../components/movie/movieReview";
import { MemoryRouter } from "react-router";
import SampleReview from "./sampleReview";

const meta = {
  title: 'Movie Review/MovieReview',
  component: MovieReview,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
} satisfies Meta<typeof MovieReview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    ...SampleReview,
  }
};
Basic.storyName = "Default";