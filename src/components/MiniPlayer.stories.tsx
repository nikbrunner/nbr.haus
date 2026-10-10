import type { Meta, StoryObj } from "@storybook/react-vite";

import MiniPlayer from "@/components/MiniPlayer";

const meta: Meta<typeof MiniPlayer> = {
  component: MiniPlayer
};

export default meta;
type Story = StoryObj<typeof MiniPlayer>;

export const Default: Story = {
  args: {
    track: {
      id: "out-of-sync",
      title: "Out of Sync",
      voices: [{ id: "nik", label: "Nik", src: "/audio/out-of-sync.nik.mp3" }]
    }
  }
};
