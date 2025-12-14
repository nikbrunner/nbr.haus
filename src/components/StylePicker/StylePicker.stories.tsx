import type { Meta, StoryObj } from "@storybook/react-vite";
import StylePicker from "./StylePicker";
import { withRouter } from "@/storybook/decorators/withRouter";
import type { RootSearchParams } from "@/validators/rootSearchParams";

const meta: Meta<typeof StylePicker> = {
  component: StylePicker
};

export default meta;
type Story = StoryObj<typeof StylePicker>;

export const Default: Story = {
  decorators: [withRouter<RootSearchParams>()]
};

export const LightModeCyanAccent: Story = {
  decorators: [
    withRouter<RootSearchParams>({
      searchParams: {
        colorMode: "light",
        hue: 144
      }
    })
  ]
};

export const DarkModeMagentaAccent: Story = {
  decorators: [
    withRouter<RootSearchParams>({
      searchParams: {
        colorMode: "dark",
        hue: 288
      }
    })
  ]
};
