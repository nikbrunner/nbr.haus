import { useSyncExternalStore } from "react";

import { getRouteApi } from "@tanstack/react-router";
import { createPortal } from "react-dom";

import MediaPlayer, { type PlaylistEntry } from "@/components/MediaPlayer";
import { AUDIO_PLAYER_ID } from "@/components/MiniPlayer";
import { formatStudyNumber } from "@/lib/study";
import { studyAudioTrack } from "@/lib/study/voices";

const rootRoute = getRouteApi("__root__");

/** The media player with the spoken home page first, then every narrated study, newest first */
export function SiteMediaPlayer() {
  const { posts, home } = rootRoute.useLoaderData();
  const isClient = useSyncExternalStore(
    noSubscription,
    () => true,
    () => false
  );

  const slugs = posts.map(post => post.slug);
  const playlist = posts.flatMap((post): PlaylistEntry[] => {
    const track = studyAudioTrack(post);
    if (!track) return [];
    return [
      {
        track,
        link: {
          to: "/study/$slug",
          params: { slug: post.slug },
          hash: AUDIO_PLAYER_ID
        },
        meta: [
          `Study ${formatStudyNumber(slugs, post.slug)}`,
          post.frontmatter.publishedAt
        ]
      }
    ];
  });

  const homeTrack = home && studyAudioTrack(home);
  const homeEntry: PlaylistEntry[] = homeTrack
    ? [
        {
          track: homeTrack,
          link: { to: "/", hash: AUDIO_PLAYER_ID },
          meta: ["Home"]
        }
      ]
    : [];

  if (!isClient) return null;
  // Rendered into the body: fixed inside the sheet, its mask would clip the player
  return createPortal(
    <MediaPlayer playlist={[...homeEntry, ...playlist]} />,
    document.body
  );
}

function noSubscription() {
  return () => {};
}
