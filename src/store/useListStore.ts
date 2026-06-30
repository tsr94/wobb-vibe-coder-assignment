import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface ListStore {
  selectedProfiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  isInList: (userId: string) => boolean;
  clearList: () => void;
}

export const useListStore = create<ListStore>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],

      addProfile: (profile) => {
        const already = get().isInList(profile.user_id);
        if (already) return;
        set((state) => ({
          selectedProfiles: [...state.selectedProfiles, profile],
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
