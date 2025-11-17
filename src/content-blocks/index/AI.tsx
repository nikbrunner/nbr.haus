import Highlight from "@/components/Highlight";
import Link from "@/components/Link";

export default function AI() {
  return (
    <>
      <p>
        I am lucky enough to have entered the industry before AI became a thing.
        To have the learning hill to climb, with no tab completion or ChatGPT. I
        think this is very valuable. And I think its still very valuable and
        even necessary to learn coding in the AI era. I would never recommend a
        Junior Developer to use AI during their initial learning phase. I could
        never use AI effectively as I do now, if I have not learned this craft
        without it.
      </p>

      <p>
        The technology is fascinating and I'm excited to see where it goes, but
        I also recognize the limits and risks. I am certain, and that is the
        case for all levels of expertise in this field, that If you rely to
        heavily on AI, you will actively will unlearn skills and knowledge -{" "}
        <Highlight>
          and maybe most importantly, you will no longer have fun
        </Highlight>
        .
      </p>

      <p>
        I really appreciate that we have AI as a tool available to use, but AI
        in its current state, really has noticeable limitations, and you really
        need to learn about how to use it effectively.
      </p>

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
        I use it like a personal assistant for brainstorming, planing, debugging
        and implementing boilerplate. When the task feels manageable by AI code
        generation, I work out detailed plans and then let Claude Code handle
        the implementation, while reviewing the code step by step.
      </p>
      <p>I also use personal slash commands and MCP's where applicable.</p>
    </>
  );
}
