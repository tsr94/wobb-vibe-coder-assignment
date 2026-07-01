import { useEffect, useState } from "react";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";

interface UseProfileDataResult {
  profile: FullUserProfile | null;
  loading: boolean;
  notFound: boolean;
}

/**
 * Encapsulates the data-fetching logic for a single influencer profile.
 * Separates IO concerns from ProfileDetailPage so the page stays a pure render component.
 */
export function useProfileData(username: string | undefined): UseProfileDataResult {
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    setLoading(true);
    setNotFound(false);

    loadProfileByUsername(username).then((data) => {
      if (!data) setNotFound(true);
      setProfileData(data);
      setLoading(false);
    });
  }, [username]);

  return {
    profile: profileData?.data.user_profile ?? null,
    loading,
    notFound,
  };
}
