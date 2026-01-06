import type { Meta, StoryObj } from "@storybook/react-vite";

import { ControlPanelOption } from "@/components/ControlPanel/ControlPanelOption";
import { ControlPanelRow } from "@/components/ControlPanel/ControlPanelRow";

const meta: Meta<typeof ControlPanelRow> = {
  title: "ControlPanel/Row",
  component: ControlPanelRow,
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
          minWidth: "300px"
        }}
      >
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof ControlPanelRow>;

// Default horizontal row with label and options
export const Default: Story = {
  args: {
    label: "Mode"
  },
  render: args => (
    <ControlPanelRow {...args}>
      <ControlPanelOption onClick={() => {}} ariaLabel="Light">
        A
      </ControlPanelOption>
      <ControlPanelOption onClick={() => {}} ariaLabel="System">
        B
      </ControlPanelOption>
      <ControlPanelOption onClick={() => {}} ariaLabel="Dark" isActive>
        C
      </ControlPanelOption>
    </ControlPanelRow>
  )
};

// Multiple rows stacked
export const MultipleRows: Story = {
  render: () => (
    <>
      <ControlPanelRow label="Accent">
        <ControlPanelOption onClick={() => {}} ariaLabel="Red" isActive>
          R
        </ControlPanelOption>
        <ControlPanelOption onClick={() => {}} ariaLabel="Blue">
          B
        </ControlPanelOption>
      </ControlPanelRow>
      <ControlPanelRow label="Mode">
        <ControlPanelOption onClick={() => {}} ariaLabel="Light">
          L
        </ControlPanelOption>
        <ControlPanelOption onClick={() => {}} ariaLabel="Dark" isActive>
          D
        </ControlPanelOption>
      </ControlPanelRow>
      <ControlPanelRow label="Lang">
        <ControlPanelOption onClick={() => {}} ariaLabel="English" isActive>
          EN
        </ControlPanelOption>
        <ControlPanelOption onClick={() => {}} ariaLabel="German">
          DE
        </ControlPanelOption>
      </ControlPanelRow>
    </>
  )
};
