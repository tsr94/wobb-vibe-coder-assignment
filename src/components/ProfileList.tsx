import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { EmptyState } from "./ui/EmptyState";
import { SearchX } from "lucide-react";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <EmptyState
        icon={<SearchX size={48} strokeWidth={1} />}
        title="No creators found"
        message="Try a different search term or switch platform"
      />
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
        />
      ))}
    </div>
  );
}
