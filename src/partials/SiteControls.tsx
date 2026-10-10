import ControlBar from "@/components/ControlBar";
import ControlButton from "@/components/ControlButton";
import ControlGroup from "@/components/ControlGroup";
import KeyHints from "@/components/KeyHints";
import MiniPlayer from "@/components/MiniPlayer";
import NavCursor from "@/components/NavCursor";
import { useAccent } from "@/hooks/useAccent";
import { useColorMode } from "@/hooks/useColorMode";
import { useSiteHotkeys } from "@/hooks/useSiteHotkeys";
import type { ColorMode } from "@/types/style";

const COLOR_MODES: { value: ColorMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "system", label: "Sys" },
  { value: "dark", label: "Dark" }
];

export function SiteControls() {
  const { accent, accents, setAccent } = useAccent();
  const { colorMode, setColorMode } = useColorMode();
  const { groups, toggleOverview } = useSiteHotkeys();

  return (
    <ControlBar>
      <ControlGroup label="Accent">
        {Object.entries(accents).map(([name, hue]) => (
          <ControlButton
            key={name}
            title={name}
            aria-label={`Accent ${name}`}
            pressed={hue === accent}
            onClick={() => setAccent(hue)}
          >
            {name.charAt(0)}
          </ControlButton>
        ))}
      </ControlGroup>
      <ControlGroup label="Mode">
        {COLOR_MODES.map(mode => (
          <ControlButton
            key={mode.value}
            pressed={mode.value === colorMode}
            onClick={() => setColorMode(mode.value)}
          >
            {mode.label}
          </ControlButton>
        ))}
      </ControlGroup>
      <ControlGroup label="Keys">
        <ControlButton
          aria-label="Keyboard shortcuts"
          pressed={groups !== null}
          onClick={toggleOverview}
        >
          ?
        </ControlButton>
      </ControlGroup>
      {groups && <KeyHints groups={groups} />}
      <NavCursor />
      <MiniPlayer />
    </ControlBar>
  );
}
