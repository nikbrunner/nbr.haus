import { useCallback, useEffect, useState } from "react";

import { useRouter, useRouterState } from "@tanstack/react-router";

import { useColorMode } from "@/hooks/useColorMode";
import { useContrast } from "@/hooks/useContrast";
import { useHue } from "@/hooks/useHue";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useOnMount } from "@/hooks/useOnMount";
import { useLocale } from "@/i18n/useLocale";
import { useTexts } from "@/i18n/useTexts";

import { ControlPanelColorDot } from "./ControlPanelColorDot";
import {
  ControlPanelExpanded,
  ControlPanelExpandedSection
} from "./ControlPanelExpanded";
import { ControlPanelIndicator } from "./ControlPanelIndicator";
import { ControlPanelOption } from "./ControlPanelOption";
import { ControlPanelRow } from "./ControlPanelRow";
import { ControlPanelStrip, ControlPanelStripSection } from "./ControlPanelStrip";

/**
 * ControlPanel - Smart container for navigation, locale, and style settings.
 * Composed of Strip (always visible) and Expanded panel (slides in/out).
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

  const closePanel = useCallback(() => setIsExpanded(false), []);
  const togglePanel = useCallback(() => setIsExpanded(prev => !prev), []);

  // Close on click outside (target both strip and expanded panel)
  useOnClickOutside(
    [".ControlPanelStrip", ".ControlPanelExpanded"],
    closePanel,
    isExpanded
  );

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

  return (
    <>
      {/* Strip - Always visible indicator column */}
      <ControlPanelStrip
        isExpanded={isExpanded}
        onToggle={togglePanel}
        ariaLabel={t.controlPanel.aria.togglePanel}
      >
        {/* Navigation indicator */}
        <ControlPanelStripSection>
          <ControlPanelIndicator>{pathname}</ControlPanelIndicator>
        </ControlPanelStripSection>

        {/* Locale indicator */}
        <ControlPanelStripSection>
          <ControlPanelIndicator title={t.controlPanel.titles.locale[locale]}>
            {t.controlPanel.labels.locale[locale]}
          </ControlPanelIndicator>
        </ControlPanelStripSection>

        {/* Style indicators */}
        <ControlPanelStripSection>
          <ControlPanelIndicator>
            <ControlPanelColorDot hue={getAccentHue(hue)} />
          </ControlPanelIndicator>
          <ControlPanelIndicator title={t.controlPanel.titles.contrast[contrast]}>
            {t.controlPanel.labels.contrast[contrast]}
          </ControlPanelIndicator>
          <ControlPanelIndicator title={t.controlPanel.titles.colorMode[colorMode]}>
            {t.controlPanel.labels.colorMode[colorMode]}
          </ControlPanelIndicator>
        </ControlPanelStripSection>
      </ControlPanelStrip>

      {/* Expanded panel - Slides in from right */}
      <ControlPanelExpanded isExpanded={isExpanded}>
        {/* Navigation options */}
        <ControlPanelExpandedSection>
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
        </ControlPanelExpandedSection>

        {/* Locale options */}
        <ControlPanelExpandedSection>
          <ControlPanelRow label={t.controlPanel.rows.lang}>
            {locales.map(loc => (
              <ControlPanelOption
                key={loc}
                isActive={locale === loc}
                onClick={() => {
                  if (loc === locale) return;

                  setLocale(loc);
                  setIsExpanded(false);
                }}
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
        </ControlPanelExpandedSection>

        {/* Style options */}
        <ControlPanelExpandedSection>
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
        </ControlPanelExpandedSection>
      </ControlPanelExpanded>
    </>
  );
}
