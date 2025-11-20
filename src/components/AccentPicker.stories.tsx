import type { Meta, StoryObj } from "@storybook/react";
import AccentPicker from "./AccentPicker";
import { withRouter } from "@/storybook/decorators/withRouter";
import type { RootSearchParams } from "@/validators/rootSearchParams";

const meta: Meta<typeof AccentPicker> = {
  component: AccentPicker
};

export default meta;
type Story = StoryObj<typeof AccentPicker>;

export const Default: Story = {};

export const Cyan: Story = {
  decorators: [
    withRouter<RootSearchParams>({
      searchParams: {
        hue: 180
      }
    })
  ]
};

export const Red: Story = {
  decorators: [
    withRouter<RootSearchParams>({
      searchParams: {
        hue: 0
      }
    })
  ]
};

export const Green: Story = {
  decorators: [
    withRouter<RootSearchParams>({
      searchParams: {
        hue: 120
      }
    })
  ]
};
