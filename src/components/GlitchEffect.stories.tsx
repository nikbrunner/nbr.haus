import type { Meta, StoryObj } from "@storybook/react-vite";

import GlitchEffect from "@/components/GlitchEffect";

const meta: Meta<typeof GlitchEffect> = {
  title: "Components/GlitchEffect",
  component: GlitchEffect,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    scanlines: {
      control: "boolean"
    },
    disabled: {
      control: "boolean"
    }
  }
};

export default meta;
type Story = StoryObj<typeof GlitchEffect>;

export const Default: Story = {
  args: {
    children: "Glitch Effect"
  }
};

export const WithScanlines: Story = {
  args: {
    scanlines: true,
    children: "Glitch with Scanlines"
  }
};

export const OnHeading: Story = {
  render: () => (
    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
      <GlitchEffect>Hello World</GlitchEffect>
    </h1>
  )
};

export const MultipleInstances: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <p style={{ marginBottom: "1rem", opacity: 0.7 }}>
        Each instance has randomized timing - watch how they glitch independently:
      </p>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ fontSize: "1.25rem" }}>
          <GlitchEffect>Instance {i + 1}</GlitchEffect>
        </div>
      ))}
    </div>
  )
};
