import type { Meta, StoryObj } from "@storybook/react";
import GlitchEffect from "./GlitchEffect";

const meta: Meta<typeof GlitchEffect> = {
  title: "Components/GlitchEffect",
  component: GlitchEffect,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    intensity: {
      control: "select",
      options: ["subtle", "medium", "strong"]
    },
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

export const Subtle: Story = {
  args: {
    intensity: "subtle",
    children: "Subtle Glitch Effect"
  }
};

export const Medium: Story = {
  args: {
    intensity: "medium",
    children: "Medium Glitch Effect"
  }
};

export const Strong: Story = {
  args: {
    intensity: "strong",
    children: "Strong Glitch Effect"
  }
};

export const WithScanlines: Story = {
  args: {
    intensity: "subtle",
    scanlines: true,
    children: "Glitch with Scanlines"
  }
};

export const OnHeading: Story = {
  render: () => (
    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
      <GlitchEffect intensity="subtle">Hello World</GlitchEffect>
    </h1>
  )
};

export const Comparison: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <div>
        <strong>Subtle (default):</strong>{" "}
        <GlitchEffect intensity="subtle">Watch for the glitch...</GlitchEffect>
      </div>
      <div>
        <strong>Medium:</strong>{" "}
        <GlitchEffect intensity="medium">More noticeable effect</GlitchEffect>
      </div>
      <div>
        <strong>Strong:</strong>{" "}
        <GlitchEffect intensity="strong">Maximum distortion</GlitchEffect>
      </div>
      <div>
        <strong>With Scanlines:</strong>{" "}
        <GlitchEffect intensity="medium" scanlines>
          CRT monitor vibes
        </GlitchEffect>
      </div>
    </div>
  )
};
