import type { Meta, StoryObj } from "@storybook/react-vite";

import { SpecItem, SpecList } from "@/components/SpecList";

const meta: Meta<typeof SpecList> = {
  component: SpecList
};

export default meta;
type Story = StoryObj<typeof SpecList>;

export const Default: Story = {
  args: {
    children: (
      <>
        <SpecItem label="Name">Nikolaus Brunner, Nik for short</SpecItem>
        <SpecItem label="Base">Landshut, Bavaria, DE</SpecItem>
        <SpecItem label="Mail">
          <a href="mailto:nik@nbr.haus">nik@nbr.haus</a>
        </SpecItem>
      </>
    )
  }
};
