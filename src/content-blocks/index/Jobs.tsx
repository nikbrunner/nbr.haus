import Highlight from "../../components/Highlight";
import Job from "../../components/Job";

export default function Jobs() {
  return (
    <>
      <Job
        company="DealerCenter Digital"
        position="Software Engineer / Frontend Lead"
        period="2020–2026"
      >
        <p>
          I worked across the{" "}
          <Highlight>full spectrum of frontend development</Highlight>—from feature
          implementation and bug fixes to code reviews, mentoring, and cross-team
          coordination for a mature Electron application serving hundreds of bike
          retailers.
        </p>
        <p>
          A major focus was <Highlight>architectural migrations</Highlight>: I
          championed <Highlight>TanStack Query adoption</Highlight> and migrated the
          codebase from <Highlight>legacy Redux to Redux Toolkit</Highlight>. This
          included authoring comprehensive code guidelines and best practices
          documentation. I also completely rebuilt a Vendure storefront from Remix to{" "}
          <Highlight>TanStack Start/Router</Highlight> with TanStack Query, Form,
          GraphQL, ShadCN and Tailwind CSS.
        </p>
        <p>
          On the design system side, I created a{" "}
          <Highlight>comprehensive 10-variant color system</Highlight> with{" "}
          <Highlight>Figma integration</Highlight>, affecting 1.6k files across the
          codebase. BikeCenter's{" "}
          <Highlight>entire component library was built from scratch</Highlight>{" "}
          using React, TypeScript, and SCSS—no third-party UI frameworks.
        </p>
        <p>
          I also shaped internal APIs for state management and GraphQL integration,
          establishing developer experience patterns across the team. As a trusted
          decision-maker for UX and technical feasibility, I{" "}
          <Highlight>bridged design and engineering</Highlight>, collaborating with
          designers as both implementer and advisor.
        </p>
        <p>
          Mentoring junior developers through pair programming and code reviews was
          another key part of the role. I established{" "}
          <Highlight>technical standards and conventions</Highlight> across the team,
          including translation guidelines, BEM naming, and TypeScript best
          practices, and served as a <Highlight>technical hub</Highlight> between
          management, backend, and frontend teams.
        </p>
      </Job>

      <Job company="diva-e" position="Junior Frontend Developer" period="2020">
        <p>
          I contributed to a major <Highlight>e-commerce platform</Highlight> at a
          digital agency, and built an{" "}
          <Highlight>
            internal social platform using React, GraphQL (Apollo), and SCSS
          </Highlight>
          . I also created onboarding documentation for the company's proprietary
          framework. This role started right as COVID-19 hit, so I successfully
          navigated the transition to fully remote work.
        </p>
      </Job>

      <Job company="Campudus" position="Intern" period="2019–2020">
        <p>
          I built a fullstack accessories ordering application from scratch—design,
          architecture, backend, and frontend—during a 3-month internship at
          DealerCenter Digital's sister company.
        </p>
      </Job>
    </>
  );
}
