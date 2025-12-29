import { useCallback, useEffect, useRef, useState } from "react";

import { useRouter, useRouterState } from "@tanstack/react-router";
import { cx } from "class-variance-authority";
import { motion } from "framer-motion";

import { useColorMode } from "@/hooks/useColorMode";
import { useContrast } from "@/hooks/useContrast";
import { useHue } from "@/hooks/useHue";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useOnMount } from "@/hooks/useOnMount";
import { useLocale } from "@/i18n/useLocale";
import { useTexts } from "@/i18n/useTexts";
import { type Locale } from "@/types/i18n";

import { ControlPanelColorDot } from "./ControlPanelColorDot";
import { ControlPanelIndicator } from "./ControlPanelIndicator";
import { ControlPanelOption } from "./ControlPanelOption";
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
  const { locale, locales, setLocale } = useLocale();

  useOnMount(() => {
    setHue(hue);
    setContrast(contrast);
    setColorMode(colorMode);
    setLocale(locale);
  });

  const panelRef = useRef<HTMLDivElement>(null);
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

  // Get navigable routes from router (filter out /cv which is only for PDF generation)
  const navLinks = Object.keys(router.routesByPath)
    .filter(path => !path.includes("$") && path !== "/cv")
    .sort((a, b) => a.localeCompare(b));

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleSelectLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setLocale(newLocale);
    setIsExpanded(false);
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
            {locales.map(loc => (
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
      </motion.div>
    </div>
  );
}
