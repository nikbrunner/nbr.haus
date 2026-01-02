import { useCallback, useEffect, useState } from "react";

import { useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowUpToLine, PilcrowRight } from "lucide-react";

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
import { useAccent } from "@/hooks/useAccent";
import { useColorMode } from "@/hooks/useColorMode";
import { useContrast } from "@/hooks/useContrast";
import { useDynamicSections } from "@/hooks/useDynamicSections";
import { useIsMobile } from "@/hooks/useIsMobile";
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
  const isMobile = useIsMobile();

  const [isExpanded, setIsExpanded] = useState(false);

  const { accent, accents, setAccent } = useAccent();
  const { contrast, contrasts, setContrast } = useContrast();
  const { colorMode, colorModes, setColorMode } = useColorMode();
  const { locale, locales, setLocale } = useLocale();

  const closePanel = useCallback(() => setIsExpanded(false), []);
  const togglePanel = useCallback(() => setIsExpanded(prev => !prev), []);

  // Get sections dynamically from DOM (works for all pages)
  const sections = useDynamicSections();

  // Handler for section navigation
  // On iOS Safari, smooth scroll fails when competing with panel animation.
  // Close panel first, wait for animation, then scroll.
  const handleSectionClick = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      if (isMobile) {
        closePanel();
        // Wait for panel exit animation (200ms) before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 250);
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [isMobile, closePanel]
  );

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

  // Get navigable routes from router
  // Filter out: catch-all routes ($), and /study (WIP, hidden for now)
  const navLinks = Object.keys(router.routesByPath)
    .filter(path => !path.includes("$") && !path.startsWith("/study"))
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
          <ControlPanelIndicator rotated>{pathname}</ControlPanelIndicator>
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
            <ControlPanelColorDot hue={accent} />
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
        {/* Navigation options - two-column on desktop, stacked on mobile */}
        <ControlPanelExpandedSection>
          <div className="ControlPanelExpanded__navigation">
            {/* Routes column */}
            <div className="ControlPanelExpanded__routes">
              <ControlPanelRow label={t.controlPanel.rows.nav}>
                {navLinks.map(navPath => (
                  <ControlPanelOption
                    key={navPath}
                    width="full"
                    align="left"
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
            </div>

            {/* Sections column */}
            {sections.length > 0 && (
              <div className="ControlPanelExpanded__sections">
                <ControlPanelRow label={t.controlPanel.rows.sections}>
                  <ControlPanelOption
                    width="full"
                    align="left"
                    onClick={() => {
                      if (isMobile) {
                        closePanel();
                        // Wait for panel exit animation before scrolling (iOS Safari fix)
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }, 250);
                      } else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    ariaLabel={`${t.controlPanel.aria.scrollTo} ${t.shared.sections.top}`}
                  >
                    <ArrowUpToLine
                      size={14}
                      strokeWidth={3}
                      color="var(--color-fg-minor)"
                      style={{ marginRight: "var(--size-1)" }}
                    />
                    {t.shared.sections.top}
                  </ControlPanelOption>
                  {sections.map(section => (
                    <ControlPanelOption
                      key={section.id}
                      width="full"
                      align="left"
                      onClick={() => handleSectionClick(section.id)}
                      ariaLabel={`${t.controlPanel.aria.scrollTo} ${section.label}`}
                    >
                      <PilcrowRight
                        size={14}
                        strokeWidth={3}
                        color="var(--color-fg-minor)"
                        style={{ marginRight: "var(--size-2)" }}
                      />
                      {section.label}
                    </ControlPanelOption>
                  ))}
                </ControlPanelRow>
              </div>
            )}
          </div>
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
            {Object.values(accents).map(accentPreset => (
              <ControlPanelOption
                key={accentPreset}
                isActive={accentPreset === accent}
                onClick={() => setAccent(accentPreset)}
                ariaLabel={`${t.controlPanel.aria.selectAccentHue} ${accentPreset}`}
              >
                <ControlPanelColorDot hue={accentPreset} />
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
