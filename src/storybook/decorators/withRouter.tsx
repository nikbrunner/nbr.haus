import type { Decorator } from "@storybook/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { rootSearchParamsSchema } from "@/validators/rootSearchParams";
import { TanStackDevtools } from "@tanstack/react-devtools";

interface WithRouterOptions<TSearchParams = Record<string, unknown>> {
  searchParams?: Partial<TSearchParams>;
}

/**
 * Router decorator for Storybook stories
 *
 * Provides TanStack Router context for components that use router hooks
 * like useRouter, useSearch, etc.
 *
 * Usage:
 * ```ts
 * import type { RootSearchParams } from "@/validators/rootSearchParams";
 *
 * export const MyStory: Story = {
 *   decorators: [withRouter<RootSearchParams>({ searchParams: { hue: 180 } })]
 * };
 * ```
 */
export const withRouter =
  <TSearchParams = Record<string, unknown>,>(
    options: WithRouterOptions<TSearchParams> = {}
  ): Decorator =>
  Story => {
    const { searchParams = {} } = options;

    // Build query string from search params
    const queryString =
      Object.keys(searchParams).length > 0
        ? `?${new URLSearchParams(
            Object.entries(searchParams).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: String(value)
              }),
              {}
            )
          ).toString()}`
        : "";

    // Create root route with the same search validation as the app
    const rootRoute = createRootRoute({
      validateSearch: rootSearchParamsSchema
    });

    // Create an index route so there's an active match
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      component: () => (
        <>
          <Story />
          <TanStackDevtools
            config={{
              position: "bottom-right"
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />
              }
            ]}
          />
        </>
      )
    });

    const routeTree = rootRoute.addChildren([indexRoute]);

    // Create router with memory history including search params
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: [`/${queryString}`] })
    });

    return <RouterProvider router={router} />;
  };
