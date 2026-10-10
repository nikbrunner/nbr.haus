import type { Meta, StoryObj } from "@storybook/react-vite";

import MediaPlayer from "@/components/MediaPlayer";

const voices = (slug: string) => [
  { id: "nik", label: "Nik", src: `/audio/${slug}.nik.mp3` }
];

const meta: Meta<typeof MediaPlayer> = {
  component: MediaPlayer
};

export default meta;
type Story = StoryObj<typeof MediaPlayer>;

export const Default: Story = {
  args: {
    playlist: [
      {
        track: {
          id: "out-of-sync",
          title: "Out of Sync",
          voices: voices("out-of-sync")
        },
        link: {
          to: "/study/$slug",
          params: { slug: "out-of-sync" },
          hash: "listen"
        },
        meta: ["Study 07", "2026-10-10"]
      }
    ]
  }
};
