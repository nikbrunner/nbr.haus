import { execFileSync } from "node:child_process";

const HOME_PROSE = "src/content/pages/home.en.md";

const staged = execFileSync("git", ["diff", "--cached", "--name-only"], {
  encoding: "utf8"
}).split("\n");

if (!staged.includes(HOME_PROSE)) {
  console.warn(
    `The home page changed, but ${HOME_PROSE} did not. If the change is something a visitor reads, update the spoken version too.`
  );
}
