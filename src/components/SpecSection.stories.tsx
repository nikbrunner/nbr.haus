import type { Meta, StoryObj } from "@storybook/react-vite";

import SpecSection from "@/components/SpecSection";

const meta: Meta<typeof SpecSection> = {
  component: SpecSection
};

export default meta;
type Story = StoryObj<typeof SpecSection>;

export const Default: Story = {
  args: {
    number: "02",
    title: "About",
    children: <p>I build frontend architecture and design systems.</p>
  }
};

export const WithNote: Story = {
  args: {
    number: "06",
    title: "Study",
    note: <a href="/study">All posts</a>,
    children: <p>Notes on what I read.</p>
  }
};
