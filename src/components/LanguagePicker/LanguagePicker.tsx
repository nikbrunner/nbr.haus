import { useRouter } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { i18nStore, setLocale, LOCALES } from "@/i18n";
import type { Locale } from "@/i18n";
import "./LanguagePicker.css";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE"
};

export default function LanguagePicker() {
  const router = useRouter();
  const locale = useStore(i18nStore, s => s.locale);

  const handleSelect = (newLocale: Locale) => {
    if (newLocale === locale) return;

    setLocale(newLocale);
    router.navigate({
      to: "/",
      search: prev => ({ ...prev, lang: newLocale }),
      resetScroll: false,
      replace: true
    });
  };

  return (
    <div className="LanguagePicker">
      {LOCALES.map(loc => (
        <button
          key={loc}
          className={cx(
            "LanguagePicker__option",
            locale === loc && "LanguagePicker__option--active"
          )}
          onClick={() => handleSelect(loc)}
          aria-label={`Switch to ${loc === "en" ? "English" : "German"}`}
          aria-pressed={locale === loc}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
