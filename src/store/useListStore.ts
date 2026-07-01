import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

/** A profile stored in the list, enriched with the platform it was added from. */
export type ListProfile = UserProfileSummary & { platform: Platform };

interface ListStore {
  selectedProfiles: ListProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => void;
  removeProfile: (userId: string) => void;
  isInList: (userId: string) => boolean;
  clearList: () => void;
}

export const useListStore = create<ListStore>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],

      addProfile: (profile, platform) => {
        const already = get().isInList(profile.user_id);
        if (already) return;
        set((state) => ({
          selectedProfiles: [...state.selectedProfiles, { ...profile, platform }],
        }));
      },

      removeProfile: (userId) => {
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (p) => p.user_id !== userId
          ),
        }));
      },

      isInList: (userId) => {
        return get().selectedProfiles.some((p) => p.user_id === userId);
      },

      clearList: () => {
        set({ selectedProfiles: [] });
      },
    }),
    {
      name: "wobb-influencer-list", // localStorage key
    }
  )
);
