import type { Meta, StoryObj } from "@storybook/react-vite";

import Flex from "@/components/Flex";
import { Typo } from "@/components/Typo";

const meta: Meta = {
  title: "Components/Typo",
  parameters: {
    layout: "padded"
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: "var(--size-content-3)" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

export const ArticleExample: StoryObj = {
  name: "Article Layout (Prose)",
  render: () => (
    <article>
      <Typo.H1>Building Modern Web Applications</Typo.H1>
      <Typo.P color="support">
        A comprehensive guide to creating performant, accessible, and maintainable
        web applications using modern tooling and best practices.
      </Typo.P>

      <Typo.H2>Getting Started</Typo.H2>
      <Typo.P>
        The landscape of web development has evolved dramatically over the past
        decade. What once required complex server-side rendering and jQuery plugins
        can now be accomplished with elegant, declarative component architectures.
        This shift has fundamentally changed how we think about building for the web.
      </Typo.P>
      <Typo.P>
        In this guide, we will explore the core principles that underpin modern
        frontend development, from component composition to state management, and
        from type safety to performance optimization.
      </Typo.P>

      <Typo.H3>Prerequisites</Typo.H3>
      <Typo.P>
        Before diving in, you should have a solid understanding of JavaScript
        fundamentals, including ES6+ features like destructuring, arrow functions,
        and modules. Familiarity with React or similar component libraries will be
        helpful but is not strictly required.
      </Typo.P>

      <Typo.H4>Tools You Will Need</Typo.H4>
      <Typo.P color="support">
        We recommend using a modern code editor like VS Code or Neovim with
        appropriate language server support. A terminal emulator and Node.js 18+ are
        essential for running the development environment.
      </Typo.P>
    </article>
  )
};

export const HeadingScale: StoryObj = {
  name: "Heading Scale (Prose)",
  render: () => (
    <div>
      <Typo.H1>Page Title</Typo.H1>
      <Typo.P color="support">
        Reserved for the main page title. There should only be one H1 per page for
        accessibility and SEO purposes.
      </Typo.P>

      <Typo.H2>Section Header</Typo.H2>
      <Typo.P color="support">
        Used to divide the page into major sections. The decorated variant adds
        visual distinction with an underline and uppercase treatment.
      </Typo.P>

      <Typo.H2 variant="web" color="main">
        Plain Section Header
      </Typo.H2>
      <Typo.P color="support">
        The plain H2 variant without decoration, useful when you need a section
        header without the visual emphasis of the border.
      </Typo.P>

      <Typo.H3>Subsection</Typo.H3>
      <Typo.P color="support">
        Organizes content within sections. Job titles, project names, and feature
        headings typically use this level.
      </Typo.P>

      <Typo.H4>Detail Heading</Typo.H4>
      <Typo.P color="support">
        The smallest heading level for fine-grained content organization. Use for
        labels, card titles, or nested subsections.
      </Typo.P>
    </div>
  )
};

export const ColorHierarchy: StoryObj = {
  name: "Color Hierarchy (Prose)",
  render: () => (
    <div>
      <Typo.H3 color="main">Primary Content</Typo.H3>
      <Typo.P>
        Main color is used for primary content that demands the most attention. This
        includes body text, important headings, and key information that users need
        to read and understand.
      </Typo.P>

      <Typo.H3 color="support">Supporting Content</Typo.H3>
      <Typo.P color="support">
        Support color provides visual hierarchy for secondary information. Use it for
        descriptions, metadata, timestamps, and content that complements the primary
        text without competing for attention.
      </Typo.P>

      <Typo.H3 color="minor">Tertiary Content</Typo.H3>
      <Typo.P color="minor">
        Minor color is reserved for the least prominent text elements. Captions,
        disclaimers, and auxiliary information that users may not need to read in
        full benefit from this subtle treatment.
      </Typo.P>

      <Typo.H3 color="accent">Accent Highlights</Typo.H3>
      <Typo.P>
        Accent color draws attention to interactive elements, calls to action, and
        content that should stand out from the surrounding text. Use sparingly to
        maintain its visual impact.
      </Typo.P>

      <Typo.H3 color="accentAlt">Complementary Accent</Typo.H3>
      <Typo.P>
        The alternate accent provides a complementary color for situations where you
        need visual distinction from the primary accent while maintaining the same
        level of prominence.
      </Typo.P>
    </div>
  )
};

export const MixedContent: StoryObj = {
  name: "Mixed Content (Prose)",
  render: () => (
    <article>
      <Typo.H1>Nik Brunner</Typo.H1>
      <Typo.P color="support">
        Software Engineer based in Munich, Germany. Specializing in frontend
        development, design systems, and developer experience.
      </Typo.P>

      <Typo.H2>Current Role</Typo.H2>
      <Typo.H3>Software Engineer at DealerCenter Digital</Typo.H3>
      <Typo.P color="minor">2020 — Present · Munich, Germany</Typo.P>
      <Typo.P>
        Leading frontend development for the BikeCenter application, a comprehensive
        dealership management system built with React, TypeScript, and Electron.
        Responsible for architecture decisions, component library development, and
        mentoring junior developers.
      </Typo.P>
      <Typo.P>
        Currently spearheading a greenfield project migration from React Router to
        TanStack Router, implementing modern patterns for data fetching, form
        management, and type-safe routing.
      </Typo.P>

      <Typo.H2>Side Projects</Typo.H2>
      <Typo.H3>Black Atom Industries</Typo.H3>
      <Typo.P>
        A cohesive theme ecosystem spanning multiple tools and platforms. Includes
        colorschemes for Neovim, terminal emulators, and tmux, all generated from a
        unified core written in TypeScript and Deno.
      </Typo.P>

      <Typo.H4>Technical Details</Typo.H4>
      <Typo.P color="support">
        The theme generation system uses OKLCH color space for perceptually uniform
        color manipulation, ensuring consistent contrast ratios across light and dark
        variants.
      </Typo.P>
    </article>
  )
};

export const FlexWithResetMargins: StoryObj = {
  name: "Flex with resetChildMargins",
  render: () => (
    <div>
      <Typo.P color="support">
        When using Flex with resetChildMargins, child margins are reset to 0 and gap
        controls spacing instead. This is useful for layout components where you need
        precise control over spacing.
      </Typo.P>

      <Flex direction="column" gap="6" resetChildMargins>
        <section>
          <Typo.H2>Experience</Typo.H2>
          <Typo.P>
            Over five years of professional experience building scalable web
            applications, design systems, and developer tooling.
          </Typo.P>
        </section>

        <section>
          <Typo.H2>Projects</Typo.H2>
          <Typo.P>
            A curated selection of open source contributions and personal projects
            demonstrating expertise in frontend architecture.
          </Typo.P>
        </section>

        <section>
          <Typo.H2>About</Typo.H2>
          <Typo.P>
            Software engineer passionate about creating intuitive user interfaces and
            robust developer tools.
          </Typo.P>
        </section>
      </Flex>
    </div>
  )
};

export const HighlightUsage: StoryObj = {
  name: "Highlight",
  render: () => (
    <div>
      <Typo.P>
        The <Typo.Highlight>Typo.Highlight</Typo.Highlight> component is used for
        inline emphasis with the alternate accent color. It renders a{" "}
        <Typo.Highlight color="accent">bold span</Typo.Highlight> that stands out
        from surrounding text.
      </Typo.P>

      <Typo.P color="support">
        Use it sparingly in prose to draw attention to{" "}
        <Typo.Highlight>key terms</Typo.Highlight> or{" "}
        <Typo.Highlight>important concepts</Typo.Highlight>.
      </Typo.P>
    </div>
  )
};

export const LeadText: StoryObj = {
  name: "Lead",
  render: () => (
    <div>
      <Typo.H2>Introduction Section</Typo.H2>
      <Typo.Lead>
        This is lead text, used for introductory paragraphs that need to stand out
        from regular body copy. It has a larger font size and bolder weight.
      </Typo.Lead>
      <Typo.P>
        Regular paragraph text follows the lead. Notice the visual hierarchy created
        by the size and weight difference between lead and body text.
      </Typo.P>
    </div>
  )
};

export const SmallText: StoryObj = {
  name: "Small",
  render: () => (
    <div>
      <Typo.H3>Form Field</Typo.H3>
      <Typo.P>Enter your email address</Typo.P>
      <Typo.Small>We will never share your email with anyone else.</Typo.Small>

      <Typo.H3>Article Footer</Typo.H3>
      <Typo.Small color="minor">
        Published on January 2, 2026 · 5 min read
      </Typo.Small>
    </div>
  )
};

export const InlineCodeUsage: StoryObj = {
  name: "InlineCode",
  render: () => (
    <div>
      <Typo.P>
        Use <Typo.InlineCode>npm install</Typo.InlineCode> to install dependencies.
        The <Typo.InlineCode>package.json</Typo.InlineCode> file contains all project
        metadata.
      </Typo.P>

      <Typo.P color="support">
        Run <Typo.InlineCode>npm run dev</Typo.InlineCode> to start the development
        server on <Typo.InlineCode>localhost:3000</Typo.InlineCode>.
      </Typo.P>
    </div>
  )
};

export const BlockquoteUsage: StoryObj = {
  name: "Blockquote",
  render: () => (
    <div>
      <Typo.P>Here is an inspiring quote:</Typo.P>
      <Typo.Blockquote>
        The best way to predict the future is to invent it.
      </Typo.Blockquote>
      <Typo.Small color="minor">— Alan Kay</Typo.Small>

      <Typo.P>Another example with accent color:</Typo.P>
      <Typo.Blockquote color="accent">
        Code is like humor. When you have to explain it, it is bad.
      </Typo.Blockquote>
    </div>
  )
};

export const ListsUsage: StoryObj = {
  name: "Lists",
  render: () => (
    <div>
      <Typo.H3>Technologies Used</Typo.H3>
      <Typo.UnorderedList>
        <li>React 19 with Server Components</li>
        <li>TypeScript for type safety</li>
        <li>TanStack Router for file-based routing</li>
        <li>CSS Modules with Open Props</li>
      </Typo.UnorderedList>

      <Typo.H3>Getting Started</Typo.H3>
      <Typo.OrderedList>
        <li>Clone the repository</li>
        <li>Install dependencies with npm install</li>
        <li>Run npm run dev to start development</li>
        <li>Open localhost:3000 in your browser</li>
      </Typo.OrderedList>

      <Typo.H3>Minor Color Lists</Typo.H3>
      <Typo.UnorderedList color="minor">
        <li>Secondary information</li>
        <li>Less important details</li>
        <li>Supporting content</li>
      </Typo.UnorderedList>
    </div>
  )
};

export const FullArticleWithNewComponents: StoryObj = {
  name: "Full Article (All Components)",
  render: () => (
    <article>
      <Typo.H1>Getting Started with TanStack Router</Typo.H1>
      <Typo.Lead>
        A comprehensive guide to building type-safe, file-based routing in React
        applications using TanStack Router.
      </Typo.Lead>

      <Typo.H2>Introduction</Typo.H2>
      <Typo.P>
        TanStack Router is a fully type-safe router for React applications. It
        provides excellent developer experience with features like automatic code
        splitting and search param validation.
      </Typo.P>

      <Typo.Blockquote>
        Type safety is not just about catching bugs early—it is about enabling
        fearless refactoring and better tooling support.
      </Typo.Blockquote>

      <Typo.H2>Installation</Typo.H2>
      <Typo.P>
        First, install the package using <Typo.InlineCode>npm</Typo.InlineCode>:
      </Typo.P>
      <Typo.P>
        Run <Typo.InlineCode>npm install @tanstack/react-router</Typo.InlineCode> in
        your project directory.
      </Typo.P>

      <Typo.H3>Prerequisites</Typo.H3>
      <Typo.UnorderedList>
        <li>Node.js 18 or higher</li>
        <li>React 18 or higher</li>
        <li>TypeScript 5.0+ recommended</li>
      </Typo.UnorderedList>

      <Typo.H3>Setup Steps</Typo.H3>
      <Typo.OrderedList>
        <li>Install the router package</li>
        <li>Configure the router in your app entry point</li>
        <li>Create your first route file</li>
        <li>Add navigation components</li>
      </Typo.OrderedList>

      <Typo.H2>Best Practices</Typo.H2>
      <Typo.P>
        When building with TanStack Router, keep these{" "}
        <Typo.Highlight>key principles</Typo.Highlight> in mind.
      </Typo.P>

      <Typo.Small color="minor">
        Last updated: January 2, 2026 · Reading time: 8 minutes
      </Typo.Small>
    </article>
  )
};

export const PrintVariant: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          "The print variant uses absolute units (pt, mm) optimized for A4 paper output. Used for CVs, cover letters, and other print-friendly documents."
      }
    }
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: "21cm", padding: "1.5cm", background: "white" }}>
        <Story />
      </div>
    )
  ],
  render: () => (
    <article>
      <Typo.H1 variant="print">Cover Letter</Typo.H1>
      <Typo.Lead variant="print">
        Application for Senior Frontend Engineer position
      </Typo.Lead>

      <Typo.H2 variant="print" decorated={false}>
        Introduction
      </Typo.H2>
      <Typo.P variant="print">
        I am writing to express my strong interest in the Senior Frontend Engineer
        position. With over four years of professional experience building complex
        web applications using React, TypeScript, and modern frontend tooling, I am
        confident in my ability to contribute meaningfully to your team.
      </Typo.P>

      <Typo.H3 variant="print">Key Qualifications</Typo.H3>
      <Typo.UnorderedList variant="print">
        <li>Building and maintaining large-scale React applications</li>
        <li>Implementing custom design systems and component libraries</li>
        <li>Migrating legacy codebases to modern frameworks</li>
        <li>Working effectively in cross-functional teams</li>
      </Typo.UnorderedList>

      <Typo.H3 variant="print">Experience Highlights</Typo.H3>
      <Typo.OrderedList variant="print">
        <li>Led frontend development for enterprise applications</li>
        <li>Designed and implemented component architecture</li>
        <li>Mentored junior developers on best practices</li>
      </Typo.OrderedList>

      <Typo.Blockquote variant="print">
        I believe in writing clean, maintainable code that prioritizes user
        experience and developer ergonomics.
      </Typo.Blockquote>

      <Typo.H4 variant="print">Technical Details</Typo.H4>
      <Typo.P variant="print">
        My experience includes working with modern tooling like TanStack Router,
        Vite, and various testing frameworks. I have a strong focus on type safety
        and performance optimization.
      </Typo.P>

      <Typo.Small variant="print">
        Available for immediate start · References available upon request
      </Typo.Small>
    </article>
  )
};

export const PrintVsDefault: StoryObj = {
  name: "Print vs Default Comparison",
  render: () => (
    <Flex gap="8">
      <div style={{ flex: 1 }}>
        <Typo.H3>Default Variant</Typo.H3>
        <Typo.P>
          This paragraph uses the default responsive sizing with fluid typography
          that scales based on viewport width.
        </Typo.P>
        <Typo.UnorderedList>
          <li>Fluid font sizes</li>
          <li>Responsive spacing</li>
          <li>Screen-optimized</li>
        </Typo.UnorderedList>
      </div>
      <div style={{ flex: 1, background: "#f5f5f5", padding: "var(--size-4)" }}>
        <Typo.H3 variant="print">Print Variant</Typo.H3>
        <Typo.P variant="print">
          This paragraph uses fixed point sizes optimized for A4 paper printing with
          consistent spacing.
        </Typo.P>
        <Typo.UnorderedList variant="print">
          <li>Fixed point sizes</li>
          <li>Millimeter spacing</li>
          <li>Print-optimized</li>
        </Typo.UnorderedList>
      </div>
    </Flex>
  )
};
