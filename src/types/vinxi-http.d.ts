declare module "vinxi/http" {
  export function getCookie(name: string): string | undefined;
  export function setCookie(
    name: string,
    value: string,
    options?: {
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
      maxAge?: number;
      path?: string;
    }
  ): void;
}
