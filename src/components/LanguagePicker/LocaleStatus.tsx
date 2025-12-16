import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { i18nStore, toggleExpanded } from "@/i18n";
import type { Locale } from "@/i18n";
import "./LocaleStatus.css";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE"
};

/**
 * LocaleStatus - Fixed indicator showing current locale.
 * Clicking opens the LocalePicker panel.
 */
export default function LocaleStatus() {
  const locale = useStore(i18nStore, s => s.locale);
  const isOpen = useStore(i18nStore, s => s.isExpanded);

  return (
    <div
      className={cx("LocaleStatus", isOpen && "LocaleStatus--open")}
      role="button"
      tabIndex={0}
      aria-label="Open language picker"
      aria-expanded={isOpen}
      onClick={toggleExpanded}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleExpanded();
        }
      }}
    >
      <div className="LocaleStatus__indicator">
        {LOCALE_LABELS[locale]}
      </div>
    </div>
  );
}
