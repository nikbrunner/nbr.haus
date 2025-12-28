import type { Meta, StoryObj } from "@storybook/react-vite";

import { ControlPanelPrintHint } from "./ControlPanelPrintHint";

const meta: Meta<typeof ControlPanelPrintHint> = {
  title: "Components/ControlPanel/PrintHint",
  component: ControlPanelPrintHint,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark"
    }
  },
  decorators: [
    Story => (
      <div
        style={{
          position: "relative",
          width: 300,
          height: 100,
          border: "2px dashed var(--fg-accent, #4ecdc4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 20
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: "var(--bg-main, #1a1a1a)",
            border: "2px solid var(--fg-accent, #4ecdc4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          🖨️
        </div>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof ControlPanelPrintHint>;

export const Default: Story = {
  args: {
    text: "Print CV",
    isVisible: true,
    style: {
      top: "50%",
      right: 80,
      transform: "translateY(-50%)"
    }
  }
};

export const LongerText: Story = {
  args: {
    text: "Pretty long ass text for this hint",
    isVisible: true,
    style: {
      top: "50%",
      right: 80,
      transform: "translateY(-50%)"
    }
  }
};

export const Hidden: Story = {
  args: {
    text: "Print CV",
    isVisible: false
  }
};
