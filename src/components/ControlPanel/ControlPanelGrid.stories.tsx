import type { Meta, StoryObj } from "@storybook/react-vite";

import { ControlPanelGrid } from "@/components/ControlPanel/ControlPanelGrid";
import { ControlPanelOption } from "@/components/ControlPanel/ControlPanelOption";

const meta: Meta<typeof ControlPanelGrid> = {
  title: "ControlPanel/Grid",
  component: ControlPanelGrid,
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
          width: "250px"
        }}
      >
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof ControlPanelGrid>;

// Exactly 3 items (fills one row)
export const ThreeItems: Story = {
  render: () => (
    <ControlPanelGrid>
      <ControlPanelOption onClick={() => {}} ariaLabel="A">
        A
      </ControlPanelOption>
      <ControlPanelOption onClick={() => {}} ariaLabel="B">
        B
      </ControlPanelOption>
      <ControlPanelOption onClick={() => {}} ariaLabel="C" isActive>
        C
      </ControlPanelOption>
    </ControlPanelGrid>
  )
};

// Fewer than 3 items
export const TwoItems: Story = {
  render: () => (
    <ControlPanelGrid>
      <ControlPanelOption onClick={() => {}} ariaLabel="A" isActive>
        A
      </ControlPanelOption>
      <ControlPanelOption onClick={() => {}} ariaLabel="B">
        B
      </ControlPanelOption>
    </ControlPanelGrid>
  )
};

// Many items (flows to next rows)
export const ManyItems: Story = {
  render: () => (
    <ControlPanelGrid>
      {[1, 2, 3, 4, 5, 6, 7].map(n => (
        <ControlPanelOption
          key={n}
          onClick={() => {}}
          ariaLabel={`Option ${n}`}
          isActive={n === 1}
        >
          {n}
        </ControlPanelOption>
      ))}
    </ControlPanelGrid>
  )
};
