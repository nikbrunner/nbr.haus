import { describe, expect, it } from "vitest";

import {
  buildCommitLog,
  getCachePolicy,
  parseGraphqlHistories,
  parseRestHistory,
  type Commit
} from "@/lib/github/commitLog";

function commit(repo: string, date: string): Commit {
  return { repo, sha: date, message: "m", url: "https://github.com", date };
}

describe("buildCommitLog", () => {
  it("merges histories newest first and keeps the limit", () => {
    const log = buildCommitLog(
      [
        [
          commit("a/one", "2026-10-06T10:00:00Z"),
          commit("a/one", "2026-10-01T10:00:00Z")
        ],
        [commit("a/two", "2026-10-05T10:00:00Z")]
      ],
      2
    );

    expect(log.commits.map(c => c.date)).toEqual([
      "2026-10-06T10:00:00Z",
      "2026-10-05T10:00:00Z"
    ]);
  });

  it("records each repo's newest commit, also beyond the limit", () => {
    const log = buildCommitLog(
      [
        [commit("a/one", "2026-10-06T10:00:00Z")],
        [commit("a/two", "2026-09-01T10:00:00Z")]
      ],
      1
    );

    expect(log.lastCommitByRepo).toEqual({
      "a/one": "2026-10-06T10:00:00Z",
      "a/two": "2026-09-01T10:00:00Z"
    });
  });
});

describe("parseGraphqlHistories", () => {
  it("keeps only the given author's commits and skips missing repos", () => {
    const body = {
      data: {
        r0: {
          nameWithOwner: "org/repo",
          defaultBranchRef: {
            target: {
              history: {
                nodes: [
                  {
                    abbreviatedOid: "abc1234",
                    messageHeadline: "mine",
                    committedDate: "2026-10-06T10:00:00Z",
                    url: "https://github.com/org/repo/commit/abc1234",
                    author: { user: { login: "nik" } }
                  },
                  {
                    abbreviatedOid: "def5678",
                    messageHeadline: "theirs",
                    committedDate: "2026-10-05T10:00:00Z",
                    url: "https://github.com/org/repo/commit/def5678",
                    author: { user: { login: "someone" } }
                  }
                ]
              }
            }
          }
        },
        r1: null
      }
    };

    expect(parseGraphqlHistories(body, "nik")).toEqual([
      [
        {
          repo: "org/repo",
          sha: "abc1234",
          message: "mine",
          url: "https://github.com/org/repo/commit/abc1234",
          date: "2026-10-06T10:00:00Z"
        }
      ]
    ]);
  });

  it("rejects a response without data", () => {
    expect(() => parseGraphqlHistories({ errors: [] }, "nik")).toThrow();
  });
});

describe("parseRestHistory", () => {
  it("shortens the sha and keeps the first message line", () => {
    const body = [
      {
        sha: "73d1cd9ab1988f77d94dbe860bf6c9aa96288b83",
        html_url: "https://github.com/a/b/commit/73d1cd9",
        commit: {
          message: "Subject line\n\nBody text",
          committer: { date: "2026-10-06T16:59:19Z" }
        }
      }
    ];

    expect(parseRestHistory("a/b", body)).toEqual([
      {
        repo: "a/b",
        sha: "73d1cd9",
        message: "Subject line",
        url: "https://github.com/a/b/commit/73d1cd9",
        date: "2026-10-06T16:59:19Z"
      }
    ]);
  });
});

describe("getCachePolicy", () => {
  it("answers a total failure with a 503 and no cache headers", () => {
    expect(getCachePolicy(null)).toEqual({ status: 503 });
  });

  it("caches a partial log briefly and a full log longer", () => {
    expect(
      getCachePolicy({ histories: [], isPartial: true }).cacheControl
    ).toContain("s-maxage=60");
    expect(
      getCachePolicy({ histories: [], isPartial: false }).cacheControl
    ).toContain("s-maxage=300, stale-while-revalidate");
  });
});
