/**
 * Formats a large number into a human-readable string (e.g. 1200000 → "1.2M").
 * Canonical implementation — all components should import from here.
 */
export function formatFollowers(count: number): string {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(0) + "K";
  return count.toString();
}

/**
 * Alias for formatFollowers — use when the value isn't specifically a follower count.
 */
export const formatCount = formatFollowers;

/**
 * Formats an engagement rate (0–1 decimal) to a percentage string (e.g. 0.045 → "4.50%").
 * Returns null when rate is falsy, making it convenient for conditional rendering.
 */
export function formatEngagementRate(rate: number | undefined): string | null {
  if (!rate) return null;
  return (rate * 100).toFixed(2) + "%";
}
