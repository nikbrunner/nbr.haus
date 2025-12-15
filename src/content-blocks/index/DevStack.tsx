import Highlight from "@/components/Highlight";
import Link from "@/components/Link";
import SpecCard from "../../components/SpecCard";
import SpecGrid from "../../components/SpecGrid";
import SpecList from "../../components/SpecList";
import Hr from "../../components/Hr";

export default function DevStack() {
  return (
    <div className="DevStack">
      <SpecCard title="Technologies">
        <SpecGrid items={technologies} />
      </SpecCard>

      <SpecCard title="Dev Tools">
        <SpecList items={devTools} />
        <p
          style={{
            padding: "var(--size-2)",
            backgroundColor: "var(--bg-main)",
            margin: 0
          }}
        >
          I am very passionate about workflow. You can check my{" "}
          <Link
            href="https://github.com/nikbrunner/dots"
            target="_blank"
            rel="noopener noreferrer"
          >
            dotfiles here
          </Link>
          .
        </p>
      </SpecCard>

      <SpecCard
        title="AI"
        description={
          <>
            <p>
              I am lucky enough to have entered the industry before AI became a
              thing. To have the learning hill to climb, with no tab completion or
              ChatGPT.{" "}
            </p>

            <p>
              I think this is was very valuable. And I think it's still very valuable
              and even necessary to learn coding in the AI era. I would never
              recommend a Junior Developer to use AI during their initial learning
              phase. I could never use AI effectively as I do now, if I had not
              learned this craft without it.
            </p>

            <p>
              The technology is fascinating, but it has real limits. If you rely too
              heavily on it, you will actively unlearn skills and knowledge -{" "}
              <Highlight>
                and maybe most importantly, you will no longer have fun
              </Highlight>
              .
            </p>

            <p>
              That's why I'm deliberate about how I use it. I use{" "}
              <Link
                href="https://claude.com/product/claude-code"
                target="_blank"
                rel="noopener noreferrer"
              >
                Claude Code
              </Link>{" "}
              as my primary AI assistent. When the task feels manageable by AI code
              generation, I work out detailed plans and then let Claude Code handle
              the implementation, while reviewing the code step by step.
            </p>

            <Hr />

            <h3>MCP's</h3>

            <div className="DevStack__mcps">
              <p>
                I also use personal slash commands and{" "}
                <Link href="https://modelcontextprotocol.io/docs/getting-started/intro">
                  MCP's
                </Link>{" "}
                where applicable.
              </p>
              <p>These are the most used MCP's for AI assistance.</p>

              <SpecList
                items={[
                  {
                    label: "Documentation Lookup",
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
                    label: "Better Web Search",
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
                    label: "Browser",
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

const devTools: Array<{
  label: string;
  value: React.ReactNode;
}> = [
  {
    label: "Editor:",
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
    label: "Terminal:",
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
    label: "Git:",
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
    label: "AI assistant:",
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
    label: "Secrets:",
    value: (
      <Link href="https://1password.com" target="_blank" rel="noopener noreferrer">
        1Password
      </Link>
    )
  }
];
