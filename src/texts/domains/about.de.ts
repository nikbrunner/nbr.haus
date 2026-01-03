import type { texts as en } from "@/texts/domains/about.en";
import type { Widen } from "@/types/i18n";

export const texts: Widen<typeof en> = {
  greeting: "Hallo!",
  intro:
    "Ich bin <highlight>Nikolaus Brunner</highlight> (kurz Nik), Software-Ingenieur seit {years} Jahren, spezialisiert auf Frontend-Architekturen und Design-Systeme.",
  ux: "Ich habe ein gutes Gespür für <strong>UX</strong> und <strong>DX</strong>. Ich liebe es, mit Designern zu kollaborieren oder eigenständige Design-Entscheidungen zu treffen.",
  independence:
    "Ich setze Prioritäten und organisiere meine Arbeit selbst, weiß aber auch, wann ich Feedback brauche. In einem guten Team auf ein gemeinsames Ziel hinzuarbeiten ist für mich das Beste.",
  passion:
    "Ich <strong>liebe es</strong>, Produkte zu bauen und zu nutzen, und bin wahrscheinlich der, der den Support wegen Features oder Bugs anschreibt und regelmäßig Changelogs und GitHub-Releases checkt.",
  personal:
    "Ich bin 1984 geboren und abseits vom Code mag ich Wandern, Laufen, Bouldern, Kochen, Lesen und Fotografie. Außerdem interessiere ich mich sehr für Design in all seinen Formen, wie Architektur, Kunst und Typografie... Und ich habe eine leichte <strong>Tastatur-Obsession</strong>.",
  iAnecdote:
    'Ich weiß, dass jeder Satz gerade (und dieser hier) mit "Ich" angefangen hat, aber es fühlte sich einfach total komisch an, über mich selbst zu sprechen, ohne "Ich" zu benutzen. :)',
  devStack: {
    devTools: "Dev Tools",
    ai: "KI",
    workflowInfo:
      "Ich bin ein großer Workflow-Nerd. Meine <link>Dotfiles findest du hier</link>.",
    aiIntro:
      "Ich bin in die Branche eingestiegen, <strong>bevor KI</strong> ein Thema war. Ich habe den Berg ohne ChatGPT oder Tab-Completion erklommen.",
    aiLearning:
      "Das war Gold wert, und ist es immer noch. Für Junioren finde ich es als Lehrer und Lesepartner super, aber nicht als Schreibpartner in der anfänglichen Lernphase. Ich denke es ist sehr wichtig zum Lernen die Probleme selbst zu lösen und die Lösungen auch selbst niederzuschreiben... oder die Versuche.",
    aiLimitsInfo:
      "Die Technologie ist faszinierend, hat aber echte Grenzen. Wer sich zu sehr darauf verlässt, verlernt aktiv Skills und Wissen, <highlight>und verliert vielleicht das Wichtigste: den Spaß</highlight>.",
    aiUsage:
      "Deshalb setze ich KI bewusst ein. <link>Claude Code</link> ist mein primärer KI-Assistent. Wenn eine Aufgabe durch KI-Codegenerierung machbar ist, arbeite ich einen detaillierten Plan aus, lasse <link>Claude Code</link> implementieren und reviewe den Code Schritt für Schritt.",
    aiTools: "KI-Tools",
    aiToolsIntro:
      "Außerdem nutze ich persönliche Slash-Commands und verschiedene KI-Tools wo sinnvoll.",
    aiToolsUsed: "Das sind meine meistgenutzten Tools für KI-gestützte Entwicklung.",
    docLookup: "Dokumentations-Suche",
    webSearch: "Bessere Web-Suche",
    browser: "Browser",
    issueTracking: "Issue-Tracking",
    editor: "Editor:",
    terminal: "Terminal:",
    git: "Git:",
    aiAssistant: "KI-Assistent:",
    secrets: "Secrets:"
  }
};
