import type { Meta, StoryObj } from '@storybook/react';
import ReviewForm from "../../components/movie/reviewForm";
import { MemoryRouter } from "react-router";
import SampleMovie from "./sampleData";

const meta = {
  title: 'Movie Review/ReviewForm',
  component: ReviewForm,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
} satisfies Meta<typeof ReviewForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    ...SampleMovie,
  }
};
Basic.storyName = "Default";