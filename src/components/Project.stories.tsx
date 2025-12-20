import type { Meta, StoryObj } from "@storybook/react-vite";
import Project from "./Project";
import { tech } from "@/config";

const meta: Meta<typeof Project> = {
  component: Project
};

export default meta;
type Story = StoryObj<typeof Project>;

export const Default: Story = {
  args: {
    title: "Project Title",
    status: "Active",
    stack: [tech.react, tech.typescript],
    topics: ["Web Development"],
    primaryLink: { url: "https://example.com", type: "Website" },
    year: "2023",
    children: "This is a project description."
  }
};
