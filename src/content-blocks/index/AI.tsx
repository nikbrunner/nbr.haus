import Highlight from "@/components/Highlight";
import Link from "@/components/Link";

export default function AI() {
  return (
    <>
      <p>
        I am lucky enough to have entered the industry before AI became a thing.
        To have the learning hill to climb, with no tab completion or ChatGPT. I
        think this is very valuable. And I think it's still very valuable and
        even necessary to learn coding in the AI era. I would never recommend a
        Junior Developer to use AI during their initial learning phase. I could
        never use AI effectively as I do now, if I had not learned this craft
        without it.
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
        That's why I'm deliberate about how I use it. My primary AI tool is{" "}
        <Link
          href="https://claude.com/product/claude-code"
          target="_blank"
          rel="noopener noreferrer"
        >
          Claude Code
        </Link>
        . I use it like a personal assistant for brainstorming, planning,
        debugging and implementing boilerplate. When the task feels manageable
        by AI code generation, I work out detailed plans and then let Claude
        Code handle the implementation, while reviewing the code step by step.
      </p>

      <p>I also use personal slash commands and MCPs where applicable.</p>
    </>
  );
}
