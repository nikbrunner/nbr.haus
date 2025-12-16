import { useRouter } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { i18nStore, setLocale, LOCALES, type Locale } from "@/i18n";
import type { ColorMode, Contrast } from "@/validators/rootSearchParams";
import * as store from "./store";
import { PickerCell, ColorDot } from "./PickerCell";
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

/**
 * ControlPanelExpanded - The expanded options panel.
 * Slides in from the right using translateX for 60fps animation.
 */
export default function ControlPanelExpanded() {
  const router = useRouter();

  const isOpen = store.useSelector(s => s.isExpanded);
  const hue = store.useSelector(s => s.hue);
  const contrast = store.useSelector(s => s.contrast);
  const colorMode = store.useSelector(s => s.colorMode);
  const locale = useStore(i18nStore, s => s.locale);

  // For now, just "/" - will be dynamic when we add more routes
  const navLinks = ["/"] as const;

  const handleSelectHue = (newHue: number) => {
    store.setHue(newHue);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, hue: newHue }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectContrast = (newContrast: Contrast) => {
    store.setContrast(newContrast);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, contrast: newContrast }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectColorMode = (newColorMode: ColorMode) => {
    store.setColorMode(newColorMode);
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
    store.setExpanded(false);
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
            <PickerCell
              key={path}
              isActive={true}
              onClick={() => {
                // Navigation will be implemented when we add more routes
              }}
              ariaLabel={`Navigate to ${path}`}
            >
              {path}
            </PickerCell>
          ))}
        </PickerRow>
      </div>

      {/* Locale Section */}
      <div className="ControlPanelExpanded__section">
        <PickerRow label="Lang">
          {LOCALES.map(loc => (
            <PickerCell
              key={loc}
              isActive={locale === loc}
              onClick={() => handleSelectLocale(loc)}
              ariaLabel={`Select ${loc === "en" ? "English" : "German"}`}
            >
              {LOCALE_LABELS[loc]}
            </PickerCell>
          ))}
        </PickerRow>
      </div>

      {/* Style Section */}
      <div className="ControlPanelExpanded__section">
        <PickerRow label="Accent">
          {store.PRESET_HUES.map(presetHue => (
            <PickerCell
              key={presetHue}
              isActive={hue === presetHue}
              onClick={() => handleSelectHue(presetHue)}
              ariaLabel={`Select accent hue ${presetHue}`}
            >
              <ColorDot hue={store.getAccentHue(presetHue)} />
            </PickerCell>
          ))}
        </PickerRow>

        <PickerRow label="Contrast">
          {store.CONTRAST_OPTIONS.map(opt => (
            <PickerCell
              key={opt.value}
              isActive={contrast === opt.value}
              onClick={() => handleSelectContrast(opt.value)}
              ariaLabel={`Select ${opt.value} contrast`}
            >
              {opt.label}
            </PickerCell>
          ))}
        </PickerRow>

        <PickerRow label="Mode">
          {store.COLOR_MODE_OPTIONS.map(opt => (
            <PickerCell
              key={opt.value}
              isActive={colorMode === opt.value}
              onClick={() => handleSelectColorMode(opt.value)}
              ariaLabel={`Select ${opt.value} color mode`}
            >
              {opt.label}
            </PickerCell>
          ))}
        </PickerRow>
      </div>
    </div>
  );
}
