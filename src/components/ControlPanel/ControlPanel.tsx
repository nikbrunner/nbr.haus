import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useRouter, useRouterState } from "@tanstack/react-router";
import { cx } from "class-variance-authority";
import { motion } from "framer-motion";
import { Printer } from "lucide-react";

import { useColorMode } from "@/hooks/useColorMode";
import { useContrast } from "@/hooks/useContrast";
import { useHue } from "@/hooks/useHue";
import { useInitializeStyle } from "@/hooks/useInitializeStyle";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useLocale } from "@/i18n/useLocale";
import { useTexts } from "@/i18n/useTexts";
import { LOCALES, type Locale } from "@/types/i18n";

import { ControlPanelColorDot } from "./ControlPanelColorDot";
import { ControlPanelIndicator } from "./ControlPanelIndicator";
import { ControlPanelOption } from "./ControlPanelOption";
import { ControlPanelPrintHint } from "./ControlPanelPrintHint";
import { ControlPanelRow } from "./ControlPanelRow";
import { ControlPanelSection } from "./ControlPanelSection";

/**
 * ControlPanel - Smart container for navigation, locale, and style settings.
 * Composes ControlPanelSection dumb components and handles all state/routing logic.
 */
export default function ControlPanel() {
  const router = useRouter();
  const pathname = useRouterState({ select: s => s.location.pathname });
  const t = useTexts();

  const [isExpanded, setIsExpanded] = useState(false);

  const { hue, hues, setHue, getAccentHue } = useHue();
  const { contrast, contrasts, setContrast } = useContrast();
  const { colorMode, colorModes, setColorMode } = useColorMode();
  const { locale, setLocale } = useLocale();

  useInitializeStyle();

  const isOnCVPage = pathname === "/cv";
  const showPrintHint = isOnCVPage && !isExpanded;

  // Refs for positioning the print hint relative to the print indicator
  const panelRef = useRef<HTMLDivElement>(null);
  const printIndicatorRef = useRef<HTMLDivElement>(null);
  const [hintPosition, setHintPosition] = useState<{
    bottom: number;
    right: number;
  } | null>(null);

  const closePanel = useCallback(() => setIsExpanded(false), []);

  // Close on click outside
  useOnClickOutside([".ControlPanel"], closePanel, isExpanded);

  // Close on Escape key
  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  // Calculate hint position in viewport coordinates (for fixed positioning via Portal)
  useLayoutEffect(() => {
    if (!showPrintHint || !printIndicatorRef.current) {
      setHintPosition(null);
      return;
    }

    const indicatorRect = printIndicatorRef.current.getBoundingClientRect();

    // Position hint to the left of the indicator, vertically centered
    const SPACING = indicatorRect.width / 2; // Gap between hint and indicator

    // Calculate viewport-relative coordinates for fixed positioning
    const bottomFromViewport =
      window.innerHeight - (indicatorRect.top + indicatorRect.height / 2);
    const rightFromViewport = window.innerWidth - indicatorRect.left + SPACING;

    setHintPosition({
      bottom: bottomFromViewport,
      right: rightFromViewport
    });
  }, [showPrintHint]);

  // Get navigable routes from router
  const navLinks = Object.keys(router.routesByPath)
    .filter(path => !path.includes("$"))
    .sort((a, b) => a.localeCompare(b));

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleSelectLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setLocale(newLocale);
    setIsExpanded(false);
  };

  const handlePrintWithLocale = (printLocale: Locale) => {
    if (printLocale !== locale) {
      setLocale(printLocale);
    }
    setIsExpanded(false);

    // Delay to allow DOM to update with new translations
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div
      ref={panelRef}
      className={cx("ControlPanel", isExpanded && "ControlPanel--expanded")}
    >
      <motion.div
        className="ControlPanel__content"
        role="button"
        tabIndex={0}
        aria-label={t.controlPanel.aria.togglePanel}
        onClick={() => setIsExpanded(prev => !prev)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(prev => !prev);
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
          <ControlPanelRow label={t.controlPanel.rows.nav}>
            {navLinks.map(navPath => (
              <ControlPanelOption
                key={navPath}
                isActive={pathname === navPath}
                onClick={() => {
                  router.navigate({ to: navPath });
                  setIsExpanded(false);
                }}
                ariaLabel={`${t.controlPanel.aria.navigateTo} ${navPath}`}
              >
                {navPath}
              </ControlPanelOption>
            ))}
          </ControlPanelRow>
        </ControlPanelSection>

        {/* Locale Section */}
        <ControlPanelSection
          indicator={
            <ControlPanelIndicator title={t.controlPanel.titles.locale[locale]}>
              {t.controlPanel.labels.locale[locale]}
            </ControlPanelIndicator>
          }
        >
          <ControlPanelRow label={t.controlPanel.rows.lang}>
            {LOCALES.map(loc => (
              <ControlPanelOption
                key={loc}
                isActive={locale === loc}
                onClick={() => handleSelectLocale(loc)}
                ariaLabel={
                  loc === "en"
                    ? t.controlPanel.aria.selectEnglish
                    : t.controlPanel.aria.selectGerman
                }
                title={t.controlPanel.titles.locale[loc]}
              >
                {t.controlPanel.labels.locale[loc]}
              </ControlPanelOption>
            ))}
          </ControlPanelRow>
        </ControlPanelSection>

        {/* Style Section */}
        <ControlPanelSection
          indicator={
            <>
              <ControlPanelIndicator>
                <ControlPanelColorDot hue={getAccentHue(hue)} />
              </ControlPanelIndicator>
              <ControlPanelIndicator
                title={t.controlPanel.titles.contrast[contrast]}
              >
                {t.controlPanel.labels.contrast[contrast]}
              </ControlPanelIndicator>
              <ControlPanelIndicator
                title={t.controlPanel.titles.colorMode[colorMode]}
              >
                {t.controlPanel.labels.colorMode[colorMode]}
              </ControlPanelIndicator>
            </>
          }
        >
          <ControlPanelRow label={t.controlPanel.rows.accent}>
            {hues.map(presetHue => (
              <ControlPanelOption
                key={presetHue}
                isActive={hue === presetHue}
                onClick={() => setHue(presetHue)}
                ariaLabel={`${t.controlPanel.aria.selectAccentHue} ${presetHue}`}
              >
                <ControlPanelColorDot hue={getAccentHue(presetHue)} />
              </ControlPanelOption>
            ))}
          </ControlPanelRow>

          <ControlPanelRow label={t.controlPanel.rows.contrast}>
            {contrasts.map(value => (
              <ControlPanelOption
                key={value}
                isActive={contrast === value}
                onClick={() => setContrast(value)}
                ariaLabel={t.controlPanel.aria.selectContrast[value]}
                title={t.controlPanel.titles.contrast[value]}
              >
                {t.controlPanel.labels.contrast[value]}
              </ControlPanelOption>
            ))}
          </ControlPanelRow>

          <ControlPanelRow label={t.controlPanel.rows.mode}>
            {colorModes.map(value => (
              <ControlPanelOption
                key={value}
                isActive={colorMode === value}
                onClick={() => setColorMode(value)}
                ariaLabel={t.controlPanel.aria.selectColorMode[value]}
                title={t.controlPanel.titles.colorMode[value]}
              >
                {t.controlPanel.labels.colorMode[value]}
              </ControlPanelOption>
            ))}
          </ControlPanelRow>
        </ControlPanelSection>

        {/* Print Section - only on CV page */}
        <ControlPanelSection
          indicatorRef={printIndicatorRef}
          indicator={
            <ControlPanelIndicator disabled={!isOnCVPage}>
              <Printer size={16} />
            </ControlPanelIndicator>
          }
        >
          {isOnCVPage && (
            <ControlPanelRow label={t.controlPanel.rows.print}>
              {LOCALES.map(loc => (
                <ControlPanelOption
                  key={loc}
                  isActive={locale === loc}
                  onClick={() => handlePrintWithLocale(loc)}
                  ariaLabel={
                    loc === "en"
                      ? t.controlPanel.aria.printInEnglish
                      : t.controlPanel.aria.printInGerman
                  }
                  title={t.controlPanel.titles.locale[loc]}
                >
                  {t.controlPanel.labels.locale[loc]}
                </ControlPanelOption>
              ))}
            </ControlPanelRow>
          )}
        </ControlPanelSection>
      </motion.div>

      {/* Print hint - rendered outside clip-path container */}
      <ControlPanelPrintHint
        text={t.controlPanel.printHint}
        isVisible={showPrintHint && hintPosition !== null}
        style={
          hintPosition
            ? {
                bottom: hintPosition.bottom,
                right: hintPosition.right,
                transform: "translateY(50%)"
              }
            : undefined
        }
      />
    </div>
  );
}
