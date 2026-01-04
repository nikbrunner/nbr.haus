import { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import Button from "@/components/Button";
import { verifyCoverPassword } from "@/lib/coverletters";

import "@/routes/cover/login.css";

const loginSearchSchema = z.object({
  redirect: z.string().optional()
});

export const Route = createFileRoute("/cover/login")({
  validateSearch: loginSearchSchema,
  head: () => ({
    meta: [{ title: "Cover Letter Access" }, { name: "robots", content: "noindex" }]
  }),
  component: CoverLoginPage
});

function CoverLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { redirect: redirectTo } = Route.useSearch();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    try {
      const result = await verifyCoverPassword({ data: password });

      if (result.success) {
        // Use router.history.push for full URL redirect
        window.location.href = redirectTo ?? "/cover/example-corp";
      } else {
        setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="CoverLogin">
      <form className="CoverLogin__form" onSubmit={handleSubmit}>
        <h1 className="CoverLogin__title">Cover Letters</h1>
        <p className="CoverLogin__description">This area is password protected.</p>

        <input
          className="CoverLogin__input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          disabled={isLoading}
        />

        <Button type="submit" variant="accent" disabled={isLoading || !password}>
          {isLoading ? "Verifying..." : "Enter"}
        </Button>

        {error && <p className="CoverLogin__error">Invalid password. Try again.</p>}
      </form>
    </div>
  );
}
