import { useEffect } from "react";

import ControlButton from "@/components/ControlButton";
import ControlGroup from "@/components/ControlGroup";
import { useAudio } from "@/hooks/useAudio";
import {
  loadTrack,
  seek,
  selectVoice,
  type AudioTrack,
  toggleTrack
} from "@/lib/audio";
import { formatTime } from "@/lib/formatTime";

interface Props {
  track: AudioTrack;
}

/** The full player on a study page; playback itself lives in the site-wide audio store */
export default function AudioPlayer({ track }: Props) {
  const audio = useAudio();
  const active = audio.track?.slug === track.slug;
  const playing = active && audio.playing;
  const time = active ? audio.time : 0;
  const duration = active ? audio.duration : 0;
  const voiceId = active ? audio.voiceId : track.voices[0].id;

  useEffect(
    function loadThisTrack() {
      loadTrack(track);
    },
    // The track's identity is its slug; voices are rebuilt on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [track.slug]
  );

  const played = duration > 0 ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <span className="AudioPlayer">
      {/* Both labels are five monospace cells wide, so toggling never moves the track */}
      <ControlButton onClick={() => toggleTrack(track)}>
        {playing ? "Pause" : "Play "}
      </ControlButton>
      <span className="AudioPlayer__track">
        <span
          className="AudioPlayer__fill"
          aria-hidden="true"
          style={{ width: `${played}%` }}
        />
        <input
          className="AudioPlayer__progress"
          type="range"
          aria-label="Position"
          min={0}
          max={duration || 0}
          step={1}
          value={time}
          disabled={!active}
          onChange={event => seek(Number(event.currentTarget.value))}
        />
      </span>
      <span className="AudioPlayer__time">
        {formatTime(time)} / {formatTime(duration)}
      </span>
      {track.voices.length > 1 && (
        <ControlGroup label="Voice">
          {track.voices.map(option => (
            <ControlButton
              key={option.id}
              pressed={option.id === voiceId}
              onClick={() => selectVoice(option.id)}
            >
              {option.label}
            </ControlButton>
          ))}
        </ControlGroup>
      )}
    </span>
  );
}
