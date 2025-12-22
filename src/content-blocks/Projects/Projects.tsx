import Project from "@/components/Project";
import { useTexts } from "@/i18n";
import { tech } from "@/config";
import { texts as en } from "./Projects.en";
import { texts as de } from "./Projects.de";
import "./Projects.css";

export default function Projects() {
  const t = useTexts({ en, de });

  return (
    <>
      <p className="Projects__intro">{t.intro}</p>

      <div className="Projects__list">
        <Project
          title="Black Atom Industries"
          stack={[tech.typescript, tech.deno, tech.oklch]}
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
          <p>{t.blackAtom.description1}</p>
          <p>{t.blackAtom.description2}</p>
          <p>{t.blackAtom.description3}</p>
        </Project>

        <Project
          title="AWDCS"
          stack={[tech.markdown]}
          topics={["Modal Editing", "Workflow Design", "Developer Experience"]}
          status="Active"
          primaryLink={{
            url: "https://github.com/nikbrunner/awdcs",
            type: "GitHub"
          }}
        >
          <p>{t.awdcs.description1}</p>
          <p>{t.awdcs.description2}</p>
        </Project>

        <Project
          title="kōyō"
          stack={[tech.qmk, tech.c, tech.bash]}
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
          <p>{t.koyo.description}</p>
        </Project>

        <Project
          title="nbr.nvim"
          stack={[tech.lua, tech.neovim]}
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
          <p>{t.nbrNvim.description}</p>
        </Project>
      </div>
    </>
  );
}
