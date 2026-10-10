import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  getAudioState,
  loadTrack,
  seek,
  selectVoice,
  stop,
  toggle,
  toggleTrack,
  type AudioTrack
} from "@/lib/audio";

/** A silent mono WAV of the given length, as an object URL */
function silence(seconds: number): string {
  const rate = 8000;
  const samples = rate * seconds;
  const view = new DataView(new ArrayBuffer(44 + samples));
  const text = (offset: number, value: string) =>
    [...value].forEach((char, index) =>
      view.setUint8(offset + index, char.charCodeAt(0))
    );

  text(0, "RIFF");
  view.setUint32(4, 36 + samples, true);
  text(8, "WAVE");
  text(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  text(36, "data");
  view.setUint32(40, samples, true);
  for (let index = 0; index < samples; index++) view.setUint8(44 + index, 128);

  return URL.createObjectURL(new Blob([view], { type: "audio/wav" }));
}

const LENGTH = 30;
let study: AudioTrack;
let other: AudioTrack;

beforeEach(() => {
  localStorage.clear();
  study = {
    id: "study",
    title: "Study",
    voices: [
      { id: "nik", label: "Nik", src: silence(LENGTH) },
      { id: "second", label: "Second", src: silence(LENGTH) }
    ]
  };
  other = {
    id: "other",
    title: "Other",
    voices: [{ id: "nik", label: "Nik", src: silence(LENGTH) }]
  };
});

afterEach(() => {
  stop();
});

async function loaded() {
  await expect.poll(() => getAudioState().duration).toBeCloseTo(LENGTH, 0);
}

async function playing() {
  await expect.poll(() => getAudioState().playing).toBe(true);
}

describe("loadTrack", () => {
  it("loads the first voice, paused at the start", async () => {
    loadTrack(study);
    await loaded();

    expect(getAudioState()).toMatchObject({
      track: { id: "study" },
      voiceId: "nik",
      playing: false,
      time: 0
    });
  });

  it("loads the voice chosen before", async () => {
    localStorage.setItem("audio-voice", "second");

    loadTrack(study);

    expect(getAudioState().voiceId).toBe("second");
  });

  it("resumes where the file was left", async () => {
    localStorage.setItem(`audio-position:${study.voices[0].src}`, "12");

    loadTrack(study);
    await loaded();

    expect(getAudioState().time).toBeCloseTo(12, 0);
  });

  it("leaves a loaded track alone", async () => {
    toggleTrack(study);
    await playing();

    loadTrack(other);

    expect(getAudioState().track?.id).toBe("study");
  });
});

describe("playing", () => {
  it("toggles between playing and paused", async () => {
    toggleTrack(study);
    await playing();

    toggle();
    await expect.poll(() => getAudioState().playing).toBe(false);
  });

  it("switches to another track when it is played", async () => {
    toggleTrack(study);
    await playing();

    toggleTrack(other);

    await expect.poll(() => getAudioState().track?.id).toBe("other");
    await playing();
  });

  it("plays another track in the voice chosen before", async () => {
    other.voices.push({ id: "second", label: "Second", src: silence(LENGTH) });
    toggleTrack(study);
    await playing();
    selectVoice("second");

    toggleTrack(other);

    await expect.poll(() => getAudioState().track?.id).toBe("other");
    expect(getAudioState().voiceId).toBe("second");
  });

  it("remembers the position while playing", async () => {
    toggleTrack(study);
    await playing();
    seek(8);

    await expect
      .poll(() =>
        Number(localStorage.getItem(`audio-position:${study.voices[0].src}`))
      )
      .toBeGreaterThanOrEqual(8);
  });

  it("forgets the position once the file has ended", async () => {
    toggleTrack(study);
    await playing();
    seek(LENGTH - 0.5);

    await expect.poll(() => getAudioState().playing).toBe(false);
    expect(localStorage.getItem(`audio-position:${study.voices[0].src}`)).toBeNull();
  });
});

describe("selectVoice", () => {
  it("resumes five seconds earlier in the new voice and keeps playing", async () => {
    toggleTrack(study);
    await playing();
    seek(20);
    await expect.poll(() => getAudioState().time).toBeGreaterThanOrEqual(20);

    selectVoice("second");

    await expect.poll(() => getAudioState().voiceId).toBe("second");
    await playing();
    const time = getAudioState().time;
    expect(time).toBeGreaterThanOrEqual(15);
    expect(time).toBeLessThan(18);
  });

  it("stays paused when switching while paused", async () => {
    loadTrack(study);
    await loaded();
    seek(10);

    selectVoice("second");
    await loaded();

    expect(getAudioState()).toMatchObject({ voiceId: "second", playing: false });
    expect(getAudioState().time).toBeCloseTo(5, 0);
  });

  it("never goes before the start", async () => {
    loadTrack(study);
    await loaded();
    seek(2);

    selectVoice("second");
    await loaded();

    expect(getAudioState().time).toBe(0);
  });

  it("remembers the choice for the next track", async () => {
    loadTrack(study);
    selectVoice("second");

    expect(localStorage.getItem("audio-voice")).toBe("second");
  });
});

describe("stop", () => {
  it("returns to idle", async () => {
    toggleTrack(study);
    await playing();

    stop();

    expect(getAudioState()).toMatchObject({ track: null, playing: false, time: 0 });
  });
});
