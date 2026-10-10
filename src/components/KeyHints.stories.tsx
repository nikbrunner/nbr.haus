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
        title: "Colors",
        hints: [
          { keys: ["c a"], label: "Atom" },
          { keys: ["c f"], label: "Facility" },
          { keys: ["c k"], label: "Koyo" },
          { keys: ["c p"], label: "Polymer" },
          { keys: ["c v"], label: "Viridian" }
        ]
      }
    ]
  }
};
