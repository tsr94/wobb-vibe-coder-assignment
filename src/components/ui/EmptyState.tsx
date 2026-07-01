import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  message: string;
}

/**
 * Reusable empty-state display used in ProfileList and ListDrawer.
 */
export function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: 80,
        color: "var(--text-muted)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 16,
          color: "var(--text-muted)",
        }}
      >
        {icon}
      </div>
      <p
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "var(--text-secondary)",
          marginBottom: 8,
        }}
      >
        {title}
      </p>
      <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
        {message}
      </p>
    </div>
  );
}
