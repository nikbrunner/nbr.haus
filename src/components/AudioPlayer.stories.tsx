import type { Meta, StoryObj } from "@storybook/react-vite";

import AudioPlayer from "@/components/AudioPlayer";

const meta: Meta<typeof AudioPlayer> = {
  component: AudioPlayer
};

export default meta;
type Story = StoryObj<typeof AudioPlayer>;

export const Default: Story = {
  args: {
    track: {
      slug: "out-of-sync",
      title: "Out of Sync",
      voices: [
        { id: "nik", label: "Nik", src: "/audio/out-of-sync.nik.mp3" },
        { id: "sadie", label: "Sadie", src: "/audio/out-of-sync.sadie.mp3" }
      ]
    }
  }
};
