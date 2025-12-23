import Highlight from "@/components/Highlight";
import { useTexts, Trans } from "@/i18n";
import SpecCard from "@/components/SpecCard";
import SpecList from "@/components/SpecList";
import Link from "@/components/Link";
import { texts as en } from "./About.en";
import { texts as de } from "./About.de";

export default function About() {
  const t = useTexts({ en, de });
  const experienceInYears = new Date().getFullYear() - 2020;

  const devTools = [
    {
      label: t.devStack.editor,
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
      label: t.devStack.terminal,
      value: (
        <>
          <Link href="https://ghostty.dev" target="_blank" rel="noopener noreferrer">
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
      label: t.devStack.git,
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
      label: t.devStack.secrets,
      value: (
        <Link href="https://1password.com" target="_blank" rel="noopener noreferrer">
          1Password
        </Link>
      )
    },
    {
      label: t.devStack.aiAssistant,
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
  ];

  return (
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
        <SpecCard title={t.devStack.devTools}>
          <SpecList
            items={devTools}
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
              text={t.devStack.workflowInfo}
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
        <h3>{t.devStack.ai}</h3>

        <p>{t.devStack.aiIntro}</p>

        <p>{t.devStack.aiLearning}</p>

        <p>
          <Trans
            text={t.devStack.aiLimitsInfo}
            components={{
              highlight: children => <Highlight>{children}</Highlight>
            }}
          />
        </p>

        <p className="mb-6">
          <Trans
            text={t.devStack.aiUsage}
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
          title={t.devStack.mcps}
          description={
            <>
              <p>{t.devStack.mcpsIntro}</p>
              <p>{t.devStack.mcpsUsed}</p>
            </>
          }
        >
          <SpecList
            padding="small"
            gridTemplateColumns="0.75fr 1fr"
            items={[
              {
                label: t.devStack.docLookup,
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
                label: t.devStack.webSearch,
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
                label: t.devStack.browser,
                value: (
                  <Link
                    href="https://github.com/ChromeDevTools/chrome-devtools-mcp/"
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
  );
}
