import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { Platform } from "@/types";
import { useListStore } from "@/store/useListStore";
import { ArrowLeft, Check, Heart, X, ExternalLink } from "lucide-react";
import { useProfileData } from "@/hooks/useProfileData";
import { formatCount } from "@/utils/formatters";
import { toast } from "sonner";

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
  const platform = (searchParams.get("platform") || "instagram") as Platform;
  const { profile: user, loading, notFound } = useProfileData(username);
  const { addProfile, removeProfile, isInList } = useListStore();

  if (!username) {
    return (
      <Layout>
        <p style={{ color: "var(--text-secondary)" }}>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (loading) {
    // Skeleton that mirrors the actual profile layout
    const Bone = ({ w, h, radius = 8 }: { w: string | number; h: number; radius?: number }) => (
      <div
        style={{
          width: w,
          height: h,
          borderRadius: radius,
          background: "linear-gradient(90deg, #1e2335 25%, #252a3d 50%, #1e2335 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.4s ease infinite",
        }}
      />
    );
    return (
      <Layout>
        <style>{`@keyframes shimmer { from { background-position: 200% center; } to { background-position: -200% center; } }`}</style>
        {/* Back link skeleton */}
        <Bone w={120} h={16} />
        {/* Hero card skeleton */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: 32,
            marginTop: 28,
            marginBottom: 24,
            display: "flex",
            gap: 28,
            alignItems: "flex-start",
          }}
        >
          <Bone w={100} h={100} radius={50} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            <Bone w="40%" h={28} />
            <Bone w="25%" h={16} />
            <Bone w="70%" h={14} />
            <Bone w="70%" h={14} />
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Bone w={140} h={40} radius={99} />
              <Bone w={130} h={40} radius={99} />
            </div>
          </div>
        </div>
        {/* Stats grid skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Bone w="50%" h={10} />
              <Bone w="70%" h={22} />
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  if (notFound || !user) {
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
            to={`/?platform=${platform}`}
            style={{
              color: "var(--accent-bright)",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            <ArrowLeft size={14} style={{ display: "inline-block", marginRight: 4 }} /> Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const inList = isInList(user.user_id);

  return (
    <Layout title={`@${user.username}`}>
      {/* Back link */}
      <Link
        to={`/?platform=${platform}`}
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
        <ArrowLeft size={15} /> Back to search
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
                color: "white",
                border: "2px solid var(--bg-card)",
              }}
            >
              <Check size={13} strokeWidth={3} />
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
                if (inList) {
                  removeProfile(user.user_id);
                  toast(`Removed @${user.username ?? username}`, { icon: "✕", duration: 2500 });
                } else {
                  addProfile(user, platform);
                  toast.success(`@${user.username ?? username} added to your list`, { duration: 2500 });
                }
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
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              {inList ? <><X size={14} /> Remove from List</> : <><Heart size={14} /> Add to List</>}
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
                View on {platform} <ExternalLink size={13} />
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
          value={formatCount(user.followers)}
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
            value={formatCount(user.engagements)}
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
            value={formatCount(user.avg_likes)}
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
            value={formatCount(user.avg_views)}
            accent="#38bdf8"
          />
        )}
      </div>
    </Layout>
  );
}
