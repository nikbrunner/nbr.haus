import { useSyncExternalStore } from "react";

import { getAudioState, getIdleAudioState, subscribeToAudio } from "@/lib/audio";

export function useAudio() {
  return useSyncExternalStore(subscribeToAudio, getAudioState, getIdleAudioState);
}
