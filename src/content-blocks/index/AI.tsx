import Highlight from "@/components/Highlight";
import Link from "@/components/Link";

export default function AI() {
  return (
    <>
      <p>
        I am lucky enough to have entered the industry before AI became a thing. To
        have the learning hill to climb, with no tab completion or ChatGPT. I think
        this is was very valuable. And I think it's still very valuable and even
        necessary to learn coding in the AI era. I would never recommend a Junior
        Developer to use AI during their initial learning phase. I could never use AI
        effectively as I do now, if I had not learned this craft without it.
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
        generation, I work out detailed plans and then let Claude Code handle the
        implementation, while reviewing the code step by step.
      </p>

      <div>
        <p>
          I also use personal slash commands and{" "}
          <Link href="https://modelcontextprotocol.io/docs/getting-started/intro">
            MCP's
          </Link>{" "}
          where applicable.
        </p>

        <p>I use these three MCPs the most:</p>
        <ul>
          <li>
            <Link
              href="https://ref.tools/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ref.tools MCP
            </Link>
            - For looking up and indexing documentation
          </li>
          <li>
            <Link href="https://exa.ai" target="_blank" rel="noopener noreferrer">
              Exa MCP
            </Link>
            - For a better web search
          </li>
          <li>
            <Link
              href="https://github.com/ChromeDevTools/chrome-devtools-mcp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome DevTools MCP
            </Link>
            - So the AI can have its own browser
          </li>
        </ul>
      </div>
    </>
  );
}
