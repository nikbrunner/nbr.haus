import type { Meta, StoryObj } from "@storybook/react-vite";

import WebUiAgentFlow from "@/components/WebUiAgentFlow";

const meta: Meta<typeof WebUiAgentFlow> = {
  component: WebUiAgentFlow
};

export default meta;
type Story = StoryObj<typeof WebUiAgentFlow>;

export const Default: Story = {};
