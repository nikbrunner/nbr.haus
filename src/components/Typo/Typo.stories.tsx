import type { Meta, StoryObj } from "@storybook/react";

import { Typo } from ".";

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
  name: "Article Layout",
  render: () => (
    <article
      style={{ display: "flex", flexDirection: "column", gap: "var(--size-4)" }}
    >
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

export const SectionHeaders: StoryObj = {
  name: "Section Headers",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--size-6)" }}>
      <section>
        <Typo.H2>Experience</Typo.H2>
        <Typo.P>
          Over five years of professional experience building scalable web
          applications, design systems, and developer tooling for companies ranging
          from startups to enterprise organizations.
        </Typo.P>
      </section>

      <section>
        <Typo.H2>Projects</Typo.H2>
        <Typo.P>
          A curated selection of open source contributions and personal projects that
          demonstrate expertise in frontend architecture, performance optimization,
          and developer experience.
        </Typo.P>
      </section>

      <section>
        <Typo.H2>About</Typo.H2>
        <Typo.P>
          Software engineer passionate about creating intuitive user interfaces and
          robust developer tools. Currently focused on TypeScript, React, and the
          evolving ecosystem of modern web technologies.
        </Typo.P>
      </section>
    </div>
  )
};

export const ColorHierarchy: StoryObj = {
  name: "Color Hierarchy",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--size-4)" }}>
      <div>
        <Typo.H3 color="main">Primary Content</Typo.H3>
        <Typo.P>
          Main color is used for primary content that demands the most attention.
          This includes body text, important headings, and key information that users
          need to read and understand.
        </Typo.P>
      </div>

      <div>
        <Typo.H3 color="support">Supporting Content</Typo.H3>
        <Typo.P color="support">
          Support color provides visual hierarchy for secondary information. Use it
          for descriptions, metadata, timestamps, and content that complements the
          primary text without competing for attention.
        </Typo.P>
      </div>

      <div>
        <Typo.H3 color="minor">Tertiary Content</Typo.H3>
        <Typo.P color="minor">
          Minor color is reserved for the least prominent text elements. Captions,
          disclaimers, and auxiliary information that users may not need to read in
          full benefit from this subtle treatment.
        </Typo.P>
      </div>

      <div>
        <Typo.H3 color="accent">Accent Highlights</Typo.H3>
        <Typo.P>
          Accent color draws attention to interactive elements, calls to action, and
          content that should stand out from the surrounding text. Use sparingly to
          maintain its visual impact.
        </Typo.P>
      </div>

      <div>
        <Typo.H3 color="accentAlt">Complementary Accent</Typo.H3>
        <Typo.P>
          The alternate accent provides a complementary color for situations where
          you need visual distinction from the primary accent while maintaining the
          same level of prominence.
        </Typo.P>
      </div>
    </div>
  )
};

export const HeadingScale: StoryObj = {
  name: "Heading Scale",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--size-4)" }}>
      <Typo.H1>Page Title — H1</Typo.H1>
      <Typo.P color="support">
        Reserved for the main page title. There should only be one H1 per page for
        accessibility and SEO purposes.
      </Typo.P>

      <Typo.H2>Section Header — H2</Typo.H2>
      <Typo.P color="support">
        Used to divide the page into major sections. The decorated variant adds
        visual distinction with an underline and uppercase treatment.
      </Typo.P>

      <Typo.H2 variant="default" color="main">
        Plain Section Header — H2
      </Typo.H2>
      <Typo.P color="support">
        The plain H2 variant without decoration, useful when you need a section
        header without the visual emphasis of the border.
      </Typo.P>

      <Typo.H3>Subsection — H3</Typo.H3>
      <Typo.P color="support">
        Organizes content within sections. Job titles, project names, and feature
        headings typically use this level.
      </Typo.P>

      <Typo.H4>Detail Heading — H4</Typo.H4>
      <Typo.P color="support">
        The smallest heading level for fine-grained content organization. Use for
        labels, card titles, or nested subsections.
      </Typo.P>
    </div>
  )
};

export const MixedContent: StoryObj = {
  name: "Mixed Content",
  render: () => (
    <article
      style={{ display: "flex", flexDirection: "column", gap: "var(--size-4)" }}
    >
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
