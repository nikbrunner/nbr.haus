import type { Meta, StoryObj } from "@storybook/react-vite";

import DocumentHeader from "@/components/DocumentHeader";

const meta: Meta<typeof DocumentHeader> = {
  component: DocumentHeader
};

export default meta;
type Story = StoryObj<typeof DocumentHeader>;

export const Default: Story = {
  args: {
    name: "Nikolaus Brunner",
    role: "Senior Design Engineer",
    meta: ["Landshut, DE", "Rev 2026-10-06"],
    title: ["Personal spec sheet", "nbr.haus"]
  }
};

export const Post: Story = {
  args: {
    ...Default.args,
    meta: ["Study", "2024-11-03"],
    title: ["The Trust Evolution"]
  }
};
