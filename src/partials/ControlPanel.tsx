import { useCallback, useEffect, useState } from "react";

import { useRouter, useRouterState } from "@tanstack/react-router";

import { ControlPanelColorDot } from "@/components/ControlPanel/ControlPanelColorDot";
import {
  ControlPanelExpanded,
  ControlPanelExpandedSection
} from "@/components/ControlPanel/ControlPanelExpanded";
import { ControlPanelIndicator } from "@/components/ControlPanel/ControlPanelIndicator";
import { ControlPanelOption } from "@/components/ControlPanel/ControlPanelOption";
import { ControlPanelRow } from "@/components/ControlPanel/ControlPanelRow";
import {
  ControlPanelStrip,
  ControlPanelStripSection
} from "@/components/ControlPanel/ControlPanelStrip";
import Hint from "@/components/Hint";
import { useColorMode } from "@/hooks/useColorMode";
import { useContrast } from "@/hooks/useContrast";
import { useHue } from "@/hooks/useHue";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useLocale } from "@/i18n/useLocale";
import { useTexts } from "@/i18n/useTexts";

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
          <Hint title={t.controlPanel.titles.locale[locale]} position="left">
            <ControlPanelIndicator>
              {t.controlPanel.labels.locale[locale]}
            </ControlPanelIndicator>
          </Hint>
        </ControlPanelStripSection>

        {/* Style indicators */}
        <ControlPanelStripSection>
          <ControlPanelIndicator>
            <ControlPanelColorDot hue={getAccentHue(hue)} />
          </ControlPanelIndicator>
          <Hint title={t.controlPanel.titles.contrast[contrast]} position="left">
            <ControlPanelIndicator>
              {t.controlPanel.labels.contrast[contrast]}
            </ControlPanelIndicator>
          </Hint>
          <Hint title={t.controlPanel.titles.colorMode[colorMode]} position="left">
            <ControlPanelIndicator>
              {t.controlPanel.labels.colorMode[colorMode]}
            </ControlPanelIndicator>
          </Hint>
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
              <Hint key={loc} title={t.controlPanel.titles.locale[loc]}>
                <ControlPanelOption
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
                >
                  {t.controlPanel.labels.locale[loc]}
                </ControlPanelOption>
              </Hint>
            ))}
          </ControlPanelRow>
        </ControlPanelExpandedSection>

        {/* Style options */}
        <ControlPanelExpandedSection>
          <ControlPanelRow label={t.controlPanel.rows.accent}>
            {Object.values(hues).map(hue => (
              <ControlPanelOption
                key={hue}
                isActive={hue === hue}
                onClick={() => setHue(hue)}
                ariaLabel={`${t.controlPanel.aria.selectAccentHue} ${hue}`}
              >
                <ControlPanelColorDot hue={getAccentHue(hue)} />
              </ControlPanelOption>
            ))}
          </ControlPanelRow>

          <ControlPanelRow label={t.controlPanel.rows.contrast}>
            {contrasts.map(value => (
              <Hint key={value} title={t.controlPanel.titles.contrast[value]}>
                <ControlPanelOption
                  isActive={contrast === value}
                  onClick={() => setContrast(value)}
                  ariaLabel={t.controlPanel.aria.selectContrast[value]}
                >
                  {t.controlPanel.labels.contrast[value]}
                </ControlPanelOption>
              </Hint>
            ))}
          </ControlPanelRow>

          <ControlPanelRow label={t.controlPanel.rows.mode}>
            {colorModes.map(value => (
              <Hint key={value} title={t.controlPanel.titles.colorMode[value]}>
                <ControlPanelOption
                  isActive={colorMode === value}
                  onClick={() => setColorMode(value)}
                  ariaLabel={t.controlPanel.aria.selectColorMode[value]}
                >
                  {t.controlPanel.labels.colorMode[value]}
                </ControlPanelOption>
              </Hint>
            ))}
          </ControlPanelRow>
        </ControlPanelExpandedSection>
      </ControlPanelExpanded>
    </>
  );
}
