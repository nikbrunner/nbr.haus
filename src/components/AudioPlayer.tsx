import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import ControlButton from "@/components/ControlButton";
import ControlGroup from "@/components/ControlGroup";

/** Character cells in the text track */
const TRACK_CELLS = 24;
const VOICE_KEY = "audio-voice";

interface Voice {
  id: string;
  label: string;
  src: string;
}

interface Props {
  /** The first voice is the default; a choice is remembered across pages */
  voices: Voice[];
}

export default function AudioPlayer({ voices }: Props) {
  const audio = useRef<HTMLAudioElement>(null);
  const [chosenVoiceId, setChosenVoiceId] = useState<string | null>(null);
  const rememberedVoiceId = useSyncExternalStore(
    subscribeToStorage,
    () => readStorage(VOICE_KEY),
    () => null
  );
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const voice =
    voices.find(({ id }) => id === (chosenVoiceId ?? rememberedVoiceId)) ??
    voices[0];
  const storageKey = `audio-position:${voice.src}`;

  function selectVoice(id: string) {
    writeStorage(VOICE_KEY, id);
    setChosenVoiceId(id);
  }

  function toggle() {
    if (playing) audio.current?.pause();
    else void audio.current?.play();
  }

  function seek(seconds: number) {
    if (!audio.current) return;
    audio.current.currentTime = seconds;
    savePosition(audio.current);
  }

  function restorePosition(element: HTMLAudioElement) {
    setDuration(element.duration);
    const saved = Number(readStorage(storageKey));
    if (saved > 0 && saved < element.duration - 1) element.currentTime = saved;
    setTime(element.currentTime);
  }

  /** A new source (another voice) empties the element; start from a clean state */
  function reset() {
    setPlaying(false);
    setTime(0);
    setDuration(0);
  }

  function savePosition(element: HTMLAudioElement) {
    setTime(element.currentTime);
    // A source change reports time 0 before the new metadata loads; that is not a position
    if (element.readyState < HTMLMediaElement.HAVE_METADATA) return;
    writeStorage(storageKey, element.ended ? null : String(element.currentTime));
  }

  // The server-rendered element can load its metadata before hydration attaches onLoadedMetadata
  useEffect(function restoreMetadataLoadedBeforeHydration() {
    const element = audio.current;
    if (element && element.readyState >= HTMLMediaElement.HAVE_METADATA) {
      restorePosition(element);
    }
    // Runs once on mount; later loads go through onLoadedMetadata
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const played = duration > 0 ? Math.round((time / duration) * TRACK_CELLS) : 0;

  return (
    <span className="AudioPlayer">
      {/* Both labels are five monospace cells wide, so toggling never moves the track */}
      <ControlButton onClick={toggle}>{playing ? "Pause" : "Play "}</ControlButton>
      <span className="AudioPlayer__track">
        <span aria-hidden="true">
          <span className="AudioPlayer__played">{"-".repeat(played)}</span>
          <span className="AudioPlayer__rest">
            {"·".repeat(TRACK_CELLS - played)}
          </span>
        </span>
        <input
          className="AudioPlayer__progress"
          type="range"
          aria-label="Position"
          min={0}
          max={duration || 0}
          step={1}
          value={time}
          onChange={event => seek(Number(event.currentTarget.value))}
        />
      </span>
      <span className="AudioPlayer__time">
        {formatTime(time)} / {formatTime(duration)}
      </span>
      {voices.length > 1 && (
        <ControlGroup label="Voice">
          {voices.map(option => (
            <ControlButton
              key={option.id}
              pressed={option.id === voice.id}
              onClick={() => selectVoice(option.id)}
            >
              {option.label}
            </ControlButton>
          ))}
        </ControlGroup>
      )}
      <audio
        ref={audio}
        src={voice.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEmptied={reset}
        onLoadedMetadata={event => restorePosition(event.currentTarget)}
        onTimeUpdate={event => savePosition(event.currentTarget)}
        onEnded={event => savePosition(event.currentTarget)}
      />
    </span>
  );
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "00:00";

  const whole = Math.floor(seconds);
  const minutes = String(Math.floor(whole / 60)).padStart(2, "0");
  return `${minutes}:${String(whole % 60).padStart(2, "0")}`;
}

function subscribeToStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

/** Storage can be unavailable (private mode, blocked site data); the player works without it */
function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Not persisting the position is acceptable
  }
}
