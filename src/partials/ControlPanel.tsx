import { useCallback, useEffect, useState } from "react";

import { useNavigate, useRouterState } from "@tanstack/react-router";
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
import type { FileRouteTypes } from "@/routeTree.gen";

const CONTRAST_LABELS = { low: "LC", base: "BC", high: "HC" } as const;
const COLOR_MODE_LABELS = { light: "LT", system: "SYS", dark: "DK" } as const;
const CONTRAST_TITLES = { low: "Low Contrast", base: "Base Contrast", high: "High Contrast" } as const;
const COLOR_MODE_TITLES = { light: "Light Mode", system: "System Mode", dark: "Dark Mode" } as const;

const ROUTE_HINTS: Record<string, string> = {
  "/": "Portfolio & About",
  "/cv": "Print-friendly CV for PDF export"
};

/**
 * ControlPanel - Smart container for navigation and style settings.
 * Composed of Strip (always visible) and Expanded panel (slides in/out).
 */
export default function ControlPanel() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });
  const isMobile = useIsMobile();

  const [isExpanded, setIsExpanded] = useState(false);

  const { accent, accents, setAccent } = useAccent();
  const { contrast, contrasts, setContrast } = useContrast();
  const { colorMode, colorModes, setColorMode } = useColorMode();

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

  const navRoutes: { to: FileRouteTypes["to"]; hint: string }[] = [
    { to: "/", hint: ROUTE_HINTS["/"] },
    { to: "/cv", hint: ROUTE_HINTS["/cv"] }
  ];

  return (
    <>
      {/* Strip - Always visible indicator column */}
      <ControlPanelStrip
        isExpanded={isExpanded}
        onToggle={togglePanel}
        ariaLabel="Toggle control panel"
      >
        {/* Navigation indicator */}
        <ControlPanelStripSection>
          <ControlPanelIndicator rotated>{pathname}</ControlPanelIndicator>
        </ControlPanelStripSection>

        {/* Style indicators */}
        <ControlPanelStripSection>
          <ControlPanelIndicator>
            <ControlPanelColorDot hue={accent} />
          </ControlPanelIndicator>
          <Hint title={CONTRAST_TITLES[contrast]} position="left">
            <ControlPanelIndicator>
              {CONTRAST_LABELS[contrast]}
            </ControlPanelIndicator>
          </Hint>
          <Hint title={COLOR_MODE_TITLES[colorMode]} position="left">
            <ControlPanelIndicator>
              {COLOR_MODE_LABELS[colorMode]}
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
              <ControlPanelRow label="Page">
                {navRoutes.map(({ to, hint }) => (
                  <Hint key={to} title={hint}>
                    <ControlPanelOption
                      width="full"
                      align="left"
                      isActive={pathname === to}
                      onClick={() => {
                        navigate({ to });
                        setIsExpanded(false);
                      }}
                      ariaLabel={`Navigate to ${to}`}
                    >
                      {to}
                    </ControlPanelOption>
                  </Hint>
                ))}
              </ControlPanelRow>
            </div>

            {/* Sections column */}
            {sections.length > 0 && (
              <div className="ControlPanelExpanded__sections">
                <ControlPanelRow label="Sections">
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
                    ariaLabel="Scroll to Top"
                  >
                    <ArrowUpToLine
                      size={14}
                      strokeWidth={3}
                      color="var(--color-fg-minor)"
                      style={{ marginRight: "var(--size-1)" }}
                    />
                    <span className="ControlPanelOption__label">Top</span>
                  </ControlPanelOption>
                  {sections.map(section => (
                    <ControlPanelOption
                      key={section.id}
                      width="full"
                      align="left"
                      onClick={() => handleSectionClick(section.id)}
                      ariaLabel={`Scroll to ${section.label}`}
                    >
                      <PilcrowRight
                        size={14}
                        strokeWidth={3}
                        color="var(--color-fg-minor)"
                        style={{ marginRight: "var(--size-2)" }}
                      />
                      <span className="ControlPanelOption__label">
                        {section.label}
                      </span>
                    </ControlPanelOption>
                  ))}
                </ControlPanelRow>
              </div>
            )}
          </div>
        </ControlPanelExpandedSection>

        {/* Style options */}
        <ControlPanelExpandedSection>
          <ControlPanelRow label="Accent">
            {Object.values(accents).map(accentPreset => (
              <ControlPanelOption
                key={accentPreset}
                isActive={accentPreset === accent}
                onClick={() => setAccent(accentPreset)}
                ariaLabel={`Select accent hue ${accentPreset}`}
              >
                <ControlPanelColorDot hue={accentPreset} />
              </ControlPanelOption>
            ))}
          </ControlPanelRow>

          <ControlPanelRow label="Contrast">
            {contrasts.map(value => (
              <Hint key={value} title={CONTRAST_TITLES[value]}>
                <ControlPanelOption
                  isActive={contrast === value}
                  onClick={() => setContrast(value)}
                  ariaLabel={`Select ${CONTRAST_TITLES[value].toLowerCase()}`}
                >
                  {CONTRAST_LABELS[value]}
                </ControlPanelOption>
              </Hint>
            ))}
          </ControlPanelRow>

          <ControlPanelRow label="Mode">
            {colorModes.map(value => (
              <Hint key={value} title={COLOR_MODE_TITLES[value]}>
                <ControlPanelOption
                  isActive={colorMode === value}
                  onClick={() => setColorMode(value)}
                  ariaLabel={`Select ${COLOR_MODE_TITLES[value].toLowerCase()}`}
                >
                  {COLOR_MODE_LABELS[value]}
                </ControlPanelOption>
              </Hint>
            ))}
          </ControlPanelRow>
        </ControlPanelExpandedSection>
      </ControlPanelExpanded>
    </>
  );
}
