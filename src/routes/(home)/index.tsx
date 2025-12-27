import { createFileRoute } from "@tanstack/react-router";

import Highlight from "@/components/Highlight";
import Job from "@/components/Job";
import Link from "@/components/Link";
import LookingForJob from "@/components/LookingForJob";
import ProfilePicture from "@/components/ProfilePicture";
import Project from "@/components/Project";
import Section from "@/components/Section";
import SpecCard from "@/components/SpecCard";
import SpecList from "@/components/SpecList";
import { tech } from "@/config";
import { Trans } from "@/i18n/Trans";
import { useTexts } from "@/i18n/useTexts";

export const Route = createFileRoute("/(home)/")({
  component: Page
});

function Page() {
  const t = useTexts();
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="Index">
      <Section className="Index__section--profile">
        <ProfilePicture />
      </Section>

      <Section className="Index__section--connect">
        <SpecCard title={t.connect.title}>
          <SpecList
            padding="small"
            items={[
              {
                label: t.connect.github,
                value: (
                  <Link
                    href="https://www.github.com/nikbrunner"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/nikbrunner
                  </Link>
                )
              },
              {
                label: t.connect.linkedin,
                value: (
                  <Link
                    href="https://www.linkedin.com/in/nbru/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/nbru/
                  </Link>
                )
              },
              {
                label: t.connect.cv,
                value: (
                  <Link to="/cv" download>
                    {t.connect.visitCvPage}
                  </Link>
                )
              },
              {
                label: t.connect.email,
                value: <Link href="mailto:nik@nbr.haus">nik@nbr.haus</Link>
              },
              {
                label: t.connect.languages,
                value: t.connect.languagesList
              }
            ]}
          />
        </SpecCard>
      </Section>

      <Section title={t.shared.sections.about} className="Index__section--about">
        <div className="flex flex-col gap-fluid-4">
          <div>
            <p>
              {t.about.greeting}
              <br />
              <br />
              <Trans
                text={t.about.intro.replace("{years}", String(experienceInYears))}
                components={{
                  highlight: children => <Highlight>{children}</Highlight>
                }}
              />
            </p>
            <p>{t.about.ux}</p>
            <p>{t.about.independence}</p>
            <p>{t.about.passion}</p>
            <p>{t.about.personal}</p>
          </div>

          <div>
            <SpecCard title={t.about.devStack.devTools}>
              <SpecList
                items={[
                  {
                    label: t.about.devStack.editor,
                    value: (
                      <Link
                        href="https://github.com/nikbrunner/dots/tree/main/common/.config/nvim"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Neovim
                      </Link>
                    )
                  },
                  {
                    label: t.about.devStack.terminal,
                    value: (
                      <>
                        <Link
                          href="https://ghostty.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ghostty
                        </Link>{" "}
                        &amp;{" "}
                        <Link
                          href="https://github.com/tmux/tmux/wiki"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Tmux
                        </Link>
                      </>
                    )
                  },
                  {
                    label: t.about.devStack.git,
                    value: (
                      <Link
                        href="https://github.com/jesseduffield/lazygit"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LazyGit
                      </Link>
                    )
                  },
                  {
                    label: t.about.devStack.secrets,
                    value: (
                      <Link
                        href="https://1password.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        1Password
                      </Link>
                    )
                  },
                  {
                    label: t.about.devStack.aiAssistant,
                    value: (
                      <Link
                        href="https://claude.com/product/claude-code"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Claude Code
                      </Link>
                    )
                  }
                ]}
                padding="small"
                gridTemplateColumns="0.75fr 1fr"
              />
              <p
                style={{
                  padding: "var(--size-2)",
                  backgroundColor: "var(--bg-main)",
                  margin: 0
                }}
              >
                <Trans
                  text={t.about.devStack.workflowInfo}
                  components={{
                    link: children => (
                      <Link
                        href="https://github.com/nikbrunner/dots"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </Link>
                    )
                  }}
                />
              </p>
            </SpecCard>
          </div>

          <div>
            <h3>{t.about.devStack.ai}</h3>
            <p>{t.about.devStack.aiIntro}</p>
            <p>{t.about.devStack.aiLearning}</p>
            <p>
              <Trans
                text={t.about.devStack.aiLimitsInfo}
                components={{
                  highlight: children => <Highlight>{children}</Highlight>
                }}
              />
            </p>
            <p className="mb-6">
              <Trans
                text={t.about.devStack.aiUsage}
                components={{
                  link: children => (
                    <Link
                      href="https://claude.com/product/claude-code"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </Link>
                  )
                }}
              />
            </p>

            <SpecCard
              title={t.about.devStack.mcps}
              description={
                <>
                  <p>{t.about.devStack.mcpsIntro}</p>
                  <p>{t.about.devStack.mcpsUsed}</p>
                </>
              }
            >
              <SpecList
                padding="small"
                gridTemplateColumns="0.75fr 1fr"
                items={[
                  {
                    label: t.about.devStack.docLookup,
                    value: (
                      <Link
                        href="https://ref.tools/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ref.tools
                      </Link>
                    )
                  },
                  {
                    label: t.about.devStack.webSearch,
                    value: (
                      <Link
                        href="https://exa.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Exa
                      </Link>
                    )
                  },
                  {
                    label: t.about.devStack.browser,
                    value: (
                      <Link
                        href="https://github.com/nicholasoxford/chrome-devtools-mcp/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Chrome DevTools
                      </Link>
                    )
                  }
                ]}
              />
            </SpecCard>
          </div>
        </div>
      </Section>

      <Section
        title={t.shared.sections.employment}
        className="Index__section--employment"
      >
        <LookingForJob title={t.jobs.lookingForJob.title} />

        <Job
          company={t.jobs.dealerCenter.company}
          position={t.jobs.dealerCenter.position}
          period={t.jobs.dealerCenter.period}
          tech={[
            tech.react,
            tech.typescript,
            tech.scss,
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
          {t.jobs.dealerCenter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Job>

        <Job
          company={t.jobs.divaE.company}
          position={t.jobs.divaE.position}
          period={t.jobs.divaE.period}
          tech={[tech.react, tech.typescript, tech.scss, tech.nodejs]}
        >
          <p>{t.jobs.divaE.description}</p>
        </Job>

        <Job
          company={t.jobs.campudus.company}
          position={t.jobs.campudus.position}
          period={t.jobs.campudus.period}
          tech={[tech.react, tech.nodejs]}
        >
          <p>{t.jobs.campudus.description}</p>
        </Job>
      </Section>

      <Section
        title={t.shared.sections.projects}
        className="Index__section--projects"
      >
        <p style={{ color: "var(--fg-support)" }}>{t.projects.intro}</p>

        <div className="flex flex-col" style={{ gap: "var(--size-10)" }}>
          <Project
            title={t.projects.blackAtom.title}
            stack={[tech.typescript, tech.deno, tech.oklch]}
            topics={[
              "Theming Systems",
              "Adapter Pattern",
              "Color Theory",
              "Cross-Platform Design",
              "Template Systems"
            ]}
            status="Active"
            platforms={["Neovim", "Zed", "Ghostty", "WezTerm", "Tmux"]}
            metrics={[{ label: "Themes", value: "27+" }]}
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
            {t.projects.blackAtom.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Project>

          <Project
            title={t.projects.awdcs.title}
            stack={[tech.markdown]}
            topics={["Modal Editing", "Workflow Design", "Developer Experience"]}
            status="Active"
            primaryLink={{
              url: "https://github.com/nikbrunner/awdcs",
              type: "GitHub"
            }}
          >
            {t.projects.awdcs.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Project>

          <Project
            title={t.projects.koyo.title}
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
            {t.projects.koyo.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Project>

          <Project
            title={t.projects.nbrNvim.title}
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
            {t.projects.nbrNvim.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Project>
        </div>
      </Section>
    </div>
  );
}
