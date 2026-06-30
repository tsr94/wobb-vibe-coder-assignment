import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ListDrawer } from "./ListDrawer";
import { useListStore } from "@/store/useListStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const count = useListStore((s) => s.selectedProfiles.length);

  return (
    <div className="p-4 min-h-screen">
      <header className="mb-6 border-b pb-4 flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-semibold text-gray-900">
            Influencer Search
          </Link>
          {title && <h1 className="text-2xl mt-2">{title}</h1>}
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open selected list"
          className="relative flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors"
        >
          My List
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </button>
      </header>

      <main>{children}</main>

      <ListDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

