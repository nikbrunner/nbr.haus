import type { Meta, StoryObj } from "@storybook/react-vite";

import AgentSkillFlow from "@/components/AgentSkillFlow";

const meta: Meta<typeof AgentSkillFlow> = {
  component: AgentSkillFlow
};

export default meta;
type Story = StoryObj<typeof AgentSkillFlow>;

export const Default: Story = {};
