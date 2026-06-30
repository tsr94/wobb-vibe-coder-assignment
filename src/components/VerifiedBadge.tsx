interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span
      title="Verified"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        background: "#1d9bf0",
        borderRadius: "50%",
        fontSize: 10,
        fontWeight: 800,
        color: "#fff",
        marginLeft: 6,
        flexShrink: 0,
      }}
    >
      ✓
    </span>
  );
}
