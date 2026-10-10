/** Seconds as `mm:ss` */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "00:00";

  const whole = Math.floor(seconds);
  const minutes = String(Math.floor(whole / 60)).padStart(2, "0");
  return `${minutes}:${String(whole % 60).padStart(2, "0")}`;
}
