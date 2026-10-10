import { defineEventHandler } from "h3";

import { jobs, moreProjects, pins } from "@/config";

const CLI_USER_AGENTS = ["curl", "wget", "httpie", "fetch"];

const WIDTH = 72;
const LABEL_WIDTH = 14;

const bold = (text: string) => `\x1b[1m${text}\x1b[22m`;
const dim = (text: string) => `\x1b[2m${text}\x1b[22m`;
const italic = (text: string) => `\x1b[3m${text}\x1b[23m`;
const accent = (text: string) => `\x1b[32m${text}\x1b[39m`;
const underline = (text: string) => `\x1b[4m${text}\x1b[24m`;
/** Underlined accent text behind an OSC 8 hyperlink; terminals without OSC 8 still show the styling */
const link = (text: string, url: string) =>
  accent(underline(`\x1b]8;;${url}\x1b\\${text}\x1b]8;;\x1b\\`));

function isCLIRequest(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return CLI_USER_AGENTS.some(agent => userAgent.toLowerCase().includes(agent));
}

function wrap(text: string, width: number): string[] {
  const lines: string[] = [];
  let line = "";

  for (const word of text.split(" ")) {
    if (line && line.length + word.length + 1 > width) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }

  return line ? [...lines, line] : lines;
}

/** Label column on the left, wrapped value lines on the right; style applies per line */
function item(
  label: string,
  value: string,
  style = (text: string) => text
): string[] {
  return wrap(value, WIDTH - LABEL_WIDTH).map(
    (line, index) =>
      (index === 0
        ? bold(label.toUpperCase().padEnd(LABEL_WIDTH))
        : " ".repeat(LABEL_WIDTH)) + style(line)
  );
}

function section(number: string, title: string): string[] {
  return [
    "",
    "",
    `${accent(bold(number))}  ${bold(title.toUpperCase())}`,
    "═".repeat(WIDTH)
  ];
}

function renderSheet(): string {
  const title = "PERSONAL SPEC SHEET";
  const box = "─".repeat(title.length + 4);

  return [
    "",
    bold("NIKOLAUS BRUNNER".padEnd(WIDTH - 12)) + bold("LANDSHUT, DE"),
    bold("SENIOR DESIGN ENGINEER".padEnd(WIDTH - 16)) +
      link("https://nbr.haus", "https://nbr.haus"),
    "",
    `┌${box}┐`,
    `│  ${title}  │`,
    `└${box}┘`,

    ...section("01", "Ident"),
    ...item("Name", "Nikolaus Brunner, Nik for short"),
    ...item("Role", "Design Engineer"),
    ...item("Base", "Landshut, Bavaria, DE"),
    ...item("Code", "Self-taught 2019, professional since 2020"),
    "",
    ...item("Mail", "nik@nbr.haus", text => link(text, "mailto:nik@nbr.haus")),
    ...item("GitHub", "github.com/nikbrunner", text =>
      link(text, "https://github.com/nikbrunner")
    ),
    ...item("LinkedIn", "linkedin.com/in/nbru", text =>
      link(text, "https://www.linkedin.com/in/nbru/")
    ),

    ...section("03", "Work"),
    ...item("Now", "IMFUSION", text =>
      bold(link(text, "https://www.imfusion.com/"))
    ),
    ...item("", "Senior Design Engineer, Web & Cloud team, since 2026-04", text =>
      dim(italic(text))
    ),
    ...item(
      "",
      "I'm building @imfusion/web-ui, ImFusion's React component library on top of Base UI, with its design tokens, icons and tooling."
    ),
    ...jobs.flatMap(job => [
      "",
      ...item(job.period[0], job.company.toUpperCase(), text =>
        bold(link(text, job.href))
      ),
      ...item(job.period[1], job.role, text => dim(italic(text))),
      ...item("", job.notes)
    ]),

    ...section("04", "Projects"),
    ...pins.flatMap((pin, index) => [
      ...(index > 0 ? [""] : []),
      ...item(pin.name, pin.description),
      ...item("", pin.href, text => link(text, pin.href))
    ]),
    "",
    ...item("Also", moreProjects.map(project => project.name).join("  "), line =>
      moreProjects.reduce(
        (text, project) =>
          text.replace(project.name, link(project.name, project.href)),
        line
      )
    ),

    "",
    "",
    "─".repeat(WIDTH),
    dim("About, how I work, the commit log and the study notes live on the site:"),
    `${link("https://nbr.haus", "https://nbr.haus")}  ${dim("·")}  ${link("https://nbr.haus/study", "https://nbr.haus/study")}`,
    ""
  ].join("\n");
}

export default defineEventHandler(event => {
  const userAgent = event.req.headers.get("user-agent");

  if (isCLIRequest(userAgent) && !event.url.pathname.endsWith(".xml")) {
    return new Response(renderSheet(), {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
  // No return = continue to TanStack Start
});
