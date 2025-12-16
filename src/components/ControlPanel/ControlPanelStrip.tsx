import { useStore } from "@tanstack/react-store";
import { i18nStore } from "@/i18n";
import * as store from "./store";
import { PickerCell, ColorDot } from "./PickerCell";
import "./ControlPanelStrip.css";

const LOCALE_LABELS = {
  en: "EN",
  de: "DE"
} as const;

/**
 * ControlPanelStrip - The vertical strip on the right side.
 * Shows current state indicators for navigation, locale, and style.
 * Always visible - clicking toggles the expanded panel.
 */
export default function ControlPanelStrip() {
  const hue = store.useSelector(s => s.hue);
  const contrast = store.useSelector(s => s.contrast);
  const colorMode = store.useSelector(s => s.colorMode);
  const locale = useStore(i18nStore, s => s.locale);

  // For now, just "/" - will be dynamic when we add more routes
  const currentPath = "/";

  return (
    <div
      className="ControlPanelStrip"
      role="button"
      tabIndex={0}
      aria-label="Toggle control panel"
      onClick={store.toggleExpanded}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          store.toggleExpanded();
        }
      }}
    >
      {/* Navigation Module */}
      <div className="ControlPanelStrip__module">
        <PickerCell>{currentPath}</PickerCell>
      </div>

      {/* Locale Module */}
      <div className="ControlPanelStrip__module">
        <PickerCell>{LOCALE_LABELS[locale]}</PickerCell>
      </div>

      {/* Style Module */}
      <div className="ControlPanelStrip__module ControlPanelStrip__module--style">
        <PickerCell>
          <ColorDot hue={store.getAccentHue(hue)} />
        </PickerCell>
        <PickerCell>{store.CONTRAST_LABELS[contrast]}</PickerCell>
        <PickerCell>{store.COLOR_MODE_LABELS[colorMode]}</PickerCell>
      </div>
    </div>
  );
}
