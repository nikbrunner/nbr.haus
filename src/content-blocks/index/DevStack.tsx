import ClickableTag from "@/components/ClickableTag";
import Highlight from "@/components/Highlight";
import Link from "@/components/Link";
import SpecCard from "../../components/SpecCard";
import SpecList from "../../components/SpecList";
import Hr from "../../components/Hr";
import { useTranslation, Trans } from "@/i18n";
import { tech } from "@/config";

export default function DevStack() {
  const { t } = useTranslation();

  const technologies = [
    tech.react,
    tech.typescript,
    tech.graphql,
    tech.tailwind,
    tech.tanstackStart,
    tech.tanstackRouter,
    tech.tanstackQuery,
    tech.tanstackForm,
    tech.shadcn,
    tech.scss,
    tech.nodejs,
    tech.electron,
    tech.redux,
    tech.storybook
  ];

  const devTools = [
    {
      label: t.index.devStack.editor,
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
      label: t.index.devStack.terminal,
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
      label: t.index.devStack.git,
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
      label: t.index.devStack.aiAssistant,
      value: (
        <Link
          href="https://claude.com/product/claude-code"
          target="_blank"
          rel="noopener noreferrer"
        >
          Claude Code
        </Link>
      )
    },
    {
      label: t.index.devStack.secrets,
      value: (
        <Link href="https://1password.com" target="_blank" rel="noopener noreferrer">
          1Password
        </Link>
      )
    }
  ];

  const mcpItems = [
    {
      label: t.index.devStack.docLookup,
      value: (
        <Link href="https://ref.tools/" target="_blank" rel="noopener noreferrer">
          ref.tools
        </Link>
      )
    },
    {
      label: t.index.devStack.webSearch,
      value: (
        <Link href="https://exa.ai" target="_blank" rel="noopener noreferrer">
          Exa
        </Link>
      )
    },
    {
      label: t.index.devStack.browser,
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
  ];

  return (
    <div className="DevStack">
      <SpecCard title={t.index.devStack.technologies}>
        <div className="SpecGrid">
          {technologies.map(t => (
            <ClickableTag key={t.name} {...t} />
          ))}
        </div>
      </SpecCard>

      <SpecCard title={t.index.devStack.devTools}>
        <SpecList items={devTools} padding="small" />
        <p
          style={{
            padding: "var(--size-2)",
            backgroundColor: "var(--bg-main)",
            margin: 0
          }}
        >
          <Trans
            text={t.index.devStack.workflowInfo}
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

      <SpecCard
        title={t.index.devStack.ai}
        description={
          <>
            <p>{t.index.devStack.aiIntro}</p>

            <p>{t.index.devStack.aiLearning}</p>

            <p>
              <Trans
                text={t.index.devStack.aiLimitsInfo}
                components={{
                  highlight: children => <Highlight>{children}</Highlight>
                }}
              />
            </p>

            <p>
              <Trans
                text={t.index.devStack.aiUsage}
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

            <Hr />

            <h3>{t.index.devStack.mcps}</h3>

            <div className="DevStack__mcps">
              <p>{t.index.devStack.mcpsIntro}</p>
              <p>{t.index.devStack.mcpsUsed}</p>

              <SpecList items={mcpItems} />
            </div>
          </>
        }
      />
    </div>
  );
}
