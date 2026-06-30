import { useListStore } from "@/store/useListStore";
import { useNavigate } from "react-router-dom";

interface ListDrawerProps {
  open: boolean;
  onClose: () => void;
}

function formatFollowers(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return String(count);
}

export function ListDrawer({ open, onClose }: ListDrawerProps) {
  const { selectedProfiles, removeProfile, clearList } = useListStore();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-label="Selected influencers list"
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            My List{" "}
            {selectedProfiles.length > 0 && (
              <span className="ml-1 text-sm font-normal text-gray-500">
                ({selectedProfiles.length})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedProfiles.length === 0 ? (
            <p className="text-gray-400 text-sm mt-8 text-center">
              No influencers added yet.
              <br />
              Click "Add to List" on any profile.
            </p>
          ) : (
            <ul className="space-y-3">
              {selectedProfiles.map((profile) => (
                <li
                  key={profile.user_id}
                  className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50"
                >
                  <img
                    src={profile.picture}
                    alt={profile.fullname}
                    className="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      navigate(`/profile/${profile.username}`);
                      onClose();
                    }}
                  />
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => {
                      navigate(`/profile/${profile.username}`);
                      onClose();
                    }}
                  >
                    <div className="font-medium text-sm truncate">
                      @{profile.username}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {formatFollowers(profile.followers)} followers
                    </div>
                  </div>
                  <button
                    onClick={() => removeProfile(profile.user_id)}
                    aria-label={`Remove ${profile.username}`}
                    className="text-gray-400 hover:text-red-500 text-lg leading-none flex-shrink-0"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {selectedProfiles.length > 0 && (
          <div className="p-4 border-t">
            <button
              onClick={clearList}
              className="w-full py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
            >
              Clear all ({selectedProfiles.length})
            </button>
          </div>
        )}
      </div>
    </>
  );
}
