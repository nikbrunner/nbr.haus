import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { i18nStore } from "@/i18n";
import {
  controlPanelStore,
  toggleExpanded,
  getAccentHue,
  CONTRAST_LABELS,
  COLOR_MODE_LABELS
} from "./store";
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
  const isExpanded = useStore(controlPanelStore, s => s.isExpanded);
  const hue = useStore(controlPanelStore, s => s.hue);
  const contrast = useStore(controlPanelStore, s => s.contrast);
  const colorMode = useStore(controlPanelStore, s => s.colorMode);
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
      onClick={toggleExpanded}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleExpanded();
        }
      }}
    >
      {/* Navigation Module */}
      <div className="ControlPanelStrip__module">
        <span
          className={cx(
            "ControlPanelStrip__nav-indicator",
            isLongPath && "ControlPanelStrip__nav-indicator--rotated"
          )}
        >
          {currentPath}
        </span>
      </div>

      {/* Locale Module */}
      <div className="ControlPanelStrip__module">
        <span className="ControlPanelStrip__locale-indicator">
          {LOCALE_LABELS[locale]}
        </span>
      </div>

      {/* Style Module */}
      <div className="ControlPanelStrip__module ControlPanelStrip__module--style">
        <div
          className="ControlPanelStrip__accent-dot"
          style={{ backgroundColor: `oklch(45% 0.35 ${getAccentHue(hue)})` }}
        />
        <span className="ControlPanelStrip__style-indicator">
          {CONTRAST_LABELS[contrast]}
        </span>
        <span className="ControlPanelStrip__style-indicator">
          {COLOR_MODE_LABELS[colorMode]}
        </span>
      </div>
    </div>
  );
}
