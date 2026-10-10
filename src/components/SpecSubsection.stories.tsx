import type { Meta, StoryObj } from "@storybook/react-vite";

import SpecSubsection from "@/components/SpecSubsection";

const meta: Meta<typeof SpecSubsection> = {
  component: SpecSubsection
};

export default meta;
type Story = StoryObj<typeof SpecSubsection>;

export const Default: Story = {
  args: {
    number: "04.2",
    title: "Log",
    note: "Latest public commits via GitHub",
    children: <p>Commits go here.</p>
  }
};
