import type { Meta, StoryObj } from "@storybook/react-vite";
import ColorModePicker from "./ColorModePicker";
import { withRouter } from "@/storybook/decorators/withRouter";
import type { RootSearchParams } from "@/validators/rootSearchParams";

const meta: Meta<typeof ColorModePicker> = {
  component: ColorModePicker
};

export default meta;
type Story = StoryObj<typeof ColorModePicker>;

export const Default: Story = {
  decorators: [withRouter<RootSearchParams>()]
};

export const Light: Story = {
  decorators: [
    withRouter<RootSearchParams>({
      searchParams: {
        colorMode: "light"
      }
    })
  ]
};

export const Dark: Story = {
  decorators: [
    withRouter<RootSearchParams>({
      searchParams: {
        colorMode: "dark"
      }
    })
  ]
};

export const System: Story = {
  decorators: [
    withRouter<RootSearchParams>({
      searchParams: {
        colorMode: "system"
      }
    })
  ]
};
