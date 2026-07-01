import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { Check, Plus, X } from "lucide-react";
import { VerifiedBadge } from "./VerifiedBadge";
import { useListStore } from "@/store/useListStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowers(count: number) {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(0) + "K";
  return count.toString();
}

function formatEngagement(rate: number | undefined) {
  if (!rate) return null;
  return (rate * 100).toFixed(2) + "%";
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, removeProfile, isInList } = useListStore();
  const added = isInList(profile.user_id);
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  // Some YouTube profiles have no username, only a handle
  const displayHandle = profile.username ?? profile.handle ?? profile.user_id;

  const handleClick = () => {
    if (onProfileClick) onProfileClick(displayHandle);
    navigate(`/profile/${displayHandle}?platform=${platform}`);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (added) removeProfile(profile.user_id);
    else addProfile(profile);
  };

  const engagementStr = formatEngagement(profile.engagement_rate);

  return (
    <div
      id={`profile-card-${profile.user_id}`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-search={searchQuery}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
        border: "1px solid",
        borderColor: added ? "var(--border-accent)" : hovered ? "rgba(255,255,255,0.12)" : "var(--border)",
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? added
            ? "0 8px 32px rgba(139,92,246,0.2)"
            : "var(--shadow-card)"
          : "none",
        position: "relative",
        overflow: "hidden",
      }}
      className="animate-fade-in-up"
    >
      {/* Added indicator strip */}
      {added && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: "linear-gradient(180deg, #8b5cf6, #6d28d9)",
            borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
          }}
        />
      )}

      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img
          src={profile.picture}
          alt={profile.fullname}
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid",
            borderColor: added ? "var(--accent)" : "var(--border)",
            transition: "border-color 0.2s",
          }}
        />
        {profile.is_verified && (
          <span
            style={{
              position: "absolute",
              bottom: -2,
              right: -2,
              background: "#1d9bf0",
              borderRadius: "50%",
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              border: "2px solid var(--bg-card)",
              color: "white",
            }}
          >
            <Check size={10} strokeWidth={3} />
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 2,
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: "var(--text-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            @{displayHandle}
          </span>
          <VerifiedBadge verified={false} />
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: 6,
          }}
        >
          {profile.fullname}
        </div>

        {/* Stats chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--accent-bright)",
              background: "var(--accent-dim)",
              padding: "2px 10px",
              borderRadius: 99,
            }}
          >
            {formatFollowers(profile.followers)} followers
          </span>
          {engagementStr && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#34d399",
                background: "rgba(52,211,153,0.1)",
                padding: "2px 10px",
                borderRadius: 99,
              }}
            >
              {engagementStr} ER
            </span>
          )}
        </div>
      </div>

      {/* Add to List Button */}
      <button
        id={`add-to-list-${profile.user_id}`}
        onClick={handleListToggle}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          flexShrink: 0,
          padding: "8px 18px",
          borderRadius: 99,
          border: "1px solid",
          borderColor: added
            ? "transparent"
            : btnHovered
            ? "var(--accent)"
            : "var(--border)",
          background: added
            ? "rgba(239,68,68,0.12)"
            : btnHovered
            ? "var(--accent-dim)"
            : "transparent",
          color: added ? "#f87171" : btnHovered ? "var(--accent-bright)" : "var(--text-secondary)",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.18s ease",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-sans)",
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        {added ? (
          <><X size={13} /> Remove</>
        ) : (
          <><Plus size={13} /> Add</>
        )}
      </button>
    </div>
  );
}
