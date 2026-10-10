/**
 * One audio element for the whole site, outside React, so playback survives page changes.
 * The study page's player and the floating mini player both read and steer it.
 */

export interface AudioVoice {
  id: string;
  label: string;
  src: string;
}

export interface AudioTrack {
  slug: string;
  title: string;
  /** The first voice is the default */
  voices: AudioVoice[];
}

export interface AudioState {
  track: AudioTrack | null;
  voiceId: string | null;
  playing: boolean;
  time: number;
  duration: number;
}

const VOICE_KEY = "audio-voice";
/** How far back a voice switch resumes, so the new voice picks up the sentence */
const VOICE_SWITCH_REWIND = 5;

const IDLE: AudioState = {
  track: null,
  voiceId: null,
  playing: false,
  time: 0,
  duration: 0
};

let state = IDLE;
let element: HTMLAudioElement | null = null;
/** The source as the page wrote it; the element only reports it as an absolute URL */
let source = "";
/** Where to start once the current source's metadata has loaded */
let pendingStart: { time: number; play: boolean } | null = null;
const listeners = new Set<() => void>();

export function subscribeToAudio(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getAudioState(): AudioState {
  return state;
}

export function getIdleAudioState(): AudioState {
  return IDLE;
}

/** Makes a track the current one without playing it; leaves a playing track alone */
export function loadTrack(track: AudioTrack) {
  if (state.track?.slug === track.slug || state.playing) return;
  const voice = rememberedVoice(track);
  setSource(track, voice, { time: savedPosition(voice.src), play: false });
}

export function toggleTrack(track: AudioTrack) {
  if (state.track?.slug !== track.slug) {
    const voice = rememberedVoice(track);
    setSource(track, voice, { time: savedPosition(voice.src), play: true });
    return;
  }
  toggle();
}

export function toggle() {
  const audio = getElement();
  if (!state.track) return;
  if (audio.paused) void audio.play();
  else audio.pause();
}

export function seek(seconds: number) {
  const audio = getElement();
  audio.currentTime = seconds;
  update({ time: seconds });
  savePosition(audio);
}

/** Switches voice and resumes a few seconds before the current position */
export function selectVoice(id: string) {
  writeStorage(VOICE_KEY, id);
  const track = state.track;
  if (!track || id === state.voiceId) return;
  const voice = track.voices.find(option => option.id === id);
  if (!voice) return;

  const time = Math.max(0, state.time - VOICE_SWITCH_REWIND);
  setSource(track, voice, { time, play: state.playing });
}

export function stop() {
  element?.pause();
  element?.removeAttribute("src");
  element?.load();
  pendingStart = null;
  state = IDLE;
  emit();
}

function rememberedVoice(track: AudioTrack): AudioVoice {
  const remembered = readStorage(VOICE_KEY);
  return track.voices.find(({ id }) => id === remembered) ?? track.voices[0];
}

function setSource(
  track: AudioTrack,
  voice: AudioVoice,
  start: { time: number; play: boolean }
) {
  const audio = getElement();
  pendingStart = start;
  source = voice.src;
  audio.src = voice.src;
  audio.load();
  state = {
    track,
    voiceId: voice.id,
    playing: false,
    time: start.time,
    duration: 0
  };
  emit();
}

function getElement(): HTMLAudioElement {
  if (element) return element;

  const audio = new Audio();
  audio.preload = "metadata";
  audio.addEventListener("play", () => update({ playing: true }));
  audio.addEventListener("pause", () => update({ playing: false }));
  audio.addEventListener("timeupdate", () => {
    // Before the new source's metadata loads, the element reports 0; that is not a position
    if (pendingStart || audio.readyState < HTMLMediaElement.HAVE_METADATA) return;
    update({ time: audio.currentTime });
    savePosition(audio);
  });
  audio.addEventListener("ended", () => savePosition(audio));
  audio.addEventListener("loadedmetadata", () => {
    const start = pendingStart;
    pendingStart = null;
    if (start && start.time < audio.duration - 1) audio.currentTime = start.time;
    update({ duration: audio.duration, time: audio.currentTime });
    if (start?.play) void audio.play();
  });

  element = audio;
  return audio;
}

function update(patch: Partial<AudioState>) {
  state = { ...state, ...patch };
  emit();
}

function emit() {
  listeners.forEach(listener => listener());
}

function savedPosition(src: string): number {
  return Number(readStorage(`audio-position:${src}`)) || 0;
}

function savePosition(audio: HTMLAudioElement) {
  writeStorage(
    `audio-position:${source}`,
    audio.ended ? null : String(audio.currentTime)
  );
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
    // Not persisting is acceptable
  }
}
