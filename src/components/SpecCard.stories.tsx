import type { Meta, StoryObj } from "@storybook/react-vite";
import SpecCard from "./SpecCard";

const meta: Meta<typeof SpecCard> = {
  component: SpecCard
};

export default meta;
type Story = StoryObj<typeof SpecCard>;

export const Default: Story = {
  args: {
    title: "Spec Card Title",
    children: "Card content goes here."
  }
};
