import type { Meta, StoryObj } from "@storybook/react-vite";

import Flex from "@/components/Flex";
import { Typo } from "@/components/Typo";

const meta: Meta<typeof Flex> = {
  component: Flex
};

export default meta;
type Story = StoryObj<typeof Flex>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "var(--size-3)",
      background: "var(--bg-alt)",
      border: "1px solid var(--color-fg-support)"
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: {
    gap: "4",
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    )
  }
};

export const Column: Story = {
  args: {
    direction: "column",
    gap: "4",
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    )
  }
};

export const GapStandard: Story = {
  args: {
    gap: "8",
    children: (
      <>
        <Box>Gap 8</Box>
        <Box>Gap 8</Box>
        <Box>Gap 8</Box>
      </>
    )
  }
};

export const GapFluid: Story = {
  args: {
    gap: "fluid-4",
    children: (
      <>
        <Box>Fluid Gap</Box>
        <Box>Fluid Gap</Box>
        <Box>Fluid Gap</Box>
      </>
    )
  }
};

export const GapRelative: Story = {
  args: {
    gap: "rel-4",
    children: (
      <>
        <Box>Relative Gap</Box>
        <Box>Relative Gap</Box>
        <Box>Relative Gap</Box>
      </>
    )
  }
};

export const JustifyCenter: Story = {
  args: {
    justify: "center",
    gap: "4",
    children: (
      <>
        <Box>Centered</Box>
        <Box>Items</Box>
      </>
    )
  },
  decorators: [
    Story => (
      <div style={{ width: "100%", border: "1px dashed var(--color-fg-support)" }}>
        <Story />
      </div>
    )
  ]
};

export const JustifyBetween: Story = {
  args: {
    justify: "between",
    children: (
      <>
        <Box>Left</Box>
        <Box>Right</Box>
      </>
    )
  },
  decorators: [
    Story => (
      <div style={{ width: "100%", border: "1px dashed var(--color-fg-support)" }}>
        <Story />
      </div>
    )
  ]
};

export const AlignCenter: Story = {
  args: {
    align: "center",
    gap: "4",
    children: (
      <>
        <Box>Short</Box>
        <div
          style={{
            padding: "var(--size-6)",
            background: "var(--bg-alt)",
            border: "1px solid var(--color-fg-support)"
          }}
        >
          Tall Item
        </div>
        <Box>Short</Box>
      </>
    )
  }
};

export const Wrap: Story = {
  args: {
    wrap: "wrap",
    gap: "4",
    children: (
      <>
        {Array.from({ length: 10 }, (_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </>
    )
  },
  decorators: [
    Story => (
      <div style={{ width: "300px", border: "1px dashed var(--color-fg-support)" }}>
        <Story />
      </div>
    )
  ]
};

export const InlineFlex: Story = {
  args: {
    inline: true,
    gap: "2",
    children: (
      <>
        <Box>Inline</Box>
        <Box>Flex</Box>
      </>
    )
  },
  decorators: [
    Story => (
      <Typo.P>
        This is text with <Story /> in the middle.
      </Typo.P>
    )
  ]
};

export const AsNav: Story = {
  args: {
    as: "nav",
    gap: "4",
    children: (
      <>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </>
    )
  }
};
