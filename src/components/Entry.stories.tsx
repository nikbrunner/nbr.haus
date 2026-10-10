import type { Meta, StoryObj } from "@storybook/react-vite";

import Entry from "@/components/Entry";
import Text from "@/components/Text";

const meta: Meta<typeof Entry> = {
  component: Entry
};

export default meta;
type Story = StoryObj<typeof Entry>;

export const Job: Story = {
  args: {
    aside: (
      <>
        2020-03
        <br />
        2020-09
      </>
    ),
    children: (
      <>
        <Text caps bold>
          <a href="https://www.diva-e.com/de/">diva-e</a>
        </Text>
        <Text muted>Junior Frontend Developer</Text>
        <Text spaced>
          E-commerce platform and an internal social app. React, GraphQL, SCSS.
        </Text>
      </>
    )
  }
};
