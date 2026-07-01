interface StatBadgeProps {
  value: string;
  /** "accent" = purple followers chip; "green" = engagement rate chip */
  color: "accent" | "green";
}

/**
 * Reusable pill chip for follower counts and engagement rates.
 * Used in ProfileCard and ProfileDetailPage.
 */
export function StatBadge({ value, color }: StatBadgeProps) {
  const isAccent = color === "accent";
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: isAccent ? "var(--accent-bright)" : "#34d399",
        background: isAccent ? "var(--accent-dim)" : "rgba(52,211,153,0.1)",
        padding: "2px 10px",
        borderRadius: 99,
      }}
    >
      {value}
    </span>
  );
}
