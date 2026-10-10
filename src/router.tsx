import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { NotFound } from "@/partials/NotFound";
import { routeTree } from "@/routeTree.gen";

declare global {
  const __BUILD_DATE__: string;
}

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    defaultNotFoundComponent: () => <NotFound />,
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    notFoundMode: "root"
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}
