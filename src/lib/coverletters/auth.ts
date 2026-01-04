import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "vinxi/http";

const COOKIE_NAME = "cover-auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const verifyCoverPassword = createServerFn({ method: "POST" })
  .inputValidator((d: string) => d)
  .handler(async ({ data: password }) => {
    const correctPassword = process.env.COVER_PASSWORD;

    if (!correctPassword) {
      throw new Error("COVER_PASSWORD not configured");
    }

    if (password === correctPassword) {
      setCookie(COOKIE_NAME, "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: COOKIE_MAX_AGE
      });
      return { success: true };
    }

    return { success: false };
  });

export const checkCoverAuth = createServerFn({ method: "GET" }).handler(async () => {
  const cookie = getCookie(COOKIE_NAME);
  return cookie === "authenticated";
});
