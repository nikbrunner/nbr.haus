import type { Meta, StoryObj } from "@storybook/react-vite";

import ProgressTrack from "@/components/ProgressTrack";

const meta: Meta<typeof ProgressTrack> = {
  component: ProgressTrack,
  decorators: [Story => <div style={{ width: "40ch" }}>{Story()}</div>]
};

export default meta;
type Story = StoryObj<typeof ProgressTrack>;

export const Default: Story = {
  args: { time: 258, duration: 351, onSeek: () => {} }
};
