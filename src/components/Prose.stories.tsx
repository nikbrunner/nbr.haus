import type { Meta, StoryObj } from "@storybook/react-vite";

import Prose from "@/components/Prose";

const meta: Meta<typeof Prose> = {
  component: Prose
};

export default meta;
type Story = StoryObj<typeof Prose>;

export const Default: Story = {
  args: {
    children: (
      <>
        <p>I build frontend architecture and design systems.</p>
        <p>I genuinely love building and using products.</p>
      </>
    )
  }
};

export const Numbered: Story = {
  args: {
    numberPrefix: "01",
    children: (
      <>
        <p>We have seen this before. With the internet.</p>
        <h2>The Internet Arc</h2>
        <p>Then something shifted.</p>
        <h2>The Harari Warning</h2>
        <blockquote>Information networks serve power.</blockquote>
      </>
    )
  }
};
