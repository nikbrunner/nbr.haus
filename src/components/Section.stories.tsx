import type { Meta, StoryObj } from "@storybook/react";
import Section from "./Section";

const meta: Meta<typeof Section> = {
  component: Section
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    title: "Section Title",
    children: "Section content goes here."
  }
};
