import type { Meta, StoryObj } from "@storybook/react-vite";

import ControlBar from "@/components/ControlBar";
import ControlButton from "@/components/ControlButton";
import ControlGroup from "@/components/ControlGroup";

const meta: Meta<typeof ControlBar> = {
  component: ControlBar
};

export default meta;
type Story = StoryObj<typeof ControlBar>;

export const Default: Story = {
  args: {
    children: (
      <>
        <ControlGroup label="Mode">
          <ControlButton>Light</ControlButton>
          <ControlButton pressed>Sys</ControlButton>
          <ControlButton>Dark</ControlButton>
        </ControlGroup>
        <ControlGroup label="Go">
          <a href="/">Index</a>
          <a href="/study">Study</a>
        </ControlGroup>
      </>
    )
  }
};
