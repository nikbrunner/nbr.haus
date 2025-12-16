import { useRouter, useSearch } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { useCallback, useEffect } from "react";
import {
  i18nStore,
  setLocale,
  setExpanded,
  initializeLocale,
  LOCALES
} from "@/i18n";
import type { Locale } from "@/i18n";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import "./LocalePicker.css";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE"
};

interface LocaleOptionProps {
  label: string;
  variant?: "default" | "active";
  onClick: () => void;
  ariaLabel?: string;
}

function LocaleOption({
  label,
  variant = "default",
  onClick,
  ariaLabel
}: LocaleOptionProps) {
  return (
    <button
      className={cx("LocaleOption", variant === "active" && "LocaleOption--active")}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={variant === "active"}
    >
      {label}
    </button>
  );
}

/**
 * LocalePicker - Options panel that slides up from the bottom.
 * Always rendered, uses CSS transform for show/hide animation.
 */
export default function LocalePicker() {
  const router = useRouter();
  const search = useSearch({ from: "/" });

  const isOpen = useStore(i18nStore, s => s.isExpanded);
  const locale = useStore(i18nStore, s => s.locale);

  const closePanel = useCallback(() => setExpanded(false), []);
  useOnClickOutside([".LocalePicker", ".LocaleStatus"], closePanel, isOpen);

  // Initialize from URL params or localStorage on mount
  useEffect(() => {
    initializeLocale(search.lang as Locale | undefined);
  }, [search.lang]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
      className={cx("LocalePicker", isOpen && "LocalePicker--open")}
      aria-hidden={!isOpen}
    >
      <div className="LocalePicker__row">
        <span className="LocalePicker__label">Lang</span>
        {LOCALES.map(loc => (
          <div key={loc} className="LocalePicker__option">
            <LocaleOption
              label={LOCALE_LABELS[loc]}
              variant={locale === loc ? "active" : "default"}
              onClick={() => handleSelectLocale(loc)}
              ariaLabel={`Select ${loc === "en" ? "English" : "German"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
