import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cv")({
  server: {
    handlers: {
      GET: () => new Response(null, { status: 308, headers: { Location: "/" } })
    }
  }
});
