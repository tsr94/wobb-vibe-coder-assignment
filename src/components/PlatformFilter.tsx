import React, { useRef } from "react";
import { Camera, Play, Music2, Search, X } from "lucide-react";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

const PLATFORM_COLORS: Record<Platform, { color: string; bg: string; glow: string }> = {
  instagram: {
    color: "#e1306c",
    bg: "rgba(225,48,108,0.12)",
    glow: "rgba(225,48,108,0.3)",
  },
  youtube: {
    color: "#ff4444",
    bg: "rgba(255,68,68,0.12)",
    glow: "rgba(255,68,68,0.3)",
  },
  tiktok: {
    color: "#69c9d0",
    bg: "rgba(105,201,208,0.12)",
    glow: "rgba(105,201,208,0.3)",
  },
};

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  instagram: <Camera size={15} />,
  youtube: <Play size={15} />,
  tiktok: <Music2 size={15} />,
};

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  const palette = PLATFORM_COLORS[selected];
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollSearchIntoView = () => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80; // 64px sticky header + 16px breathing room
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} style={{ marginBottom: 28 }}>
      {/* Platform Tabs */}
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        {PLATFORMS.map((p) => {
          const isActive = selected === p;
          const c = PLATFORM_COLORS[p];
          return (
            <button
              key={p}
              id={`platform-tab-${p}`}
              type="button"
              onClick={() => onChange(p)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: 99,
                border: "1px solid",
                borderColor: isActive ? "transparent" : "var(--border)",
                background: isActive ? c.bg : "var(--bg-card)",
                color: isActive ? c.color : "var(--text-secondary)",
                fontWeight: isActive ? 700 : 500,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: isActive ? `0 0 16px ${c.glow}` : "none",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.01em",
                transform: isActive ? "scale(1.03)" : "scale(1)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = c.color + "55";
                  (e.currentTarget as HTMLButtonElement).style.color = c.color;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                }
              }}
            >
              <span style={{ fontSize: 16 }}>{PLATFORM_ICONS[p]}</span>
              {getPlatformLabel(p)}
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div
        style={{
          position: "relative",
          maxWidth: 560,
          margin: "0 auto",
        }}
      >
        {/* Search icon */}
        <span
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search size={17} />
        </span>
        <input
          id="influencer-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search ${getPlatformLabel(selected)} creators by name or handle…`}
          style={{
            width: "100%",
            padding: "14px 18px 14px 48px",
            background: "var(--bg-input)",
            border: "1px solid",
            borderColor: searchQuery ? palette.color + "66" : "var(--border)",
            borderRadius: 14,
            color: "var(--text-primary)",
            fontSize: 15,
            fontFamily: "var(--font-sans)",
            outline: "none",
            transition: "all 0.2s ease",
            boxShadow: searchQuery ? `0 0 0 3px ${palette.glow}` : "none",
          }}
          onFocus={(e) => {
            scrollSearchIntoView();
            (e.target as HTMLInputElement).style.borderColor = palette.color + "99";
            (e.target as HTMLInputElement).style.boxShadow = `0 0 0 3px ${palette.glow}`;
          }}
          onBlur={(e) => {
            if (!searchQuery) {
              (e.target as HTMLInputElement).style.borderColor = "var(--border)";
              (e.target as HTMLInputElement).style.boxShadow = "none";
            }
          }}
        />
        {/* Clear button */}
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              background: "var(--bg-card)",
              border: "none",
              borderRadius: "50%",
              width: 24,
              height: 24,
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              lineHeight: 1,
              transition: "color 0.15s",
            }}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
