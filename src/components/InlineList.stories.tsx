import type { Meta, StoryObj } from "@storybook/react-vite";

import InlineList from "@/components/InlineList";

const meta: Meta<typeof InlineList> = {
  component: InlineList
};

export default meta;
type Story = StoryObj<typeof InlineList>;

export const Default: Story = {
  args: {
    children: [
      <a key="github" href="https://github.com/nikbrunner">
        GitHub
      </a>,
      <a key="linkedin" href="https://www.linkedin.com/in/nbru/">
        LinkedIn
      </a>
    ]
  }
};
