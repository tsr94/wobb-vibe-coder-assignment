# Wobb Frontend Assignment — Submission

> **Candidate:** Tilakraj Singh Rawat  
> **Repo:** https://github.com/tsr94/wobb-vibe-coder-assignment  
> **Live Demo:** https://tsr94.github.io/wobb-vibe-coder-assignment/  
> **Stack:** React 19 · TypeScript · Vite · Zustand · Framer Motion · Sonner · Lucide · React Router v7

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## What I Changed

### 🐛 Bug Fixes
| Fix | Detail |
|---|---|
| YouTube search crash | Profiles missing `username` fell back to `handle ?? user_id` for navigation — previously caused a blank/broken route |
| Broken profile images | Static CDN links were dead; replaced with working proxy URLs |
| Platform not preserved on back-navigation | "Back to search" always landed on Instagram; now carries `?platform=` so the correct tab is restored |
| dataHelpers username search | Made username search case-insensitive to match fullname behavior |
| SearchPage stale closure | Used functional setState to avoid stale closure in click counter |
| ProfileCard width | Replaced hard-coded w-[700px] with responsive w-full max-w-2xl |
| ProfileDetailPage engagement rate | Corrected engagement rate multiplier from 10000 to 100 |
| ProfileDetailPage engagements count | Show raw engagements count in stat card, not the rate string |
| ProfileDetailPage imports | Removed unused formatEngagementRate import |
| profileLoader glob typing | Corrected import.meta.glob generic type to {default: ProfileDetailResponse} |
| profileLoader logic | Simplified loader logic now that glob type is properly typed |
| tsconfig deprecation error | Removed redundant baseUrl/paths from root config causing TS6 deprecation error |

---

### 🎨 UI / UX Redesign
The original UI was a plain white layout with no visual hierarchy. I replaced it entirely with a **dark-theme design system**:

- **Design tokens** — `--bg-*`, `--text-*`, `--accent-*`, `--border-*`, `--shadow-*`, `--radius-*` CSS custom properties
- **Glassmorphism nav** — sticky header with `backdrop-filter: blur`
- **Profile cards** — hover lift, accent border when added, left-strip indicator, platform-coloured stat chips
- **Platform filter tabs** — per-platform colour glow (Instagram pink / YouTube red / TikTok cyan)
- **Slide-out List Drawer** — animated panel with backdrop blur, profile avatars, follower counts, remove buttons
- **Profile Detail Page** — hero card with avatar, bio, stat grid (followers, ER, avg likes, avg views…)

---

### 🗃️ Zustand State Management
Replaced all ad-hoc state with a single persisted Zustand store (`useListStore`):

- `selectedProfiles` — persisted to `localStorage` via `zustand/middleware`
- `addProfile(profile, platform)` — deduplicates by `user_id` (platform-scoped, so the same creator can appear on YouTube and TikTok separately)
- `removeProfile`, `isInList`, `clearList`
- Each stored entry carries a `platform` field so the drawer can show a platform badge

---

### ✅ Add to List Feature
- **+ Add / Remove** button on every profile card and the detail page
- **Persistent** — survives page refresh via localStorage
- **Cross-platform duplicates allowed** — MrBeast on YouTube and TikTok are distinct campaign slots with different metrics; the drawer shows a coloured platform badge to disambiguate
- **My List drawer** — count badge on the nav button, scrollable list, click any entry to navigate to their profile

---

### ♻️ Code Quality Refactor
- Extracted `src/utils/formatters.ts` as the single source of truth for `formatFollowers` / `formatEngagementRate` — removed 3 inline duplicates
- `PLATFORM_LABELS` constant in `types/index.ts` replaces if/else chains
- `src/components/ui/` subfolder for reusable primitives: `StatBadge`, `EmptyState`
- `src/hooks/useProfileData.ts` — custom hook that separates data-fetching from `ProfileDetailPage` (pure render component)
- Deleted dead file `SearchBar.tsx` (never imported)
- Removed dead `handleProfileClick` no-op and its entire prop chain

---

### ⚡ UX Improvements
| Feature | Detail |
|---|---|
| **Toast notifications** | `sonner` — feedback on every add/remove action with a dismissible close button |
| **Shimmer skeleton** | Profile detail page shows a layout-accurate skeleton while loading instead of a bare spinner |
| **Animated list** | `framer-motion` `AnimatePresence` — cards slide-in with stagger on mount, fade-scale out when filtered away |
| **Keyboard shortcuts** | Press `/` to focus search (scrolls it into view below the sticky header); press `Escape` to clear |
| **`/` hint badge** | Keyboard affordance hint displayed inside the idle search bar |
| **Search scroll-to-top** | Clicking the search bar smooth-scrolls it into view accounting for the 64 px sticky header |
| **Platform-aware back nav** | `?platform=youtube` round-trips through the URL so the tab is restored on back |

---

## Libraries Added

| Library | Version | Why |
|---|---|---|
| `zustand` | ^5 | Minimal, typesafe global state with `persist` middleware (zero boilerplate vs. Context + useReducer) |
| `lucide-react` | ^1 | Consistent icon set; tree-shakeable |
| `sonner` | latest | Lightest (~3 KB) toast library; dark-mode ready, `closeButton` support |
| `framer-motion` | latest | `AnimatePresence` for list exit animations; `layout` prop for smooth reflow |

