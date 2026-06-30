import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 24px",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <p
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginBottom: 8,
          }}
        >
          No creators found
        </p>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
          Try a different search term or switch platform
        </p>
      </div>
    );
  }

  return (
    <div
      className="stagger"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}
