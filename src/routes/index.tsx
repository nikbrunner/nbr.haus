import { createFileRoute } from "@tanstack/react-router";

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
import { tech } from "@/config";
import { Trans } from "@/i18n/Trans";
import { useLocale } from "@/i18n/useLocale";
import { useTexts } from "@/i18n/useTexts";

export const Route = createFileRoute("/")({
  component: Page
});

function Page() {
  const t = useTexts();
  const { locale } = useLocale();
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="IndexPage">
      {/* Column 1: Profile, Connect, About */}
      <div className="IndexPage__column IndexPage__column--left">
        <Section className="IndexPage__section--profile">
          <ProfilePicture />
        </Section>

        <Section id="connect" className="IndexPage__section--connect">
          <SpecCard title={t.connect.title}>
            <SpecList
              padding="small"
              items={[
                {
                  label: t.connect.languages,
                  value: t.connect.languagesList
                },
                {
                  label: t.connect.email,
                  value: (
                    <Flex gap="2" align="center" inline>
                      <a href="mailto:nik@nbr.haus">nik@nbr.haus</a>
                      <Hint title={t.connect.copyEmailTooltip}>
                        <CopyButton
                          value="nik@nbr.haus"
                          ariaLabel={t.connect.copyEmailTooltip}
                        />
                      </Hint>
                    </Flex>
                  )
                },
                {
                  label: t.connect.cv,
                  value: (
                    <a href={`/Nikolaus_Brunner_CV_${locale}.pdf`} download>
                      {t.connect.downloadCv}
                    </a>
                  )
                },
                {
                  label: t.connect.github,
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
                  label: t.connect.linkedin,
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
                  label: t.connect.instagram,
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

        <Section
          title={t.shared.sections.about}
          className="IndexPage__section--about"
        >
          <Flex direction="column" gap="fluid-4">
            <div>
              <p>
                {t.about.greeting}
                <br />
                <br />
                <Trans>
                  {t.about.intro.replace("{years}", String(experienceInYears))}
                </Trans>
              </p>
              <p>
                <Trans>{t.about.ux}</Trans>
              </p>
              <p>{t.about.independence}</p>
              <p>
                <Trans>{t.about.passion}</Trans>
              </p>
              <p>
                <Trans>{t.about.personal}</Trans>
              </p>
              <Note>{t.about.iAnecdote}</Note>
            </div>

            <div>
              <SpecCard title={t.about.devStack.devTools}>
                <SpecList
                  items={[
                    {
                      label: t.about.devStack.editor,
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
                      label: t.about.devStack.terminal,
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
                      label: t.about.devStack.git,
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
                      label: t.about.devStack.secrets,
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
                      label: t.about.devStack.aiAssistant,
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
                <p
                  style={{
                    padding: "var(--size-2)",
                    backgroundColor: "var(--color-bg-main)",
                    margin: 0
                  }}
                >
                  <Trans
                    components={{
                      link: children => (
                        <a
                          href="https://github.com/nikbrunner/dots"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      )
                    }}
                  >
                    {t.about.devStack.workflowInfo}
                  </Trans>
                </p>
              </SpecCard>
            </div>

            <div>
              <h3>{t.about.devStack.ai}</h3>
              <p>
                <Trans>{t.about.devStack.aiIntro}</Trans>
              </p>
              <p>{t.about.devStack.aiLearning}</p>
              <p>
                <Trans>{t.about.devStack.aiLimitsInfo}</Trans>
              </p>
              <p className="mb-6">
                <Trans
                  components={{
                    link: children => (
                      <a
                        href="https://claude.com/product/claude-code"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    )
                  }}
                >
                  {t.about.devStack.aiUsage}
                </Trans>
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
                      label: t.about.devStack.webSearch,
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
                      label: t.about.devStack.browser,
                      value: (
                        <a
                          href="https://github.com/nicholasoxford/chrome-devtools-mcp/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Chrome DevTools
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
        <Section
          title={t.shared.sections.employment}
          className="IndexPage__section--employment"
        >
          <LookingForJob
            className="mb-6"
            title={t.jobs.lookingForJob.title}
            cta={t.jobs.lookingForJob.cta}
            email="nik@nbr.haus"
            copyEmailTooltip={t.jobs.lookingForJob.copyEmailTooltip}
          />

          <Job
            company={t.jobs.dealerCenter.company}
            position={t.jobs.dealerCenter.position}
            period={t.jobs.dealerCenter.period}
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
      </div>

      {/* Column 3: Projects */}
      <div className="IndexPage__column IndexPage__column--projects">
        <Section
          title={t.shared.sections.projects}
          className="IndexPage__section--projects"
        >
          <p style={{ color: "var(--color-fg-support)" }}>{t.projects.intro}</p>

          <Flex direction="column" gap="10">
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

            <Project
              title={t.projects.nbrHaus.title}
              stack={[
                tech.typescript,
                tech.react,
                tech.tanstackStart,
                tech.storybook
              ]}
              topics={["SSR", "File-based Routing", "Theming", "i18n", "BEM"]}
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
              {t.projects.nbrHaus.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Project>
          </Flex>
        </Section>
      </div>
    </div>
  );
}
