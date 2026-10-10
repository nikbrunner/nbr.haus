import { useEffect, useRef } from "react";

import { useHotkey, useHotkeys } from "@tanstack/react-hotkeys";
import { Link, type LinkOptions } from "@tanstack/react-router";

import ControlButton from "@/components/ControlButton";
import ControlGroup from "@/components/ControlGroup";
import ProgressTrack from "@/components/ProgressTrack";
import { useAudio } from "@/hooks/useAudio";
import {
  type AudioTrack,
  loadTrack,
  rememberedVoiceId,
  seek,
  selectVoice,
  setExpanded,
  skip,
  toggle,
  toggleTrack
} from "@/lib/audio";
import { formatTime } from "@/lib/formatTime";

const SKIP_SECONDS = 10;

export interface PlaylistEntry {
  track: AudioTrack;
  /** Where the title links: the page the text belongs to */
  link: LinkOptions;
  /** Shown under the title; the last item also stands beside it in the list */
  meta: string[];
}

interface Props {
  playlist: PlaylistEntry[];
}

/**
 * The site's audio player, floating bottom right on every page: a Listen tab while nothing has
 * started, a one-line bar while a track plays, and a panel with every control and the playlist.
 * Owns Space, `,` `.` and `p`, so they are registered once for the whole site.
 */
export default function MediaPlayer({ playlist }: Props) {
  const audio = useAudio();
  const ref = useRef<HTMLElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const { expanded } = audio;

  const current =
    playlist.find(entry => entry.track.id === audio.track?.id) ?? playlist[0];
  const active = audio.track !== null && audio.track.id === current?.track.id;
  const started = active && (audio.playing || audio.time > 0);
  const time = active ? audio.time : 0;
  const duration = active ? audio.duration : 0;
  const voiceId =
    audio.voiceId ?? rememberedVoiceId() ?? current?.track.voices[0].id;

  useHotkey("Space", toggle, {
    enabled: started || (expanded && active),
    conflictBehavior: "allow"
  });
  useHotkeys(
    [
      { hotkey: ",", callback: () => skip(-SKIP_SECONDS) },
      { hotkey: ".", callback: () => skip(SKIP_SECONDS) }
    ],
    { enabled: started }
  );
  useHotkey("P", () => setExpanded(!expanded), { enabled: playlist.length > 0 });

  useEffect(
    function loadWhenOpened() {
      if (expanded && current) loadTrack(current.track);
    },
    [expanded, current]
  );

  useEffect(
    function closeOnEscapeOrOutside() {
      if (!expanded) return;
      playRef.current?.focus();

      function handleKey(event: KeyboardEvent) {
        if (event.key === "Escape") setExpanded(false);
      }
      function handlePointer(event: PointerEvent) {
        if (!ref.current?.contains(event.target as Node)) setExpanded(false);
      }

      // Capture phase: the site's own Escape binding stops the event before it bubbles here
      window.addEventListener("keydown", handleKey, true);
      document.addEventListener("pointerdown", handlePointer);
      return () => {
        window.removeEventListener("keydown", handleKey, true);
        document.removeEventListener("pointerdown", handlePointer);
      };
    },
    [expanded]
  );

  if (!current) return null;

  /** A tap on the bar outside its buttons and link opens the panel */
  function handleBarClick(event: React.MouseEvent) {
    if ((event.target as Element).closest("a, button")) return;
    setExpanded(true);
  }

  const playLabel = active && audio.playing ? "Pause" : "Play ";

  if (expanded) {
    return (
      <aside
        className="MediaPlayer MediaPlayer--expanded"
        aria-label="Audio player"
        ref={ref}
      >
        <div className="MediaPlayer__head">
          <Link className="MediaPlayer__title" {...current.link}>
            {current.track.title}
          </Link>
          <ControlButton
            aria-label="Collapse player"
            onClick={() => setExpanded(false)}
          >
            –
          </ControlButton>
        </div>
        <span className="MediaPlayer__meta">{current.meta.join(" · ")}</span>

        <div className="MediaPlayer__position">
          <ProgressTrack
            time={time}
            duration={duration}
            disabled={!active}
            onSeek={seek}
          />
          <span className="MediaPlayer__times">
            <span>{formatTime(time)}</span>
            <span>{formatTime(duration)}</span>
          </span>
        </div>

        <div className="MediaPlayer__transport" role="group" aria-label="Playback">
          <ControlButton
            aria-label={`Back ${SKIP_SECONDS} seconds`}
            disabled={!active}
            onClick={() => skip(-SKIP_SECONDS)}
          >
            −{SKIP_SECONDS}
          </ControlButton>
          {/* Both labels are five monospace cells wide, so toggling never moves the row */}
          <ControlButton ref={playRef} onClick={() => toggleTrack(current.track)}>
            {playLabel}
          </ControlButton>
          <ControlButton
            aria-label={`Forward ${SKIP_SECONDS} seconds`}
            disabled={!active}
            onClick={() => skip(SKIP_SECONDS)}
          >
            +{SKIP_SECONDS}
          </ControlButton>
        </div>

        {current.track.voices.length > 1 && (
          <ControlGroup label="Voice">
            {current.track.voices.map(voice => (
              <ControlButton
                key={voice.id}
                pressed={voice.id === voiceId}
                onClick={() => selectVoice(voice.id)}
              >
                {voice.label}
              </ControlButton>
            ))}
          </ControlGroup>
        )}

        <ol className="MediaPlayer__list" aria-label="Playlist">
          {playlist.map(entry => {
            const isCurrent = entry === current;
            return (
              <li key={entry.track.id} className="MediaPlayer__item">
                {/* Both labels are five monospace cells wide, so toggling never moves the row */}
                <ControlButton
                  pressed={isCurrent}
                  aria-current={isCurrent ? "true" : undefined}
                  aria-label={`${isCurrent && audio.playing ? "Pause" : "Play"} ${entry.track.title}`}
                  onClick={() => toggleTrack(entry.track)}
                >
                  {isCurrent && audio.playing ? "Pause" : "Play "}
                </ControlButton>
                <Link className="MediaPlayer__entry" {...entry.link}>
                  {entry.track.title}
                </Link>
                <span className="MediaPlayer__aside">{entry.meta.at(-1)}</span>
              </li>
            );
          })}
        </ol>
      </aside>
    );
  }

  if (!started) {
    return (
      <aside className="MediaPlayer" aria-label="Audio player" ref={ref}>
        <ControlButton aria-expanded={false} onClick={() => setExpanded(true)}>
          Listen
        </ControlButton>
      </aside>
    );
  }

  return (
    <aside className="MediaPlayer" aria-label="Audio player" ref={ref}>
      <div className="MediaPlayer__bar" onClick={handleBarClick}>
        <ControlButton onClick={toggle}>{playLabel}</ControlButton>
        <Link className="MediaPlayer__title" {...current.link}>
          {current.track.title}
        </Link>
        <span className="MediaPlayer__time">
          {formatTime(time)} / {formatTime(duration)}
        </span>
        <ControlButton aria-label="Expand player" onClick={() => setExpanded(true)}>
          +
        </ControlButton>
      </div>
      <span
        className="MediaPlayer__rule"
        aria-hidden="true"
        style={{ width: `${duration > 0 ? (time / duration) * 100 : 0}%` }}
      />
    </aside>
  );
}
