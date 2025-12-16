import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { i18nStore } from "@/i18n";
import * as store from "./store";
import { PickerCell, ColorDot, RotatedText } from "./PickerCell";
import "./ControlPanelStrip.css";

const LOCALE_LABELS = {
  en: "EN",
  de: "DE"
} as const;

/**
 * ControlPanelStrip - The collapsed vertical strip on the right edge.
 * Shows current state indicators for navigation, locale, and style.
 * Clicking toggles the expanded panel.
 */
export default function ControlPanelStrip() {
  const isExpanded = store.useSelector(s => s.isExpanded);
  const hue = store.useSelector(s => s.hue);
  const contrast = store.useSelector(s => s.contrast);
  const colorMode = store.useSelector(s => s.colorMode);
  const locale = useStore(i18nStore, s => s.locale);

  // For now, just "/" - will be dynamic when we add more routes
  const currentPath = "/";
  const isLongPath = currentPath.length > 3;

  return (
    <div
      className={cx("ControlPanelStrip", isExpanded && "ControlPanelStrip--open")}
      role="button"
      tabIndex={0}
      aria-label="Toggle control panel"
      aria-expanded={isExpanded}
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
        <PickerCell>
          {isLongPath ? <RotatedText>{currentPath}</RotatedText> : currentPath}
        </PickerCell>
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
