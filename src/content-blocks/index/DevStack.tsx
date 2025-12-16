import Highlight from "@/components/Highlight";
import Link from "@/components/Link";
import SpecCard from "../../components/SpecCard";
import SpecGrid from "../../components/SpecGrid";
import SpecList from "../../components/SpecList";
import Hr from "../../components/Hr";
import { useTranslation } from "@/i18n";

export default function DevStack() {
  const { t } = useTranslation();

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
        <SpecGrid items={technologies} />
      </SpecCard>

      <SpecCard title={t.index.devStack.devTools}>
        <SpecList items={devTools} />
        <p
          style={{
            padding: "var(--size-2)",
            backgroundColor: "var(--bg-main)",
            margin: 0
          }}
        >
          {t.index.devStack.workflowPassion}{" "}
          <Link
            href="https://github.com/nikbrunner/dots"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.index.devStack.dotfilesHere}
          </Link>
          .
        </p>
      </SpecCard>

      <SpecCard
        title={t.index.devStack.ai}
        description={
          <>
            <p>{t.index.devStack.aiIntro}</p>

            <p>{t.index.devStack.aiLearning}</p>

            <p>
              {t.index.devStack.aiLimits}{" "}
              <Highlight>{t.index.devStack.aiLimitsHighlight}</Highlight>.
            </p>

            <p>
              {t.index.devStack.aiUsage.split("Claude Code")[0]}
              <Link
                href="https://claude.com/product/claude-code"
                target="_blank"
                rel="noopener noreferrer"
              >
                Claude Code
              </Link>
              {t.index.devStack.aiUsage.split("Claude Code")[1]}
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

const technologies = [
  { name: "React", url: "https://react.dev" },
  { name: "TypeScript", url: "https://www.typescriptlang.org" },
  { name: "GraphQL", url: "https://graphql.org" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com" },
  { name: "TanStack Start", url: "https://tanstack.com/start" },
  { name: "TanStack Router", url: "https://tanstack.com/router" },
  { name: "TanStack Query", url: "https://tanstack.com/query" },
  { name: "TanStack Form", url: "https://tanstack.com/form" },
  { name: "ShadCN", url: "https://ui.shadcn.com" },
  { name: "SCSS", url: "https://sass-lang.com" },
  { name: "Node.js", url: "https://nodejs.org" },
  { name: "Electron", url: "https://www.electronjs.org" },
  { name: "Redux (Toolkit)", url: "https://redux-toolkit.js.org" },
  { name: "Storybook", url: "https://storybook.js.org" }
];
