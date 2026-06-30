import { useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles, getPlatformLabel } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = (_username: string) => {
    // navigation handled inside ProfileCard
  };

  return (
    <Layout>
      {/* ── Hero ── */}
      <div
        style={{
          textAlign: "center",
          padding: "48px 24px 40px",
          marginBottom: 8,
        }}
        className="animate-fade-in-up"
      >
        <div
          style={{
            display: "inline-block",
            padding: "4px 16px",
            background: "var(--accent-dim)",
            border: "1px solid var(--border-accent)",
            borderRadius: 99,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--accent-bright)",
            marginBottom: 20,
            letterSpacing: "0.04em",
          }}
        >
          ✦ Influencer Discovery Platform
        </div>

        <h1
          style={{
            background: "linear-gradient(135deg, #f0f2ff 0%, #a78bfa 50%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 16,
            lineHeight: 1.15,
          }}
        >
          Find the Right Creator <br />for Every Campaign
        </h1>

        <p
          style={{
            fontSize: 17,
            color: "var(--text-secondary)",
            maxWidth: 480,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Browse top creators across Instagram, YouTube, and TikTok.
          Build your shortlist in seconds.
        </p>

        <PlatformFilter
          selected={platform}
          onChange={(p) => {
            setPlatform(p);
            setSearchQuery("");
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* ── Results count bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          padding: "0 4px",
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            fontWeight: 500,
          }}
        >
          {searchQuery ? (
            <>
              <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                {filtered.length}
              </span>{" "}
              of {allProfiles.length} results for{" "}
              <span style={{ color: "var(--accent-bright)", fontWeight: 600 }}>
                "{searchQuery}"
              </span>{" "}
              on {getPlatformLabel(platform)}
            </>
          ) : (
            <>
              Showing all{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                {allProfiles.length}
              </span>{" "}
              creators on {getPlatformLabel(platform)}
            </>
          )}
        </p>
      </div>

      {/* ── Profile list ── */}
      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
