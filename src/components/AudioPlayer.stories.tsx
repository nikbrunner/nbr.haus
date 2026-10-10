import type { Meta, StoryObj } from "@storybook/react-vite";

import AudioPlayer from "@/components/AudioPlayer";

const meta: Meta<typeof AudioPlayer> = {
  component: AudioPlayer
};

export default meta;
type Story = StoryObj<typeof AudioPlayer>;

export const Default: Story = {
  args: {
    voices: [
      { id: "nik", label: "Nik", src: "/audio/the-trust-evolution.nik.mp3" },
      { id: "sadie", label: "Sadie", src: "/audio/the-trust-evolution.sadie.mp3" }
    ]
  }
};
