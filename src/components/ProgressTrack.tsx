interface Props {
  time: number;
  duration: number;
  disabled?: boolean;
  onSeek: (seconds: number) => void;
}

/** The playback position as a hatched field the accent writes over; an invisible range input on top takes pointer and keys */
export default function ProgressTrack({ time, duration, disabled, onSeek }: Props) {
  const played = duration > 0 ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <span className="ProgressTrack">
      <span
        className="ProgressTrack__fill"
        aria-hidden="true"
        style={{ width: `${played}%` }}
      />
      <input
        className="ProgressTrack__input"
        type="range"
        aria-label="Position"
        min={0}
        max={duration || 0}
        step={1}
        value={time}
        disabled={disabled}
        onChange={event => onSeek(Number(event.currentTarget.value))}
      />
    </span>
  );
}
