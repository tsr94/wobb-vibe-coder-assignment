# Wobb Frontend Assignment — Submission

> **Candidate:** Tilakraj Singh Rawat  
> **Repo:** https://github.com/tsr94/wobb-vibe-coder-assignment  
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

---

## Assumptions Made

1. **Static data is the source of truth.** No API calls; all profile data is in `src/assets/data/`. Vite's `import.meta.glob` lazy-loads individual profile JSONs on demand.

2. **Cross-platform duplicates are intentional UX.** MrBeast being addable from both YouTube and TikTok makes sense — a brand manager may want to run campaigns on both. Deduplication is per `user_id` (platform-scoped), not per human identity.

3. **"Optimization" scoped to architecture, not micro-benchmarks.** I audited re-render patterns and identified that `React.memo` on `ProfileCard` would be the biggest win, but since the list is small (≤ 10 profiles per platform in the dataset) the observable impact is negligible. I left the components un-memoized and clean rather than adding premature complexity.

4. **No authentication layer needed** — the assignment is a discovery UI, not a full product.

---

## Trade-offs

| Decision | Alternative | Why I chose this |
|---|---|---|
| Inline `style` props over CSS modules | CSS modules / styled-components | Keeps everything co-located and avoids class-name collisions in a small app; design tokens ensure consistency |
| `framer-motion` over CSS transitions for list | Pure CSS `@keyframes` | AnimatePresence handles mount *and* unmount which CSS can't do without JS anyway |
| `sonner` over `react-hot-toast` | react-hot-toast | Smaller bundle, ships with `closeButton` API, better dark-mode defaults |
| Persist to `localStorage` | Session storage / no persistence | Better for a "My List" mental model — the user expects their saved profiles to survive a tab refresh |
| URL as platform state (`?platform=`) | React state only | Enables back/forward navigation and deep-linking to a specific platform |

---

## Remaining Improvements

Given more time I would:

1. **`React.memo` + granular Zustand selectors on `ProfileCard`** — eliminates all list re-renders when typing (profiling would confirm whether this matters at real data scales)
2. **Stale-fetch cancellation in `useProfileData`** — an AbortController / `isCancelled` flag to prevent race conditions when navigating quickly between profiles
3. **Virtualized list** (`react-virtual`) — for datasets with hundreds of profiles the DOM would get heavy; windowing would fix it
4. **Test suite** — unit tests for `formatters.ts`, `filterProfiles`, `useListStore`, and at least a smoke test for the `SearchPage` render
5. **Empty-state illustration** — replace the emoji fallbacks with a proper SVG illustration
6. **Toast deduplication** — if a user spam-clicks Add, multiple toasts stack up; Sonner supports toast IDs to prevent this (`toast.success(..., { id: userId })`)
7. **Deployed URL** — would add Vercel deployment given more time

---

## Commit History (summary)

```
2149266  feat: UX improvements — toasts, skeleton, animations, keyboard shortcuts
3cfb6d2  chore: ignore pdf files
20cc690  feat: scroll search bar into view on focus
55350c8  fix: back to search preserves active platform tab
897bcbb  feat: show platform badge in ListDrawer for cross-platform entries
aadd642  refactor: code quality improvements
bd4a061  fix: crash on search for YouTube profiles missing username field
ecb8397  feat: add lucide-react icons across all components
75a8550  chore: fix profile images
cb86607  feat(ui): complete dark-theme redesign
acbbdd3  feat: implement Add to List with Zustand store and slide-out drawer
358135d  fix: resolve all identified bugs and quality issues
ca551c7  Add Zustand for shared state management
```
