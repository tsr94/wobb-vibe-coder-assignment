import { useListStore } from "@/store/useListStore";
import { useNavigate } from "react-router-dom";
import { X, Heart } from "lucide-react";
import { EmptyState } from "./ui/EmptyState";
import { formatFollowers } from "@/utils/formatters";
import type { Platform } from "@/types";

/** Per-platform pill style — background and text color */
const PLATFORM_STYLES: Record<Platform, { bg: string; color: string; label: string }> = {
  instagram: { bg: "rgba(225,48,108,0.12)",  color: "#e1306c",  label: "Instagram" },
  youtube:   { bg: "rgba(255,0,0,0.10)",     color: "#ff4444",  label: "YouTube"   },
  tiktok:    { bg: "rgba(105,201,208,0.12)", color: "#69c9d0",  label: "TikTok"   },
};

interface ListDrawerProps {
  open: boolean;
  onClose: () => void;
}


export function ListDrawer({ open, onClose }: ListDrawerProps) {
  const { selectedProfiles, removeProfile, clearList } = useListStore();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            zIndex: 40,
            animation: "fadeIn 0.2s ease",
          }}
        />
      )}

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-label="Selected influencers list"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 360,
          maxWidth: "90vw",
          background: "var(--bg-surface)",
          borderLeft: "1px solid var(--border)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          boxShadow: open ? "-24px 0 80px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              My List
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "var(--text-muted)",
                marginTop: 2,
              }}
            >
              {selectedProfiles.length === 0
                ? "No influencers added yet"
                : `${selectedProfiles.length} influencer${selectedProfiles.length !== 1 ? "s" : ""} selected`}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
              transition: "all 0.15s",
              padding: 0,
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-card-hover)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-card)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: selectedProfiles.length === 0 ? "0 24px" : "16px 24px",
          }}
        >
          {selectedProfiles.length === 0 ? (
            <EmptyState
            icon={<Heart size={48} strokeWidth={1} />}
            title="Your list is empty"
            message='Click "+ Add" on any profile card to start building your influencer list.'
          />
          ) : (
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {selectedProfiles.map((profile) => (
                <li
                  key={profile.user_id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLLIElement).style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLLIElement).style.borderColor = "var(--border)";
                  }}
                >
                  {/* Avatar */}
                  <img
                    src={profile.picture}
                    alt={profile.fullname}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover",
                      flexShrink: 0,
                      cursor: "pointer",
                      border: "2px solid var(--border)",
                      transition: "border-color 0.15s",
                    }}
                    onClick={() => {
                      navigate(`/profile/${profile.username ?? profile.handle ?? profile.user_id}`);
                      onClose();
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.borderColor = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.borderColor = "var(--border)";
                    }}
                  />

                  {/* Info */}
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/profile/${profile.username ?? profile.handle ?? profile.user_id}`);
                      onClose();
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: "var(--text-primary)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flexShrink: 1,
                        }}
                      >
                        @{profile.username ?? profile.handle ?? profile.user_id}
                      </span>
                      {profile.platform && (() => {
                        const ps = PLATFORM_STYLES[profile.platform];
                        return (
                          <span
                            style={{
                              flexShrink: 0,
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                              padding: "1px 7px",
                              borderRadius: 99,
                              background: ps.bg,
                              color: ps.color,
                              border: `1px solid ${ps.color}30`,
                            }}
                          >
                            {ps.label}
                          </span>
                        );
                      })()}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      {formatFollowers(profile.followers)} followers
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeProfile(profile.user_id)}
                    aria-label={`Remove ${profile.username}`}
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: "1px solid var(--border)",
                      background: "transparent",
                      color: "var(--text-muted)",
                      fontSize: 16,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: 1,
                      transition: "all 0.15s",
                      padding: 0,
                      fontFamily: "var(--font-sans)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.12)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.4)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#f87171";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                    }}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {selectedProfiles.length > 0 && (
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              {selectedProfiles.length} influencer{selectedProfiles.length !== 1 ? "s" : ""} in your campaign list
            </div>
            <button
              onClick={clearList}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(239,68,68,0.25)",
                background: "rgba(239,68,68,0.07)",
                color: "#f87171",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.14)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.07)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.25)";
              }}
            >
              Clear all ({selectedProfiles.length})
            </button>
          </div>
        )}
      </div>
    </>
  );
}
