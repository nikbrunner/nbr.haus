import { useCallback, useEffect } from "react";

import { useRouter, useRouterState, useSearch } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cx } from "class-variance-authority";
import { motion } from "framer-motion";
import { Printer } from "lucide-react";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { i18nStore, initializeLocale, setLocale } from "@/i18n/store";
import { LOCALES, type Locale } from "@/i18n/types";
import type { ColorMode, Contrast } from "@/validators/rootSearchParams";

import { ControlPanelColorDot } from "./ControlPanelColorDot";
import { ControlPanelIndicator } from "./ControlPanelIndicator";
import { ControlPanelOption } from "./ControlPanelOption";
import { ControlPanelRow } from "./ControlPanelRow";
import { ControlPanelSection } from "./ControlPanelSection";
import * as store from "./store";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE"
};

/**
 * ControlPanel - Smart container for navigation, locale, and style settings.
 * Composes ControlPanelSection dumb components and handles all state/routing logic.
 */
export default function ControlPanel() {
  const search = useSearch({ strict: false });
  const router = useRouter();
  const pathname = useRouterState({ select: s => s.location.pathname });

  const isExpanded = store.useSelector(s => s.isExpanded);
  const hue = store.useSelector(s => s.hue);
  const contrast = store.useSelector(s => s.contrast);
  const colorMode = store.useSelector(s => s.colorMode);
  const locale = useStore(i18nStore, s => s.locale);

  const isOnCVPage = pathname === "/cv";

  const closePanel = useCallback(() => store.setExpanded(false), []);

  // Close on click outside
  useOnClickOutside([".ControlPanel"], closePanel, isExpanded);

  // Initialize from URL params or localStorage on mount
  useEffect(() => {
    store.initializeStyleFromParams({
      hue: search.hue,
      contrast: search.contrast,
      colorMode: search.colorMode
    });
    initializeLocale(search.lang as Locale | undefined);
  }, [search.hue, search.contrast, search.colorMode, search.lang]);

  // Close on Escape key
  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        store.setExpanded(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  // Get navigable routes from router
  const navLinks = Object.keys(router.routesByPath)
    .filter(path => !path.includes("$"))
    .sort((a, b) => a.localeCompare(b));

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleSelectHue = (newHue: number) => {
    store.setHue(newHue);
    router.navigate({
      to: ".",
      search: prev => ({ ...prev, hue: newHue }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectContrast = (newContrast: Contrast) => {
    store.setContrast(newContrast);
    router.navigate({
      to: ".",
      search: prev => ({ ...prev, contrast: newContrast }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectColorMode = (newColorMode: ColorMode) => {
    store.setColorMode(newColorMode);
    router.navigate({
      to: ".",
      search: prev => ({ ...prev, colorMode: newColorMode }),
      resetScroll: false,
      replace: true
    });
  };

  const handleSelectLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    setLocale(newLocale);
    router.navigate({
      to: ".",
      search: prev => ({ ...prev, lang: newLocale }),
      resetScroll: false,
      replace: true
    });
    store.setExpanded(false);
  };

  const handlePrintWithLocale = (printLocale: Locale) => {
    if (printLocale !== locale) {
      setLocale(printLocale);
      router.navigate({
        to: ".",
        search: prev => ({ ...prev, lang: printLocale }),
        resetScroll: false,
        replace: true
      });
    }

    store.setExpanded(false);

    // Delay to allow DOM to update with new translations
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className={cx("ControlPanel", isExpanded && "ControlPanel--expanded")}>
      <motion.div
        className="ControlPanel__content"
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
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={{
          collapsed: {
            clipPath: "inset(0 0 0 calc(100% - var(--control-panel-strip-width)))"
          },
          expanded: { clipPath: "inset(0 0 0 0)" }
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.15
        }}
      >
        {/* Navigation Section */}
        <ControlPanelSection
          indicator={<ControlPanelIndicator>{pathname}</ControlPanelIndicator>}
        >
          <ControlPanelRow label="Nav">
            {navLinks.map(navPath => (
              <ControlPanelOption
                key={navPath}
                isActive={pathname === navPath}
                onClick={() => {
                  router.navigate({ to: navPath });
                  store.setExpanded(false);
                }}
                ariaLabel={`Navigate to ${navPath}`}
              >
                {navPath}
              </ControlPanelOption>
            ))}
          </ControlPanelRow>
        </ControlPanelSection>

        {/* Locale Section */}
        <ControlPanelSection
          indicator={
            <ControlPanelIndicator>{LOCALE_LABELS[locale]}</ControlPanelIndicator>
          }
        >
          <ControlPanelRow label="Lang">
            {LOCALES.map(loc => (
              <ControlPanelOption
                key={loc}
                isActive={locale === loc}
                onClick={() => handleSelectLocale(loc)}
                ariaLabel={`Select ${loc === "en" ? "English" : "German"}`}
              >
                {LOCALE_LABELS[loc]}
              </ControlPanelOption>
            ))}
          </ControlPanelRow>
        </ControlPanelSection>

        {/* Style Section */}
        <ControlPanelSection
          indicator={
            <>
              <ControlPanelIndicator>
                <ControlPanelColorDot hue={store.getAccentHue(hue)} />
              </ControlPanelIndicator>
              <ControlPanelIndicator>
                {store.CONTRAST_LABELS[contrast]}
              </ControlPanelIndicator>
              <ControlPanelIndicator>
                {store.COLOR_MODE_LABELS[colorMode]}
              </ControlPanelIndicator>
            </>
          }
        >
          <ControlPanelRow label="Accent">
            {store.PRESET_HUES.map(presetHue => (
              <ControlPanelOption
                key={presetHue}
                isActive={hue === presetHue}
                onClick={() => handleSelectHue(presetHue)}
                ariaLabel={`Select accent hue ${presetHue}`}
              >
                <ControlPanelColorDot hue={store.getAccentHue(presetHue)} />
              </ControlPanelOption>
            ))}
          </ControlPanelRow>

          <ControlPanelRow label="Contrast">
            {store.CONTRAST_OPTIONS.map(opt => (
              <ControlPanelOption
                key={opt.value}
                isActive={contrast === opt.value}
                onClick={() => handleSelectContrast(opt.value)}
                ariaLabel={`Select ${opt.value} contrast`}
              >
                {opt.label}
              </ControlPanelOption>
            ))}
          </ControlPanelRow>

          <ControlPanelRow label="Mode">
            {store.COLOR_MODE_OPTIONS.map(opt => (
              <ControlPanelOption
                key={opt.value}
                isActive={colorMode === opt.value}
                onClick={() => handleSelectColorMode(opt.value)}
                ariaLabel={`Select ${opt.value} color mode`}
              >
                {opt.label}
              </ControlPanelOption>
            ))}
          </ControlPanelRow>
        </ControlPanelSection>

        {/* Print Section - only on CV page */}
        <ControlPanelSection
          indicator={
            <ControlPanelIndicator disabled={!isOnCVPage}>
              <Printer size={16} />
            </ControlPanelIndicator>
          }
        >
          {isOnCVPage && (
            <ControlPanelRow label="Print">
              {LOCALES.map(loc => (
                <ControlPanelOption
                  key={loc}
                  isActive={locale === loc}
                  onClick={() => handlePrintWithLocale(loc)}
                  ariaLabel={`Print CV in ${loc === "en" ? "English" : "German"}`}
                >
                  {LOCALE_LABELS[loc]}
                </ControlPanelOption>
              ))}
            </ControlPanelRow>
          )}
        </ControlPanelSection>
      </motion.div>
    </div>
  );
}
