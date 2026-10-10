import type { Meta, StoryObj } from "@storybook/react-vite";

import Contents from "@/components/Contents";

const meta: Meta<typeof Contents> = {
  component: Contents
};

export default meta;
type Story = StoryObj<typeof Contents>;

export const Default: Story = {
  args: {
    label: "Index",
    items: [
      {
        key: "home",
        marker: "/",
        label: <a href="#">Spec sheet</a>,
        current: true,
        children: [
          { key: "ident", marker: "01", label: <a href="#">Ident</a> },
          { key: "about", marker: "02", label: <a href="#">About</a> }
        ]
      },
      { key: "study", marker: "/study", label: <a href="#">Study</a> }
    ]
  }
};
