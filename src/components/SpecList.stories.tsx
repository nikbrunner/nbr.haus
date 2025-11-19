import type { Meta, StoryObj } from "@storybook/react";
import SpecList from "./SpecList";

const meta: Meta<typeof SpecList> = {
  component: SpecList
};

export default meta;
type Story = StoryObj<typeof SpecList>;

export const Default: Story = {
  args: {
    items: [
      { label: "Label 1", value: "Value 1" },
      { label: "Label 2", value: "Value 2" }
    ]
  }
};
