import { z } from "zod";

export interface Commit {
  repo: string;
  sha: string;
  message: string;
  url: string;
  date: string;
}

export interface CommitLog {
  commits: Commit[];
}

export type CommitLogResult =
  | { status: "ok"; log: CommitLog }
  | { status: "error"; code: "github-unavailable" };

export interface HistoryLoad {
  histories: Commit[][];
  /** Some repositories failed or were missing */
  isPartial: boolean;
}

interface CachePolicy {
  status: 200 | 503;
  /** Absent on failure: a 503 without cache headers is not stored by the CDN */
  cacheControl?: string;
}

/**
 * A full log is cached for five minutes and served stale while it revalidates. A partial log is
 * cached for one minute. A total failure is a 503 with no cache headers, which the CDN does not
 * store, so it keeps serving the last good log.
 */
export function getCachePolicy(load: HistoryLoad | null): CachePolicy {
  if (!load) return { status: 503 };
  if (load.isPartial)
    return { status: 200, cacheControl: "public, max-age=0, s-maxage=60" };
  return {
    status: 200,
    cacheControl: "public, max-age=0, s-maxage=300, stale-while-revalidate=86400"
  };
}

const graphqlCommitSchema = z.object({
  abbreviatedOid: z.string(),
  messageHeadline: z.string(),
  committedDate: z.string(),
  url: z.string(),
  author: z.object({ user: z.object({ login: z.string() }).nullable() }).nullable()
});

const graphqlResponseSchema = z.object({
  data: z.record(
    z.string(),
    z
      .object({
        nameWithOwner: z.string(),
        defaultBranchRef: z
          .object({
            target: z.object({
              history: z.object({ nodes: z.array(graphqlCommitSchema) })
            })
          })
          .nullable()
      })
      .nullable()
  )
});

const restCommitsSchema = z.array(
  z.object({
    sha: z.string(),
    html_url: z.string(),
    commit: z.object({
      message: z.string(),
      committer: z.object({ date: z.string() }).nullable()
    })
  })
);

/** One aliased `repository` field per repo, reading the default branch history */
export function buildHistoryQuery(repos: string[], size: number): string {
  const fields = repos.map((repo, index) => {
    const [owner, name] = repo.split("/");
    return `r${index}: repository(owner: "${owner}", name: "${name}") {
      nameWithOwner
      defaultBranchRef { target { ... on Commit { history(first: ${size}) { nodes {
        abbreviatedOid messageHeadline committedDate url author { user { login } }
      } } } } }
    }`;
  });

  return `query { ${fields.join("\n")} }`;
}

export function parseGraphqlHistories(body: unknown, author: string): Commit[][] {
  const { data } = graphqlResponseSchema.parse(body);

  return Object.values(data).flatMap(repository => {
    if (!repository?.defaultBranchRef) return [];

    const history = repository.defaultBranchRef.target.history.nodes
      .filter(node => node.author?.user?.login === author)
      .map(node => ({
        repo: repository.nameWithOwner,
        sha: node.abbreviatedOid,
        message: node.messageHeadline,
        url: node.url,
        date: node.committedDate
      }));

    return [history];
  });
}

export function parseRestHistory(repo: string, body: unknown): Commit[] {
  return restCommitsSchema.parse(body).flatMap(item =>
    item.commit.committer
      ? [
          {
            repo,
            sha: item.sha.slice(0, 7),
            message: item.commit.message.split("\n")[0],
            url: item.html_url,
            date: item.commit.committer.date
          }
        ]
      : []
  );
}

export function buildCommitLog(histories: Commit[][], limit: number): CommitLog {
  const newestFirst = [...histories.flat()].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return { commits: newestFirst.slice(0, limit) };
}

/** `2026-10-06T18:35:04Z` becomes `2026-10-06 18:35` (UTC) */
export function formatCommitTime(date: string): string {
  return date.slice(0, 16).replace("T", " ");
}
