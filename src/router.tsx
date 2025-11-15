import { createRouter } from '@tanstack/react-router'
import NotFound from './components/NotFound'

import { routeTree } from './routeTree.gen'

// Create a new router instance
export function getRouter() {
    const router = createRouter({
      defaultNotFoundComponent: () => <NotFound />,
        routeTree,
        scrollRestoration: true,
        defaultPreloadStaleTime: 0,
        notFoundMode: 'root',
    })

    return router
}
