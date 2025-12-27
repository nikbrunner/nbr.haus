import type { Widen } from "@/i18n/types";

import type { texts as en } from "./about.en";

export const texts: Widen<typeof en> = {
  greeting: "Hallo!",
  intro:
    "Ich bin <highlight>Nikolaus Brunner</highlight> (kurz Nik), Software-Ingenieur aus Landshut, Deutschland, spezialisiert auf Frontend-Architekturen und Design-Systeme — seit {years} Jahren.",
  ux: "Ein starkes Gespür für UX (User Experience) und DX (Developer Experience) prägt meine Arbeit—ob in Zusammenarbeit mit Designern oder bei eigenständigen Design-Entscheidungen.",
  independence:
    "Prioritäten erkennen und die eigene Arbeit managen liegt mir—ebenso wie zu wissen, wann Feedback gefragt ist. Teil eines guten Teams zu sein, das auf ein gemeinsames Ziel hinarbeitet—das finde ich am besten.",
  passion:
    "Produkte zu entwickeln und zu nutzen ist eine echte Leidenschaft—ich bin wahrscheinlich derjenige, der den Support wegen Features oder Bugs kontaktiert und regelmäßig Changelogs und GitHub-Releases verfolgt.",
  personal:
    "Geboren 1984, und abseits vom Code: Wandern, Lesen, Landschaftsfotografie, Musikproduktion, Workflow-Optimierung und Open Source — plus eine kleine Tastatur-Obsession.",
  devStack: {
    devTools: "Dev Tools",
    ai: "KI",
    workflowInfo:
      "Workflows sind eine große Leidenschaft von mir. Meine <link>Dotfiles findest du hier</link>.",
    aiIntro:
      "In die Branche einzusteigen, bevor KI ein Thema wurde, bedeutete den Lernberg ohne Tab-Completion oder ChatGPT zu erklimmen.",
    aiLearning:
      "Das war Gold wert—und ist es noch in der KI-Ära. Für Junioren ist KI gut als Lehrer und Lesepartner für interaktives Lernen, aber nicht als Schreibpartner in der frühen Phase. Ohne dieses Handwerk erst auf die harte Tour gelernt zu haben, könnte ich KI nicht so effektiv nutzen wie jetzt.",
    aiLimitsInfo:
      "Die Technologie ist faszinierend, aber sie hat echte Grenzen. Sich zu sehr darauf zu verlassen bedeutet, aktiv Fähigkeiten und Wissen zu verlernen — <highlight>und vielleicht am wichtigsten, den Spaß zu verlieren</highlight>.",
    aiUsage:
      "Deshalb setze ich sie bewusst ein. Ich verwende <link>Claude Code</link> als meinen primären KI-Assistenten. Wenn die Aufgabe durch KI-Codegenerierung machbar erscheint, arbeite ich detaillierte Pläne aus und lasse dann <link>Claude Code</link> die Implementierung übernehmen, während ich den Code Schritt für Schritt überprüfe.",
    mcps: "MCPs",
    mcpsIntro:
      "Ich nutze auch persönliche Slash-Commands und MCPs, wo es sinnvoll ist.",
    mcpsUsed: "Das sind die am häufigsten genutzten MCPs für KI-Unterstützung.",
    docLookup: "Dokumentations-Suche",
    webSearch: "Bessere Web-Suche",
    browser: "Browser",
    editor: "Editor:",
    terminal: "Terminal:",
    git: "Git:",
    aiAssistant: "KI-Assistent:",
    secrets: "Secrets:"
  }
};
