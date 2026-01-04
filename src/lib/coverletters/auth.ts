import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";

const COOKIE_NAME = "cover-auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(";").map(cookie => {
      const [name, ...rest] = cookie.trim().split("=");
      return [name, rest.join("=")];
    })
  );
}

function buildSetCookieHeader(
  name: string,
  value: string,
  options: {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    maxAge?: number;
    path?: string;
  }
): string {
  const parts = [`${name}=${value}`];
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.maxAge) parts.push(`Max-Age=${options.maxAge}`);
  if (options.path) parts.push(`Path=${options.path}`);
  return parts.join("; ");
}

export const verifyCoverPassword = createServerFn({ method: "POST" })
  .inputValidator((d: string) => d)
  .handler(async ({ data: password }) => {
    const correctPassword = process.env.COVER_PASSWORD;

    if (!correctPassword) {
      throw new Error("COVER_PASSWORD not configured");
    }

    if (password === correctPassword) {
      const cookieValue = buildSetCookieHeader(COOKIE_NAME, "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: COOKIE_MAX_AGE,
        path: "/"
      });
      setResponseHeader("Set-Cookie", cookieValue);
      return { success: true };
    }

    return { success: false };
  });

export const checkCoverAuth = createServerFn({ method: "GET" }).handler(async () => {
  const request = getRequest();
  const cookieHeader = request?.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);
  return cookies[COOKIE_NAME] === "authenticated";
});
