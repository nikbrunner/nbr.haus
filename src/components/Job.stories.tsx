import type { Meta, StoryObj } from "@storybook/react-vite";

import { tech } from "@/config";

import Job from "./Job";

const meta: Meta<typeof Job> = {
  component: Job
};

export default meta;
type Story = StoryObj<typeof Job>;

export const Default: Story = {
  args: {
    company: "Acme Corp",
    position: "Senior Engineer",
    period: "2020 - Present",
    tech: [tech.react, tech.typescript],
    children: "Worked on cool stuff."
  }
};
