import { useRouter } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { i18nStore, setLocale, LOCALES, type Locale } from "@/i18n";
import type { ColorMode, Contrast } from "@/validators/rootSearchParams";
import {
  controlPanelStore,
  setExpanded,
  setHue,
  setContrast,
  setColorMode,
  getAccentHue,
  PRESET_HUES,
  CONTRAST_OPTIONS,
  COLOR_MODE_OPTIONS
} from "./store";
import "./ControlPanelExpanded.css";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE"
};

interface PickerRowProps {
  label: string;
  children: React.ReactNode;
}

function PickerRow({ label, children }: PickerRowProps) {
  return (
    <div className="ControlPanelExpanded__row">
      <span className="ControlPanelExpanded__label">{label}</span>
      <div className="ControlPanelExpanded__options">{children}</div>
    </div>
  );
}

interface OptionButtonProps {
  isActive?: boolean;
  onClick: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
}

function OptionButton({
  isActive,
  onClick,
  ariaLabel,
  children
}: OptionButtonProps) {
  return (
    <button
      className={cx(
        "ControlPanelExpanded__option",
        isActive && "ControlPanelExpanded__option--active"
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      type="button"
    >
      {children}
    </button>
  );
}

/**
 * ControlPanelExpanded - The expanded options panel.
 * Slides in from the right using translateX for 60fps animation.
 */
export default function ControlPanelExpanded() {
  const router = useRouter();

  const isOpen = useStore(controlPanelStore, s => s.isExpanded);
  const hue = useStore(controlPanelStore, s => s.hue);
  const contrast = useStore(controlPanelStore, s => s.contrast);
  const colorMode = useStore(controlPanelStore, s => s.colorMode);
  const locale = useStore(i18nStore, s => s.locale);

  // For now, just "/" - will be dynamic when we add more routes
  const navLinks = ["/"] as const;

  const handleSelectHue = (newHue: number) => {
    setHue(newHue);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, hue: newHue }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectContrast = (newContrast: Contrast) => {
    setContrast(newContrast);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, contrast: newContrast }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectColorMode = (newColorMode: ColorMode) => {
    setColorMode(newColorMode);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, colorMode: newColorMode }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    setLocale(newLocale);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, lang: newLocale }),
      resetScroll: false,
      replace: true
    });
    setExpanded(false);
  };

  return (
    <div
      className={cx("ControlPanelExpanded", isOpen && "ControlPanelExpanded--open")}
      aria-hidden={!isOpen}
    >
      {/* Navigation Section */}
      <div className="ControlPanelExpanded__section">
        <PickerRow label="Nav">
          {navLinks.map(path => (
            <OptionButton
              key={path}
              isActive={true} // Currently only "/" is active
              onClick={() => {
                // Navigation will be implemented when we add more routes
              }}
              ariaLabel={`Navigate to ${path}`}
            >
              {path}
            </OptionButton>
          ))}
        </PickerRow>
      </div>

      {/* Locale Section */}
      <div className="ControlPanelExpanded__section">
        <PickerRow label="Lang">
          {LOCALES.map(loc => (
            <OptionButton
              key={loc}
              isActive={locale === loc}
              onClick={() => handleSelectLocale(loc)}
              ariaLabel={`Select ${loc === "en" ? "English" : "German"}`}
            >
              {LOCALE_LABELS[loc]}
            </OptionButton>
          ))}
        </PickerRow>
      </div>

      {/* Style Section */}
      <div className="ControlPanelExpanded__section">
        <PickerRow label="Accent">
          {PRESET_HUES.map(presetHue => (
            <OptionButton
              key={presetHue}
              isActive={hue === presetHue}
              onClick={() => handleSelectHue(presetHue)}
              ariaLabel={`Select accent hue ${presetHue}`}
            >
              <span
                className="ControlPanelExpanded__color-dot"
                style={{
                  backgroundColor: `oklch(45% 0.35 ${getAccentHue(presetHue)})`
                }}
              />
            </OptionButton>
          ))}
        </PickerRow>

        <PickerRow label="Contrast">
          {CONTRAST_OPTIONS.map(opt => (
            <OptionButton
              key={opt.value}
              isActive={contrast === opt.value}
              onClick={() => handleSelectContrast(opt.value)}
              ariaLabel={`Select ${opt.value} contrast`}
            >
              {opt.label}
            </OptionButton>
          ))}
        </PickerRow>

        <PickerRow label="Mode">
          {COLOR_MODE_OPTIONS.map(opt => (
            <OptionButton
              key={opt.value}
              isActive={colorMode === opt.value}
              onClick={() => handleSelectColorMode(opt.value)}
              ariaLabel={`Select ${opt.value} color mode`}
            >
              {opt.label}
            </OptionButton>
          ))}
        </PickerRow>
      </div>
    </div>
  );
}
