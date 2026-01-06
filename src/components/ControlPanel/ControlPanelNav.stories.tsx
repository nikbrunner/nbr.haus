import type { Meta, StoryObj } from "@storybook/react-vite";

import { ControlPanelLabel } from "@/components/ControlPanel/ControlPanelLabel";
import { ControlPanelNav } from "@/components/ControlPanel/ControlPanelNav";
import { ControlPanelOption } from "@/components/ControlPanel/ControlPanelOption";
import { ControlPanelStack } from "@/components/ControlPanel/ControlPanelStack";

const meta: Meta<typeof ControlPanelNav> = {
  title: "ControlPanel/Nav",
  component: ControlPanelNav,
  parameters: {
    layout: "centered"
  },
  decorators: [
    Story => (
      <div
        style={{
          background: "var(--color-bg-main)",
          border: "var(--border-size-2) solid var(--color-fg-accent)",
          padding: "var(--control-panel-padding)",
          containerType: "inline-size",
          containerName: "control-panel",
          width: "clamp(280px, 50vw, 400px)"
        }}
      >
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof ControlPanelNav>;

// Default with routes and sections
export const Default: Story = {
  render: () => (
    <ControlPanelNav
      routes={
        <>
          <ControlPanelLabel>Page</ControlPanelLabel>
          <ControlPanelStack>
            <ControlPanelOption
              width="full"
              align="left"
              isActive
              onClick={() => {}}
              ariaLabel="Home"
            >
              /
            </ControlPanelOption>
            <ControlPanelOption
              width="full"
              align="left"
              onClick={() => {}}
              ariaLabel="CV"
            >
              /cv
            </ControlPanelOption>
          </ControlPanelStack>
        </>
      }
      sections={
        <>
          <ControlPanelLabel>Sections</ControlPanelLabel>
          <ControlPanelStack>
            <ControlPanelOption
              width="full"
              align="left"
              onClick={() => {}}
              ariaLabel="Connect"
            >
              Connect
            </ControlPanelOption>
            <ControlPanelOption
              width="full"
              align="left"
              onClick={() => {}}
              ariaLabel="About"
            >
              About
            </ControlPanelOption>
            <ControlPanelOption
              width="full"
              align="left"
              onClick={() => {}}
              ariaLabel="Employment"
            >
              Employment
            </ControlPanelOption>
            <ControlPanelOption
              width="full"
              align="left"
              onClick={() => {}}
              ariaLabel="Projects"
            >
              Projects
            </ControlPanelOption>
          </ControlPanelStack>
        </>
      }
    />
  )
};

// Routes only (no sections)
export const RoutesOnly: Story = {
  render: () => (
    <ControlPanelNav
      routes={
        <>
          <ControlPanelLabel>Page</ControlPanelLabel>
          <ControlPanelStack>
            <ControlPanelOption
              width="full"
              align="left"
              isActive
              onClick={() => {}}
              ariaLabel="Home"
            >
              /
            </ControlPanelOption>
            <ControlPanelOption
              width="full"
              align="left"
              onClick={() => {}}
              ariaLabel="CV"
            >
              /cv
            </ControlPanelOption>
            <ControlPanelOption
              width="full"
              align="left"
              onClick={() => {}}
              ariaLabel="Photography"
            >
              /photography
            </ControlPanelOption>
          </ControlPanelStack>
        </>
      }
    />
  )
};

// Many sections (scrollable)
export const ManySections: Story = {
  render: () => (
    <ControlPanelNav
      routes={
        <>
          <ControlPanelLabel>Page</ControlPanelLabel>
          <ControlPanelStack>
            <ControlPanelOption
              width="full"
              align="left"
              isActive
              onClick={() => {}}
              ariaLabel="CV"
            >
              /cv
            </ControlPanelOption>
          </ControlPanelStack>
        </>
      }
      sections={
        <>
          <ControlPanelLabel>Sections</ControlPanelLabel>
          <ControlPanelStack scroll maxHeight="200px">
            {[
              "Experience",
              "Projects",
              "Skills",
              "Education",
              "Certifications",
              "Publications",
              "Talks",
              "Interests"
            ].map(section => (
              <ControlPanelOption
                key={section}
                width="full"
                align="left"
                onClick={() => {}}
                ariaLabel={section}
              >
                {section}
              </ControlPanelOption>
            ))}
          </ControlPanelStack>
        </>
      }
    />
  )
};
