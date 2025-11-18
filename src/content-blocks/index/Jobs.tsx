import Highlight from "../../components/Highlight";
import Job from "../../components/Job";

export default function Jobs() {
  return (
    <>
      <Job
        company="DealerCenter Digital"
        position="Software Engineer"
        period="2020–2026"
      >
        <p>
          Worked across the{" "}
          <Highlight>full spectrum of frontend development</Highlight>—from feature
          implementation and bug fixes to code reviews, mentoring, and cross-team
          coordination for a mature Electron application serving hundreds of bike
          retailers.
        </p>

        <p>
          Led <Highlight>major architectural migrations</Highlight> by championing{" "}
          <Highlight>TanStack Query adoption</Highlight> and migrating the codebase
          from <Highlight>legacy Redux to Redux Toolkit</Highlight>, authoring
          comprehensive code guidelines and best practices documentation. Completely
          rebuilt a Vendure storefront from Remix to{" "}
          <Highlight>TanStack Start/Router</Highlight> with TanStack Query, Form,
          GraphQL, ShadCN and Tailwind CSS.
        </p>

        <p>
          Designed and implemented a{" "}
          <Highlight>comprehensive 10-variant color system</Highlight> with{" "}
          <Highlight>Figma integration</Highlight>, affecting 1.6k files across the
          codebase. Built and maintained BikeCenter's{" "}
          <Highlight>entire component library from scratch</Highlight> using React,
          TypeScript, and SCSS—no third-party UI frameworks.
        </p>

        <p>
          Designed internal APIs for state management and GraphQL integration,
          establishing developer experience patterns across the team.{" "}
          <Highlight>Bridged design and engineering</Highlight> as a trusted
          decision-maker for UX and technical feasibility, collaborating with
          designers as both implementer and advisor.
        </p>

        <p>
          Mentored junior developers through pair programming and code reviews.
          Established <Highlight>technical standards and conventions</Highlight>{" "}
          across the team, including translation guidelines, BEM naming, and
          TypeScript best practices. Served as <Highlight>technical hub</Highlight>{" "}
          between management, backend, and frontend teams.
        </p>
      </Job>

      <Job company="diva-e" position="Junior Frontend Developer" period="2020">
        <p>
          Contributed to a major <Highlight>e-commerce platform</Highlight> at
          digital agency. Built an{" "}
          <Highlight>
            internal social platform using React, GraphQL (Apollo), and SCSS
          </Highlight>
          . Created onboarding documentation for the company's proprietary framework.
          Successfully navigated remote work transition during COVID-19 outbreak.
        </p>
      </Job>

      <Job company="Campudus" position="Intern" period="2019–2020">
        <p>
          Built a fullstack accessories ordering application from scratch (design,
          architecture, backend, frontend) during a 3-month internship at
          DealerCenter Digital's sister company.
        </p>
      </Job>
    </>
  );
}
