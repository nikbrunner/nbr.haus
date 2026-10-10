import type { Meta, StoryObj } from "@storybook/react-vite";

import KeyHints from "@/components/KeyHints";

const meta: Meta<typeof KeyHints> = {
  component: KeyHints
};

export default meta;
type Story = StoryObj<typeof KeyHints>;

export const Prefix: Story = {
  args: {
    groups: [
      {
        title: "Theme",
        hints: [
          { keys: ["t r"], label: "Red" },
          { keys: ["t o"], label: "Orange" },
          { keys: ["t g"], label: "Green" },
          { keys: ["t b"], label: "Blue" }
        ]
      }
    ]
  }
};
