import Project from "../../components/Project";
import { useTranslation } from "@/i18n";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <>
      <p className="Projects__intro">{t.index.projects.intro}</p>

      <div className="Projects__list">
        <Project
          title="Black Atom Industries"
          stack={["TypeScript", "Deno", "OKLCH"]}
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
          <p>{t.index.projects.blackAtom.description1}</p>
          <p>{t.index.projects.blackAtom.description2}</p>
          <p>{t.index.projects.blackAtom.description3}</p>
        </Project>

        <Project
          title="AWDCS"
          stack={["Markdown"]}
          topics={["Modal Editing", "Workflow Design", "Developer Experience"]}
          status="Active"
          primaryLink={{
            url: "https://github.com/nikbrunner/awdcs",
            type: "GitHub"
          }}
        >
          <p>{t.index.projects.awdcs.description1}</p>
          <p>{t.index.projects.awdcs.description2}</p>
        </Project>

        <Project
          title="kōyō"
          stack={["QMK", "C", "Bash"]}
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
          <p>{t.index.projects.koyo.description}</p>
        </Project>

        <Project
          title="nbr.nvim"
          stack={["Lua", "Neovim"]}
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
          <p>{t.index.projects.nbrNvim.description}</p>
        </Project>
      </div>
    </>
  );
}
