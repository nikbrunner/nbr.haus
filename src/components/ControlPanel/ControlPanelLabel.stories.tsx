import type { Meta, StoryObj } from "@storybook/react-vite";

import { ControlPanelLabel } from "@/components/ControlPanel/ControlPanelLabel";

const meta: Meta<typeof ControlPanelLabel> = {
  title: "ControlPanel/Label",
  component: ControlPanelLabel,
  parameters: {
    layout: "centered"
  },
  decorators: [
    Story => (
      <div
        style={{
          background: "var(--color-bg-main)",
          border: "var(--border-size-2) solid var(--color-fg-accent)",
          padding: "var(--control-panel-padding)"
        }}
      >
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof ControlPanelLabel>;

// Default label
export const Default: Story = {
  render: () => <ControlPanelLabel>Mode</ControlPanelLabel>
};

// Short label
export const Short: Story = {
  render: () => <ControlPanelLabel>EN</ControlPanelLabel>
};

// Longer label
export const Long: Story = {
  render: () => <ControlPanelLabel>Sections</ControlPanelLabel>
};
