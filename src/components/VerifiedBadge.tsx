import { Check } from "lucide-react";

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
        color: "#fff",
        marginLeft: 6,
        flexShrink: 0,
      }}
    >
      <Check size={10} strokeWidth={3} />
    </span>
  );
}
