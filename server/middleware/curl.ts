import { defineEventHandler } from "h3";

const CLI_USER_AGENTS = ["curl", "wget", "httpie", "fetch"];

function isCLIRequest(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return CLI_USER_AGENTS.some(agent => userAgent.toLowerCase().includes(agent));
}

export default defineEventHandler(event => {
  const userAgent = event.req.headers.get("user-agent");

  if (isCLIRequest(userAgent)) {
    const card = `
┌─────────────────────────────────────────────┐
│              Nik Brunner (nbr)              │
│        Senior Frontend Developer            │
├─────────────────────────────────────────────┤
│  5+ years building frontend                 │
│  architectures and design systems           │
│                                             │
│  Available: February 2026                   │
├─────────────────────────────────────────────┤
│  GitHub:   github.com/nikbrunner            │
│  Email:    nik@nbr.haus                     │
│  Web:      https://nbr.haus                 │
│  LinkedIn: linkedin.com/in/nbru             │
└─────────────────────────────────────────────┘
`;
    return new Response(card, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
  // No return = continue to TanStack Start
});
