import type { Meta, StoryObj } from "@storybook/react-vite";

import { ControlPanelOption } from "@/components/ControlPanel/ControlPanelOption";
import { ControlPanelRow } from "@/components/ControlPanel/ControlPanelRow";

import "@/components/ControlPanel/ControlPanelExpanded.css";
import "@/components/ControlPanel/ControlPanelOption.css";
import "@/components/ControlPanel/ControlPanelRow.css";

interface NavigationDemoProps {
  routes: string[];
  sections: string[];
}

/**
 * Demo component to test ControlPanel navigation layout and scrolling.
 * Mimics the structure used in ControlPanelExpanded for routes and sections.
 */
function NavigationDemo({ routes, sections }: NavigationDemoProps) {
  return (
    <div
      style={{
        background: "var(--bg-main)",
        border: "var(--border-size-2) solid var(--fg-accent)",
        padding: "var(--control-panel-padding)"
      }}
    >
      <div className="ControlPanelExpanded__navigation">
        {/* Routes column */}
        <div className="ControlPanelExpanded__routes">
          <ControlPanelRow label="Page">
            {routes.map((route, i) => (
              <ControlPanelOption
                key={route}
                width="auto"
                isActive={i === 0}
                onClick={() => {}}
                ariaLabel={`Navigate to ${route}`}
              >
                {route}
              </ControlPanelOption>
            ))}
          </ControlPanelRow>
        </div>

        {/* Sections column */}
        {sections.length > 0 && (
          <div className="ControlPanelExpanded__sections">
            <ControlPanelRow label="SECTIONS">
              {sections.map(section => (
                <ControlPanelOption
                  key={section}
                  width="full"
                  onClick={() => {}}
                  ariaLabel={`Scroll to ${section}`}
                >
                  {section}
                </ControlPanelOption>
              ))}
            </ControlPanelRow>
          </div>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof NavigationDemo> = {
  title: "ControlPanel/Navigation",
  component: NavigationDemo,
  parameters: {
    layout: "centered"
  }
};

export default meta;
type Story = StoryObj<typeof NavigationDemo>;

// Current index page (4 routes, 4 sections)
export const IndexPage: Story = {
  args: {
    routes: ["/", "/cv", "/photography", "/library"],
    sections: ["Connect", "About", "Employment", "Projects"]
  }
};

// CV page (4 routes, 6 sections)
export const CVPage: Story = {
  args: {
    routes: ["/", "/cv", "/photography", "/library"],
    sections: [
      "Work Experience",
      "Side Projects",
      "Technical Skills",
      "Prior Experience",
      "Education",
      "Interests"
    ]
  }
};

// Many routes (5+ routes to test horizontal scroll on mobile)
export const ManyRoutes: Story = {
  args: {
    routes: ["/", "/cv", "/photography", "/library", "/blog", "/contact", "/about"],
    sections: ["Connect", "About", "Employment", "Projects"]
  }
};

// Many sections (10+ sections to test vertical scroll)
export const ManySections: Story = {
  args: {
    routes: ["/", "/cv", "/photography", "/library"],
    sections: [
      "Hero",
      "Connect",
      "About",
      "Skills",
      "Employment",
      "Projects",
      "Education",
      "Certifications",
      "Publications",
      "Talks",
      "Interests",
      "Contact"
    ]
  }
};

// Route only (no sections for current route)
export const NoSections: Story = {
  args: {
    routes: ["/", "/cv", "/photography", "/library"],
    sections: []
  }
};
