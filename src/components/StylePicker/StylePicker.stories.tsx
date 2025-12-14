import type { Meta, StoryObj } from "@storybook/react-vite";
import { StylePickers, StyleStatus } from "./index";
import { withRouter } from "@/storybook/decorators/withRouter";
import type { RootSearchParams } from "@/validators/rootSearchParams";

// Combined story showing both components together
function StylePickerCombo() {
  return (
    <>
      <StyleStatus />
      <StylePickers />
    </>
  );
}

const meta: Meta<typeof StylePickerCombo> = {
  component: StylePickerCombo
};

export default meta;
type Story = StoryObj<typeof StylePickerCombo>;

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
