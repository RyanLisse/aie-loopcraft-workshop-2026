import { browser } from "$app/env";

export const feedbackStoragePrefix = "aie-loopcraft-workshop-2026-feedback:";

/**
 * SvelteKit 3 types `page.url` as a readonly URL, so accept the minimal shape
 * this helper actually reads instead of a mutable `URL`.
 * @param {{ readonly searchParams: { get(name: string): string | null } }} url
 */
export function isFeedbackEnabled(url: { readonly searchParams: { get(name: string): string | null } }) {
  if (!browser) return false;
  return url.searchParams.get("feedback") === "1";
}

export function withFeedback(href: string, enabled: boolean) {
  if (!enabled || !href.startsWith("/")) return href;
  const [beforeHash, hash] = href.split("#", 2);
  const separator = beforeHash.includes("?") ? "&" : "?";
  return `${beforeHash}${separator}feedback=1${hash ? `#${hash}` : ""}`;
}
