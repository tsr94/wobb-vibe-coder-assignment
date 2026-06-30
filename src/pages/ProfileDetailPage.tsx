import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useListStore } from "@/store/useListStore";

function fmt(count: number) {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(2) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(1) + "K";
  return String(count);
}

interface StatCardProps {
  label: string;
  value: string;
  accent?: string;
}

function StatCard({ label, value, accent = "var(--accent-bright)" }: StatCardProps) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "16px 20px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: accent,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { addProfile, removeProfile, isInList } = useListStore();

  useEffect(() => {
    if (!username) return;
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p style={{ color: "var(--text-secondary)" }}>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div
          style={{
            textAlign: "center",
            padding: "120px 24px",
            color: "var(--text-muted)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              border: "3px solid var(--border)",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p>Loading @{username}…</p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: 20,
            }}
          >
            Could not load profile for @{username}
          </p>
          <Link
            to="/"
            style={{
              color: "var(--accent-bright)",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            ← Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const inList = isInList(user.user_id);

  return (
    <Layout title={`@${user.username}`}>
      {/* Back link */}
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-muted)",
          marginBottom: 32,
          transition: "color 0.15s",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-bright)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
      >
        ← Back to search
      </Link>

      {/* Profile hero card */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "32px",
          marginBottom: 24,
          display: "flex",
          gap: 28,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
        className="animate-scale-in"
      >
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img
            src={user.picture}
            alt={user.fullname}
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid var(--border-accent)",
              boxShadow: "var(--shadow-glow)",
            }}
          />
          {user.is_verified && (
            <span
              style={{
                position: "absolute",
                bottom: 2,
                right: 2,
                background: "#1d9bf0",
                borderRadius: "50%",
                width: 26,
                height: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                border: "2px solid var(--bg-card)",
              }}
            >
              ✓
            </span>
          )}
        </div>

        {/* Name / bio */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 4,
              flexWrap: "wrap",
            }}
          >
            <h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>
              @{user.username}
            </h2>
            <VerifiedBadge verified={false} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text-muted)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: 99,
                padding: "2px 10px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {platform}
            </span>
          </div>

          <p
            style={{
              fontSize: 15,
              color: "var(--text-secondary)",
              marginBottom: user.description ? 12 : 0,
            }}
          >
            {user.fullname}
          </p>

          {user.description && (
            <p
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: 16,
              }}
            >
              {user.description}
            </p>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
            {/* Add / Remove button */}
            <button
              id={`detail-add-to-list-${user.user_id}`}
              onClick={() => {
                if (inList) removeProfile(user.user_id);
                else addProfile(user);
              }}
              style={{
                padding: "10px 24px",
                borderRadius: 99,
                border: "1px solid transparent",
                background: inList
                  ? "rgba(239,68,68,0.12)"
                  : "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                color: inList ? "#f87171" : "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "var(--font-sans)",
                boxShadow: inList ? "none" : "var(--shadow-glow)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              {inList ? "✕ Remove from List" : "♡ Add to List"}
            </button>

            {/* External link */}
            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "10px 24px",
                  borderRadius: 99,
                  border: "1px solid var(--border)",
                  background: "var(--bg-surface)",
                  color: "var(--text-secondary)",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-accent)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-bright)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                }}
              >
                View on {platform} →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
        }}
        className="stagger animate-fade-in-up"
      >
        <StatCard
          label="Followers"
          value={fmt(user.followers)}
          accent="var(--accent-bright)"
        />
        {user.engagement_rate !== undefined && (
          <StatCard
            label="Engagement Rate"
            value={(user.engagement_rate * 100).toFixed(2) + "%"}
            accent="#34d399"
          />
        )}
        {user.engagements !== undefined && (
          <StatCard
            label="Engagements"
            value={fmt(user.engagements)}
            accent="#60a5fa"
          />
        )}
        {user.posts_count !== undefined && (
          <StatCard
            label="Posts"
            value={user.posts_count.toString()}
            accent="#f59e0b"
          />
        )}
        {user.avg_likes !== undefined && (
          <StatCard
            label="Avg Likes"
            value={fmt(user.avg_likes)}
            accent="#f472b6"
          />
        )}
        {user.avg_comments !== undefined && (
          <StatCard
            label="Avg Comments"
            value={user.avg_comments.toString()}
            accent="#fb923c"
          />
        )}
        {user.avg_views !== undefined && user.avg_views > 0 && (
          <StatCard
            label="Avg Views"
            value={fmt(user.avg_views)}
            accent="#38bdf8"
          />
        )}
      </div>
    </Layout>
  );
}
