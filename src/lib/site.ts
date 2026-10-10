export const SITE_URL = "https://nbr.haus";

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

export const escapeXml = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
