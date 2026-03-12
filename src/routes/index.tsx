import { createFileRoute } from "@tanstack/react-router";

import Button from "@/components/Button";
import CopyButton from "@/components/CopyButton";
import Flex from "@/components/Flex";
import Hint from "@/components/Hint";
import Job from "@/components/Job";
import LookingForJob from "@/components/LookingForJob";
import Note from "@/components/Note";
import ProfilePicture from "@/components/ProfilePicture";
import Project from "@/components/Project";
import Section from "@/components/Section";
import SpecCard from "@/components/SpecCard";
import SpecList from "@/components/SpecList";
import { Typo } from "@/components/Typo";
import { tech } from "@/config";

export const Route = createFileRoute("/")({
  component: Page
});

function Page() {
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="IndexPage">
      {/* Column 1: Profile, Connect, About */}
      <div className="IndexPage__column IndexPage__column--left">
        <Section className="IndexPage__section--profile">
          <ProfilePicture />
        </Section>

        <Section id="connect" className="IndexPage__section--connect">
          <SpecCard title="Connect">
            <SpecList
              padding="small"
              items={[
                {
                  label: "Languages:",
                  value: (
                    <Flex gap="2" align="center" inline>
                      <Button variant="accent">English (Fluent)</Button>
                      <Button variant="default">German (Native)</Button>
                    </Flex>
                  )
                },
                {
                  label: "Email:",
                  value: (
                    <Flex gap="2" align="center" inline>
                      <a href="mailto:nik@nbr.haus">nik@nbr.haus</a>
                      <Hint title="Copy email">
                        <CopyButton value="nik@nbr.haus" ariaLabel="Copy email" />
                      </Hint>
                    </Flex>
                  )
                },
                {
                  label: "CV:",
                  value: (
                    <a href="/Nikolaus_Brunner_CV_en.pdf" download>
                      Download
                    </a>
                  )
                },
                {
                  label: "GitHub:",
                  value: (
                    <a
                      href="https://www.github.com/nikbrunner"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/nikbrunner
                    </a>
                  )
                },
                {
                  label: "LinkedIn:",
                  value: (
                    <a
                      href="https://www.linkedin.com/in/nbru/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/nbru/
                    </a>
                  )
                },
                {
                  label: "Instagram:",
                  value: (
                    <a
                      href="https://www.instagram.com/nikolaus.brunner"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      nikolaus.brunner
                    </a>
                  )
                }
              ]}
            />
          </SpecCard>
        </Section>

        <Section title="About" className="IndexPage__section--about">
          <Flex direction="column" gap="fluid-4">
            <div>
              <Typo.Lead>
                Hi there!
                <br />
                <br />
                I'm <Typo.Highlight>Nikolaus Brunner</Typo.Highlight> (Nik for
                short), a Software Engineer based in Landshut, Germany, specializing
                in frontend architectures and design systems for {experienceInYears}{" "}
                years now.
              </Typo.Lead>
              <Typo.P>
                I have a strong sense for <strong>UX</strong> (user experience) and{" "}
                <strong>DX</strong> (developer experience). I love collaborating with
                designers or making design decisions independently.
              </Typo.P>
              <Typo.P>
                I naturally identify priorities and manage my own work, but I also
                know when to reach out for input. Being part of a good team working
                towards a shared goal is what I enjoy most.
              </Typo.P>
              <Typo.P>
                I <strong>genuinely love</strong> building and using products. I'm
                probably the guy who contacts support about features or bugs, and
                regularly checks changelogs and GitHub releases.
              </Typo.P>
              <Typo.P>
                I was born in 1984, and outside of code I enjoy hiking, running,
                bouldering, cooking, reading, and photography. I also have a strong
                interest in design in all its forms, like architecture, art and
                typography... Plus I have a slight{" "}
                <strong>keyboard obsession</strong>.
              </Typo.P>
              <Note>
                I know that every sentence above (and this one) started with "I", but
                it felt absolutely awkward trying to speak about myself without using
                "I". :)
              </Note>
            </div>

            <div>
              <SpecCard title="Dev Tools">
                <SpecList
                  items={[
                    {
                      label: "Editor:",
                      value: (
                        <a
                          href="https://github.com/nikbrunner/dots/tree/main/common/.config/nvim"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Neovim
                        </a>
                      )
                    },
                    {
                      label: "Terminal:",
                      value: (
                        <>
                          <a
                            href="https://ghostty.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ghostty
                          </a>{" "}
                          &amp;{" "}
                          <a
                            href="https://github.com/tmux/tmux/wiki"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Tmux
                          </a>
                        </>
                      )
                    },
                    {
                      label: "Git:",
                      value: (
                        <a
                          href="https://github.com/jesseduffield/lazygit"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LazyGit
                        </a>
                      )
                    },
                    {
                      label: "Secrets:",
                      value: (
                        <a
                          href="https://1password.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          1Password
                        </a>
                      )
                    },
                    {
                      label: "LLM assistant:",
                      value: (
                        <a
                          href="https://claude.com/product/claude-code"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Claude Code
                        </a>
                      )
                    }
                  ]}
                  padding="small"
                  gridTemplateColumns="0.75fr 1fr"
                />
                <Typo.P
                  style={{
                    padding: "var(--size-2)",
                    backgroundColor: "var(--color-bg-main)",
                    margin: 0
                  }}
                >
                  I am very passionate about workflow. You can check my{" "}
                  <a
                    href="https://github.com/nikbrunner/dots"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    dotfiles here
                  </a>
                  .
                </Typo.P>
              </SpecCard>
            </div>

            <div>
              <Typo.H3>LLMs</Typo.H3>
              <Typo.P>
                I entered the industry <strong>before LLMs</strong> became a thing. I
                climbed that hill without ChatGPT or tab completion.
              </Typo.P>
              <Typo.P>
                That foundation was invaluable, and still is. For juniors I think
                LLMs shine as a teacher and reading partner, but not as a writing
                partner during the early phases. I think it's important to learn to
                solve problems yourself and to also write down the solutions... or
                the attempts.
              </Typo.P>
              <Typo.P>
                The technology is fascinating, and can be a real accelerator if used
                correctly, but it has real limits. Relying too heavily on it means
                actively unlearning skills and knowledge,{" "}
                <Typo.Highlight>
                  and maybe most importantly, losing the fun
                </Typo.Highlight>
                .
              </Typo.P>

              <Typo.P className="mb-6">
                That's why I'm very deliberate about how I use it. Because of the
                rapid development of the methods how to interact and steer the LLMs
                and make them more predictable and deterministic, everyday I learn
                and try out new approaches and tools.
                <br />
                <br />
                <strong>
                  In a way, the role of a developer is reinventing itself.
                </strong>
                <br />
                <br />I use{" "}
                <a
                  href="https://claude.com/product/claude-code"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Claude Code
                </a>{" "}
                as my primary LLM assistant. I don't jump from vendor to vendor each
                week, but rather try to learn to get the most out of what I'm given.
                I think that{" "}
                <a
                  href="https://www.anthropic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Anthropic
                </a>{" "}
                has built out the best integrations and DX for LLM assistance.
              </Typo.P>

              <SpecCard
                title="LLM Tools"
                description={
                  <>
                    <Typo.P>
                      I also use personal slash commands and various LLM tools where
                      applicable.
                    </Typo.P>
                    <Typo.P>
                      These are my most used tools for LLM-assisted development.
                    </Typo.P>
                  </>
                }
              >
                <SpecList
                  padding="small"
                  gridTemplateColumns="0.75fr 1fr"
                  items={[
                    {
                      label: "Documentation Lookup",
                      value: (
                        <a
                          href="https://ref.tools/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ref.tools
                        </a>
                      )
                    },
                    {
                      label: "Better Web Search",
                      value: (
                        <a
                          href="https://exa.ai"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Exa
                        </a>
                      )
                    },
                    {
                      label: "Browser",
                      value: (
                        <a
                          href="https://github.com/nicholasoxford/chrome-devtools-mcp/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Chrome DevTools
                        </a>
                      )
                    },
                    {
                      label: "Issue Tracking",
                      value: (
                        <a
                          href="https://github.com/steveyegge/beads"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Beads
                        </a>
                      )
                    }
                  ]}
                />
              </SpecCard>
            </div>
          </Flex>
        </Section>
      </div>

      {/* Column 2: Employment */}
      <div className="IndexPage__column IndexPage__column--employment">
        <Section title="Employment" className="IndexPage__section--employment">
          <LookingForJob
            className="mb-6"
            title={
              <>
                Looking for a <br />
                <Typo.Highlight>Senior Frontend role</Typo.Highlight>
              </>
            }
            cta="Write me!"
            email="nik@nbr.haus"
            copyEmailTooltip="Copy email"
          />

          <Job
            company="DealerCenter Digital"
            url="https://www.bike.center"
            position="Software Engineer / Frontend Lead"
            period="Sep 2020 – Jan 2026"
            tech={[
              tech.react,
              tech.typescript,
              tech.scss,
              tech.storybook,
              tech.tanstackStart,
              tech.tanstackRouter,
              tech.tanstackQuery,
              tech.tanstackForm,
              tech.redux,
              tech.graphql,
              tech.tailwind,
              tech.electron,
              tech.nodejs
            ]}
          >
            <Typo.P>
              I worked across the full spectrum of frontend development—from feature
              implementation and bug fixes to code reviews, mentoring, and cross-team
              coordination for a mature Electron application serving hundreds of bike
              retailers.
            </Typo.P>
            <Typo.P>
              A major focus was architectural migrations: I championed TanStack Query
              adoption and migrated the codebase from legacy Redux to Redux Toolkit.
              This included authoring comprehensive code guidelines and best
              practices documentation. I also completely rebuilt a Vendure storefront
              from Remix to TanStack Start/Router with TanStack Query, Form, GraphQL,
              ShadCN and Tailwind CSS.
            </Typo.P>
            <Typo.P>
              On the design system side, I created a comprehensive 10-variant color
              system with Figma integration, affecting 1.6k files across the
              codebase. BikeCenter's entire component library was built from scratch
              using React, TypeScript, and SCSS—no third-party UI frameworks.
            </Typo.P>
            <Typo.P>
              Improving internal APIs and establishing developer experience patterns
              across the team were another focus. As a trusted decision-maker for UX
              and technical feasibility, I bridged design and engineering,
              collaborating with designers as both implementer and advisor.
            </Typo.P>
            <Typo.P>
              Mentoring junior developers through pair programming and code reviews
              was another key part of the role. I established technical standards and
              conventions across the team, including translation guidelines, BEM
              naming, and TypeScript best practices, and served as a technical hub
              between management, backend, and frontend teams.
            </Typo.P>
          </Job>

          <Job
            company="diva-e"
            url="https://www.diva-e.com/de/"
            position="Junior Frontend Developer"
            period="Mar 2020 – Sep 2020"
            tech={[tech.react, tech.typescript, tech.scss, tech.nodejs]}
          >
            <Typo.P>
              Contributed to a major e-commerce platform and built an internal social
              platform using React, GraphQL (Apollo), and SCSS. When DealerCenter
              Digital offered a frontend position, I made the move — an opportunity
              better aligned with my goals.
            </Typo.P>
          </Job>

          <Job
            company="Campudus"
            url="https://www.campudus.com/"
            position="Intern"
            period="Dec 2019 – Feb 2020"
            tech={[tech.react, tech.nodejs]}
          >
            <Typo.P>
              I built a fullstack accessories ordering application from
              scratch—design, architecture, backend, and frontend—during a 3-month
              internship at DealerCenter Digital's sister company.
            </Typo.P>
          </Job>
        </Section>
      </div>

      {/* Column 3: Projects */}
      <div className="IndexPage__column IndexPage__column--projects">
        <Section title="Projects" className="IndexPage__section--projects">
          <Typo.P style={{ color: "var(--color-fg-support)" }}>
            Personal projects I actively maintain and evolve.
          </Typo.P>

          <Flex direction="column" gap="10">
            <Project
              title="Black Atom Industries"
              stack={[tech.typescript, tech.deno, tech.oklch]}
              topics={[
                "Theming Systems",
                "Adapter Pattern",
                "Color Theory",
                "Cross-Platform Design",
                "Template Systems"
              ]}
              status="Active"
              platforms={[
                "Neovim",
                "Ghostty",
                "Zed",
                "tmux",
                "WezTerm",
                "Niri",
                "Waybar"
              ]}
              metrics={[{ label: "Themes", value: "30+" }]}
              primaryLink={{
                url: "https://black-atom.industries",
                type: "Live Site"
              }}
              additionalLinks={[
                {
                  url: "https://github.com/black-atom-industries",
                  type: "GitHub"
                }
              ]}
            >
              <Typo.P>
                Open-source cross-platform theming system generating 30+ cohesive
                themes from a single source.
              </Typo.P>
              <Typo.P>
                Built with an adapter pattern for consistent theme generation from a
                central source using OKLCH color space.
              </Typo.P>
              <Typo.P>
                Maintained with focus on developer experience and cross-platform
                consistency.
              </Typo.P>
            </Project>

            <Project
              title="AWDCS"
              stack={[tech.markdown]}
              topics={["Modal Editing", "Workflow Design", "Developer Experience"]}
              status="Active"
              primaryLink={{
                url: "https://github.com/nikbrunner/awdcs",
                type: "GitHub"
              }}
            >
              <Typo.P>
                AWDCS (App, Workspace, Document, Change, Symbol): A scope-based
                keymap architecture for modal editors organizing bindings by
                operational context rather than tool-specific functions.
              </Typo.P>
              <Typo.P>
                Features systematic prefix patterns and semantic naming for
                consistent, memorable keybindings across workflows.
              </Typo.P>
            </Project>

            <Project
              title="kōyō"
              stack={[tech.qmk, tech.c, tech.bash]}
              topics={[
                "Keyboard Layouts",
                "QMK Firmware",
                "Ergonomics",
                "Workflow Design",
                "CLI Tools"
              ]}
              status="Active"
              primaryLink={{
                url: "https://github.com/nikbrunner/koyo",
                type: "GitHub"
              }}
            >
              <Typo.P>
                Custom QMK keyboard layout for 36-key split keyboards featuring
                vim-inspired navigation, smart layer design, and comprehensive CLI
                tooling for Moonlander and Corne keyboards.
              </Typo.P>
            </Project>

            <Project
              title="nbr.nvim"
              stack={[tech.lua, tech.neovim]}
              topics={[
                "Neovim Configuration",
                "Developer Tools",
                "Frontend Development",
                "Workflow Design",
                "AWDCS"
              ]}
              status="Active"
              primaryLink={{
                url: "https://github.com/nikbrunner/dots/tree/main/common/.config/nvim",
                type: "GitHub"
              }}
            >
              <Typo.P>
                Highly customized Neovim setup for frontend development featuring
                AWDCS-based keymaps, Lazy.nvim plugin management, and workflows
                tailored for React and TypeScript.
              </Typo.P>
            </Project>

            <Project
              title="nbr.haus"
              stack={[
                tech.typescript,
                tech.react,
                tech.tanstackStart,
                tech.storybook
              ]}
              topics={["SSR", "File-based Routing", "Theming", "BEM"]}
              status="Active"
              primaryLink={{
                url: "https://nbr.haus",
                type: "Live Site"
              }}
              additionalLinks={[
                {
                  url: "https://github.com/nikbrunner/nbr.haus",
                  type: "GitHub"
                }
              ]}
            >
              <Typo.P>
                Personal portfolio built with TanStack Start featuring SSR,
                file-based routing, and a custom theming system with hue selection
                and color modes.
              </Typo.P>
            </Project>
          </Flex>
        </Section>
      </div>
    </div>
  );
}
