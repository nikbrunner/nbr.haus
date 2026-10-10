import type { Meta, StoryObj } from "@storybook/react-vite";

import portraitMask from "@/assets/images/portrait-mask.webp";
import Portrait from "@/components/Portrait";

const meta: Meta<typeof Portrait> = {
  component: Portrait,
  decorators: [Story => <div style={{ width: "28ch" }}>{Story()}</div>]
};

export default meta;
type Story = StoryObj<typeof Portrait>;

export const Default: Story = {
  args: { mask: portraitMask, label: "Pencil sketch of Nik Brunner" }
};
