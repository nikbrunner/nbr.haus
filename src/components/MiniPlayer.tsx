import { useHotkey } from "@tanstack/react-hotkeys";
import { Link, useLocation } from "@tanstack/react-router";
import { createPortal } from "react-dom";

import ControlButton from "@/components/ControlButton";
import { useAudio } from "@/hooks/useAudio";
import { stop, toggle } from "@/lib/audio";
import { formatTime } from "@/lib/formatTime";

/**
 * A floating bar for the audio that keeps playing on other pages. On the track's own study page
 * the full player takes over. Also owns Space, so it is registered once for the whole site.
 */
export default function MiniPlayer() {
  const audio = useAudio();
  const pathname = useLocation({ select: location => location.pathname });
  const track = audio.track;
  const onTrackPage = track !== null && pathname === `/study/${track.slug}`;
  const started = track !== null && (audio.playing || audio.time > 0);
  const visible = started && !onTrackPage;

  useHotkey("Space", toggle, { enabled: onTrackPage || visible });

  if (!visible || !track) return null;

  // Rendered into the body: fixed inside the sheet, its mask would clip the bar
  return createPortal(
    <aside className="MiniPlayer" aria-label="Audio player">
      <ControlButton onClick={toggle}>
        {audio.playing ? "Pause" : "Play "}
      </ControlButton>
      <Link
        className="MiniPlayer__title"
        to="/study/$slug"
        params={{ slug: track.slug }}
      >
        {track.title}
      </Link>
      <span className="MiniPlayer__time">
        {formatTime(audio.time)} / {formatTime(audio.duration)}
      </span>
      <ControlButton aria-label="Stop and close" onClick={stop}>
        ×
      </ControlButton>
    </aside>,
    document.body
  );
}
