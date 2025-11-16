import Link from "../../components/Link";

export default function AI() {
  return (
    <>
      <p>
        My primary AI assistance tool is{" "}
        <Link
          href="https://claude.com/product/claude-code"
          target="_blank"
          rel="noopener noreferrer"
        >
          Claude Code
        </Link>
        . I prioritize Claude's consistency and quality over chasing every new
        model release. The terminal integration aligns naturally with my
        workflow, where I spend most of my time.
      </p>
      <p>
        I use it like a personal assistent for brainstorming, planing, debugging
        and implementing boilerplate.
      </p>
      <p>I also use personal slash commands and MCP's where applicable.</p>
    </>
  );
}
