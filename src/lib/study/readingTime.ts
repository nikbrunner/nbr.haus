const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "").replace(/```[\s\S]*?```/g, "");
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}
