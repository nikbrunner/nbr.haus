import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import AccentPickerOption from "./AccentPickerOption";
import ColorModePickerOption from "./ColorModePickerOption";
import ContrastPickerOption from "./ContrastPickerOption";
import * as store from "./store";
import "./StyleStatus.css";

/**
 * StyleStatus - Fixed indicator showing current style settings.
 * Clicking opens the StylePickers panel.
 */
export default function StyleStatus() {
  const hue = useStore(store.styleStore, s => s.hue);
  const contrast = useStore(store.styleStore, s => s.contrast);
  const colorMode = useStore(store.styleStore, s => s.colorMode);
  const isOpen = useStore(store.styleStore, s => s.isExpanded);

  return (
    <div
      className={cx("StyleStatus", isOpen && "StyleStatus--open")}
      role="button"
      tabIndex={0}
      aria-label="Open style picker"
      aria-expanded={isOpen}
      onClick={store.toggleExpanded}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          store.toggleExpanded();
        }
      }}
    >
      <div className="StyleStatus__indicator">
        <AccentPickerOption
          color={`oklch(45% 0.35 ${store.getAccentHue(hue)})`}
          onClick={() => {}}
        />
      </div>
      <div className="StyleStatus__indicator">
        <ContrastPickerOption
          label={store.CONTRAST_LABELS[contrast]}
          onClick={() => {}}
        />
      </div>
      <div className="StyleStatus__indicator">
        <ColorModePickerOption
          label={store.COLOR_MODE_LABELS[colorMode]}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
