import type { Meta, StoryObj } from '@storybook/react';
import ReviewForm from "../../components/tvShow/tvShowReviewForm";
import { MemoryRouter } from "react-router";
import SampleTvShow from "./sampleData";

const meta = {
  title: 'TV Show Review/ReviewForm',
  component: ReviewForm,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
} satisfies Meta<typeof ReviewForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    ...SampleTvShow,
  }
};
Basic.storyName = "Default";