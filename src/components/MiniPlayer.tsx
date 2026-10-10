import { useHotkey } from "@tanstack/react-hotkeys";

import ControlButton from "@/components/ControlButton";
import { useAudio } from "@/hooks/useAudio";
import { type AudioTrack, loadTrack, setExpanded, toggleTrack } from "@/lib/audio";
import { formatTime } from "@/lib/formatTime";

/** Links to the inline player scroll here */
export const AUDIO_PLAYER_ID = "listen";

interface Props {
  track: AudioTrack;
}

/** The inline player on a page with narration: it starts the page's track in the media player and opens it */
export default function MiniPlayer({ track }: Props) {
  const audio = useAudio();
  const active = audio.track?.id === track.id;
  const playing = active && audio.playing;
  const started = audio.track !== null && (audio.playing || audio.time > 0);

  // Until something has started, Space on this page plays the page's track
  useHotkey("Space", () => toggleTrack(track), {
    enabled: !started && !audio.expanded,
    // The media player owns Space once something has started; the two are never enabled together
    conflictBehavior: "allow"
  });

  return (
    <span className="MiniPlayer" id={AUDIO_PLAYER_ID}>
      {/* Both labels are five monospace cells wide, so toggling never moves the row */}
      <ControlButton onClick={() => toggleTrack(track)}>
        {playing ? "Pause" : "Play "}
      </ControlButton>
      {active && audio.duration > 0 && (
        <span className="MiniPlayer__time">
          {formatTime(audio.time)} / {formatTime(audio.duration)}
        </span>
      )}
      <ControlButton
        onClick={() => {
          loadTrack(track);
          setExpanded(true);
        }}
      >
        Open player
      </ControlButton>
    </span>
  );
}
