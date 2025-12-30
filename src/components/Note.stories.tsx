import type { Meta, StoryObj } from "@storybook/react-vite";

import Note from "@/components/Note";

const meta: Meta<typeof Note> = {
  component: Note
};

export default meta;
type Story = StoryObj<typeof Note>;

export const Default: Story = {
  args: {
    children: "This is an important note that stands out from the rest of the content."
  }
};

export const WithParagraph: Story = {
  args: {
    children: (
      <p>
        This note contains a paragraph with more detailed information that needs
        to be highlighted for the reader.
      </p>
    )
  }
};
