import Highlight from "../../components/Highlight";
import Project from "../../components/Project";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <>
      <p className={styles.intro}>
        Projects are never finished, but they are always in progress. Here are
        some of my projects as a developer.
      </p>

      <div className={styles.projects}>
        <Project
          title="Black Atom Industries"
          stack={["TypeScript", "Deno", "OKLCH"]}
          topics={[
            "Architecture",
            "Infrastructure",
            "Colorschemes",
            "Color Theory",
            "Design Systems",
          ]}
          status="Active"
          platforms={["Neovim", "Zed", "Ghostty", "WezTerm", "Tmux"]}
          metrics={[{ label: "Themes", value: "27+" }]}
          primaryLink={{
            url: "https://black-atom.industries",
            type: "Live Site",
          }}
          additionalLinks={[
            { url: "https://github.com/nikbrunner/black-atom", type: "GitHub" },
          ]}
        >
          <p>
            Open-source theming system with 27+ themes across many platforms.
          </p>
          <p>
            Built with an <Highlight>adapter pattern</Highlight> for consistent
            theme generation from a central source using{" "}
            <Highlight>OKLCH color space</Highlight>.
          </p>
          <p>
            Maintained with focus on developer experience and cross-platform
            consistency.
          </p>
        </Project>

        <Project
          title="AWDCS"
          stack={["Markdown"]}
          topics={["Modal Editing", "Workflow Design", "Developer Experience"]}
          status="Active"
          primaryLink={{
            url: "https://github.com/nikbrunner/awdcs",
            type: "GitHub",
          }}
        >
          <p>
            AWDCS (App, Workspace, Document, Change, Symbol): A scope-based
            keymap architecture for modal editors organizing bindings by
            operational context rather than tool-specific functions.
          </p>
          <p>
            Features <Highlight>systematic prefix patterns</Highlight> and{" "}
            <Highlight>semantic naming</Highlight> for consistent, memorable
            keybindings across workflows.
          </p>
        </Project>
      </div>
    </>
  );
}
