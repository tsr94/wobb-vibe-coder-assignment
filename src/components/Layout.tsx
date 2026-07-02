import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";
import { ListDrawer } from "./ListDrawer";
import { useListStore } from "@/store/useListStore";
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const count = useListStore((s) => s.selectedProfiles.length);

  return (
    <div style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}>
      {/* ── Navigation ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(13,15,24,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(139,92,246,0.4)",
              }}
            >
              <Sparkles size={16} color="#fff" />
            </span>
            <span
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Wobb
            </span>
          </Link>

          {/* My List Button */}
          <button
            id="open-list-drawer"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open selected list"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              background: count > 0
                ? "linear-gradient(135deg, #8b5cf6, #6d28d9)"
                : "var(--bg-card)",
              border: "1px solid",
              borderColor: count > 0 ? "transparent" : "var(--border)",
              borderRadius: 99,
              color: "var(--text-primary)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: count > 0 ? "var(--shadow-glow)" : "none",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            <Heart size={15} />
            My List
            {count > 0 && (
              <span
                style={{
                  background: "#fff",
                  color: "#7c3aed",
                  fontSize: 11,
                  fontWeight: 800,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Page title bar (only shown when title prop is passed) */}
      {title && (
        <div
          style={{
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-surface)",
            padding: "20px 24px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h1
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700,
                margin: 0,
                color: "var(--text-primary)",
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      )}

      {/* Main content */}
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "20px 24px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: 13,
        }}
      >
        © 2026 Wobb · Influencer Discovery Platform
      </footer>

      <ListDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1e2335",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#f0f2ff",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
          },
        }}
      />
    </div>
  );
}
