import { createFileRoute } from "@tanstack/react-router";

import profilePicture from "@/assets/images/profile_picture.jpg";
import { CvHeader } from "@/components/cv/CvHeader";
import { CvInterests } from "@/components/cv/CvInterests";
import { CvJob } from "@/components/cv/CvJob";
import { CvPriorExperience } from "@/components/cv/CvPriorExperience";
import { CvProject } from "@/components/cv/CvProject";
import { CvSection } from "@/components/cv/CvSection";
import Flex from "@/components/Flex";
import Note from "@/components/Note";

export const Route = createFileRoute("/cv")({
  component: Page
});

function Page() {
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="PrintPage CvPage">
      <Note className="mb-8">
        <strong>This is my printable CV.</strong>
        <br />
        Use the browser's print function (Ctrl/Cmd + P) or{" "}
        <a href="/Nikolaus_Brunner_CV_en.pdf" download>
          download it here
        </a>
        .
      </Note>

      <CvHeader
        name="Nikolaus Brunner"
        tagline={`Software Engineer specializing in Frontend Development with ${experienceInYears} years of experience building modern web and desktop applications`}
        summary={`Specialized in design systems, frontend architecture, and large-scale migrations. Led technical decisions affecting thousands of files and mentored junior developers. Comfortable working independently while thriving in collaborative teams. Integrates AI tooling into daily development workflows.`}
        img={profilePicture}
        languages="German (Native) • English (Fluent)"
        contact={{
          location: "Landshut, Germany",
          website: "https://nbr.haus",
          email: "nik@nbr.haus",
          github: "github.com/nikbrunner",
          linkedin: "linkedin.com/in/nbru"
        }}
      />

      <CvSection id="work-experience" title="Work Experience">
        <Flex direction="column" gap="8">
          <CvJob
            company="ImFusion"
            url="https://www.imfusion.com"
            position="Senior Frontend Developer"
            period="Apr 2026 – Present"
            location="Munich, Germany"
            intro="Improving the usability, user experience, and design of existing applications while also creating new ones."
            technologies={["React", "CSS", "Tanstack Suite", "BaseUI", "Figma"]}
          />

          <CvJob
            company="DealerCenter Digital"
            url="https://www.bike.center"
            position="Software Engineer / Frontend Lead"
            period="Sep 2020 – Jan 2026"
            location="Landshut, Germany"
            intro="BikeCenter is an Electron-based point-of-sale application used by hundreds of bike retailers across Germany. Joined as a junior and grew into a frontend lead role, owning architecture decisions, managing frontend priorities, and mentoring newer team members."
            bullets={[
              "Led frontend architecture for BikeCenter (Electron/React application), building and maintaining its custom design system",
              "Led large-scale framework migrations affecting 1600+ files (Redux → TanStack Query, React Router → TanStack Start)",
              "Mentored junior developers and established & documented frontend coding standards",
              "Architected modern GraphQL-based Vendure storefront and coordinated between design and backend teams",
              "Implemented component testing with Jest and Storybook snapshots",
              "Integrated external services including analytics (Mixpanel), leasing calculators, and third-party product advisers"
            ]}
            technologies={[
              "React",
              "TypeScript",
              "SCSS",
              "Storybook",
              "TanStack Router",
              "TanStack Query",
              "TanStack Form",
              "Redux",
              "GraphQL",
              "Tailwind",
              "Electron",
              "Node.js"
            ]}
          />

          <CvJob
            className="print-break-before-page"
            company="diva-e"
            url="https://www.diva-e.com/de/"
            position="Junior Frontend Developer"
            period="Mar 2020 – Sep 2020"
            location="Munich, Germany"
            intro="Contributed to a major e-commerce platform and built an internal social platform using React, GraphQL (Apollo), and SCSS. Moved to DealerCenter Digital for an opportunity better aligned with personal goals."
            technologies={["React", "TypeScript", "SCSS", "Node.js"]}
          />

          <CvJob
            company="Campudus"
            url="https://www.campudus.com/"
            position="Intern"
            period="Dec 2019 – Feb 2020"
            location="Landshut, Germany"
            intro="Built a fullstack accessories ordering application from scratch — design, architecture, backend, and frontend — during a 3-month internship at DealerCenter Digital's sister company."
            technologies={["React", "Node.js"]}
          />
        </Flex>
      </CvSection>

      <CvSection id="side-projects" title="Side Projects">
        <CvProject
          title="Black Atom Industries"
          subtitle="Open Source Theming System • Creator & Maintainer"
          bullets={[
            "Created theming system supporting 30+ themes across 7 platforms (Neovim, Ghostty, Zed, tmux, WezTerm, Niri, Waybar)",
            "Built with TypeScript/Deno, featuring automated theme generation and distribution"
          ]}
        />
        <CvProject
          title="AWDCS"
          subtitle="Modal Editor Keymap Architecture"
          bullets={[
            "Designed scope-based keymap system (App, Workspace, Document, Change, Symbol) for modal editors",
            "Created systematic prefix patterns and semantic naming for consistent, memorable keybindings"
          ]}
        />
        <CvProject
          title="kōyō"
          subtitle="QMK Keyboard Layout & Firmware"
          bullets={[
            "Custom QMK layout for 36-key split keyboards (Moonlander, Corne) with vim-inspired navigation",
            "Built comprehensive CLI tooling for keyboard configuration and deployment"
          ]}
        />
      </CvSection>

      <CvSection id="prior-experience" title="Prior professional experience">
        <CvPriorExperience
          title="Event Technology & Audio Engineering (2011–2019)"
          description="Extensive background in event technology, professional sound engineering, and photography. Worked at five-star hotels and premium studios, developing strong problem-solving and client communication skills."
          educationLabel="Education"
          education="Sound Engineering & Mastering, Deutsche Pop Munich (2010–2011)"
        />
      </CvSection>

      <CvSection id="interests" title="Interests">
        <CvInterests interests="Hiking, Running, Bouldering, Cooking, Reading, Photography, All forms of Design" />
      </CvSection>
    </div>
  );
}
