import { queryOptions } from "@tanstack/react-query";

import { fetchCommitLog } from "@/lib/github/fetchCommitLog";

const githubKeys = {
  commitLog: ["github", "commit-log"] as const
};

export function getCommitLog() {
  return queryOptions({
    queryKey: githubKeys.commitLog,
    queryFn: () => fetchCommitLog(),
    staleTime: 5 * 60 * 1000
  });
}
