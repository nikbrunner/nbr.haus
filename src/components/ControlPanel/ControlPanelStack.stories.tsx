import type { Meta, StoryObj } from "@storybook/react-vite";

import { ControlPanelOption } from "@/components/ControlPanel/ControlPanelOption";
import { ControlPanelStack } from "@/components/ControlPanel/ControlPanelStack";

const meta: Meta<typeof ControlPanelStack> = {
  title: "ControlPanel/Stack",
  component: ControlPanelStack,
  parameters: {
    layout: "centered"
  },
  decorators: [
    Story => (
      <div
        style={{
          background: "var(--color-bg-main)",
          border: "var(--border-size-2) solid var(--color-fg-accent)",
          padding: "var(--control-panel-padding)",
          width: "200px"
        }}
      >
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof ControlPanelStack>;

// Default vertical stack
export const Default: Story = {
  render: () => (
    <ControlPanelStack>
      <ControlPanelOption
        width="full"
        align="left"
        onClick={() => {}}
        ariaLabel="Item 1"
      >
        Item 1
      </ControlPanelOption>
      <ControlPanelOption
        width="full"
        align="left"
        onClick={() => {}}
        ariaLabel="Item 2"
      >
        Item 2
      </ControlPanelOption>
      <ControlPanelOption
        width="full"
        align="left"
        onClick={() => {}}
        ariaLabel="Item 3"
      >
        Item 3
      </ControlPanelOption>
    </ControlPanelStack>
  )
};

// Scrollable stack with max height
export const Scrollable: Story = {
  render: () => (
    <ControlPanelStack scroll maxHeight="120px">
      {["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"].map(item => (
        <ControlPanelOption
          key={item}
          width="full"
          align="left"
          onClick={() => {}}
          ariaLabel={item}
        >
          {item}
        </ControlPanelOption>
      ))}
    </ControlPanelStack>
  )
};
