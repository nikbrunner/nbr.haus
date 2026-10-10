import { createServerFn } from "@tanstack/react-start";
import { setResponseHeaders, setResponseStatus } from "@tanstack/react-start/server";

import { GITHUB_USER, logRepos } from "@/config";
import {
  buildCommitLog,
  buildHistoryQuery,
  getCachePolicy,
  parseGraphqlHistories,
  parseRestHistory,
  type Commit,
  type CommitLogResult,
  type HistoryLoad
} from "@/lib/github/commitLog";

const GITHUB_API = "https://api.github.com";
const HISTORY_SIZE = 20;
const LOG_SIZE = 10;
const REQUEST_TIMEOUT_MS = 4000;

export const fetchCommitLog = createServerFn({ method: "GET" }).handler(
  async (): Promise<CommitLogResult> => {
    const load = await loadHistories(process.env.GITHUB_PAT);
    const policy = getCachePolicy(load);

    setResponseStatus(policy.status);
    if (policy.cacheControl) {
      setResponseHeaders(new Headers({ "Cache-Control": policy.cacheControl }));
    }

    if (!load) return { status: "error", code: "github-unavailable" };
    return { status: "ok", log: buildCommitLog(load.histories, LOG_SIZE) };
  }
);

async function loadHistories(
  token: string | undefined
): Promise<HistoryLoad | null> {
  if (token) {
    try {
      return await fetchWithGraphql(token);
    } catch (error) {
      console.warn("GitHub GraphQL failed, falling back to REST", error);
    }
  }

  try {
    return await fetchWithRest();
  } catch (error) {
    console.warn("GitHub REST failed", error);
    return null;
  }
}

async function fetchWithGraphql(token: string): Promise<HistoryLoad> {
  const response = await fetch(`${GITHUB_API}/graphql`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "nbr.haus"
    },
    body: JSON.stringify({ query: buildHistoryQuery(logRepos, HISTORY_SIZE) }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
  });

  if (!response.ok) throw new Error(`GitHub GraphQL responded ${response.status}`);

  const histories = parseGraphqlHistories(await response.json(), GITHUB_USER);
  return { histories, isPartial: histories.length < logRepos.length };
}

async function fetchWithRest(): Promise<HistoryLoad> {
  const results = await Promise.allSettled(
    logRepos.map(async repo => {
      const response = await fetch(
        `${GITHUB_API}/repos/${repo}/commits?per_page=${HISTORY_SIZE}&author=${GITHUB_USER}`,
        {
          headers: {
            "Accept": "application/vnd.github+json",
            "User-Agent": "nbr.haus"
          },
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
        }
      );

      if (!response.ok) throw new Error(`GitHub REST responded ${response.status}`);

      return parseRestHistory(repo, await response.json());
    })
  );

  const histories: Commit[][] = results.flatMap(result =>
    result.status === "fulfilled" ? [result.value] : []
  );

  if (histories.length === 0) throw new Error("No repository history available");

  return { histories, isPartial: histories.length < logRepos.length };
}
