import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { EmptyState } from "./ui/EmptyState";
import { SearchX } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      layout
    >
      <AnimatePresence mode="popLayout">
        {profiles.map((profile, i) => (
          <motion.div
            key={profile.user_id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              duration: 0.22,
              delay: i < 10 ? i * 0.03 : 0, // stagger first 10, then instant
              ease: "easeOut",
            }}
          >
            <ProfileCard
              profile={profile}
              platform={platform}
              searchQuery={searchQuery}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
