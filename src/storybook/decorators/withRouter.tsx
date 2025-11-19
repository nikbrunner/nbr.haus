import type { Decorator } from "@storybook/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter
} from "@tanstack/react-router";
import { rootSearchParamsSchema } from "@/validators/rootSearchParams";

/**
 * Global router decorator for Storybook
 *
 * Provides TanStack Router context for components that use router hooks
 * like useRouter, useSearch, etc.
 */
export const withRouter = (): Decorator => (Story) => {
  // Create root route with the same search validation as the app
  const rootRoute = createRootRoute({
    validateSearch: rootSearchParamsSchema
  });

  // Create an index route so there's an active match
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <Story />
  });

  const routeTree = rootRoute.addChildren([indexRoute]);

  // Create router with memory history
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] })
  });

  return <RouterProvider router={router} />;
};
