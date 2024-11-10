import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createProfile,
  deleteProfile,
  fetchProfiles,
  updateProfile,
} from "../core/apiService/ProfileApiService";
import {
  ApiStatus,
  Profile,
  ProfileContextType,
  ProfileProviderProps,
} from "../core/interface/ProfileProps";

// Create ProfileContext to manage profile-related state and actions globally
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  // State to store profiles and API status
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [apiStatus, setApiStatus] = useState<ApiStatus>({ loading: false, error: null });

  // Fetch profiles list from API
  const getProfilesList = async () => {
    try {
      setApiStatus({ loading: true, error: null });
      const response = await fetchProfiles();
      const fetchedProfiles = response.data;
      setProfiles(fetchedProfiles);
      setApiStatus({ loading: false, error: null });
    } catch (error) {
      setApiStatus({ loading: false, error: "Failed to fetch profiles" });
      toast.error("Failed to fetch profiles");
    }
  };

  // Create a new profile and refresh profile list
  const createNewProfile = async (data: Profile) => {
    try {
      setApiStatus({ loading: true, error: null });
      await createProfile(data);
      await getProfilesList();
      setApiStatus({ loading: false, error: null });
      toast.success("Profile created successfully");
    } catch (error) {
      setApiStatus({ loading: false, error: "Failed to create profile" });
      toast.error("Failed to create profile");
    }
  };

  // Update a profile by ID and replace it in the profiles state
  const updateProfileById = async (id: string, data: Profile) => {
    try {
      setApiStatus({ loading: true, error: null });
      await updateProfile(id, data);
      const updatedProfiles = profiles.map((profile) =>
        profile.id === id ? data : profile
      );
      setProfiles(updatedProfiles);
      setApiStatus({ loading: false, error: null });
      toast.success("Profile updated successfully");
    } catch (error) {
      setApiStatus({ loading: false, error: "Failed to update profile" });
      toast.error("Failed to update profile");
    }
  };

  // Delete a profile by ID and remove it from the profiles state
  const deleteProfileById = async (id: string) => {
    try {
      setApiStatus({ loading: true, error: null });
      await deleteProfile(id);
      const updatedProfiles = profiles.filter((profile) => profile.id !== id);
      setProfiles(updatedProfiles);
      setApiStatus({ loading: false, error: null });
      toast.success("Profile deleted successfully");
    } catch (error) {
      setApiStatus({ loading: false, error: "Failed to delete profile" });
      toast.error("Failed to delete profile");
    }
  };

  // Load profiles from localStorage or fetch from API if not available
  useEffect(() => {
    const storedProfiles = localStorage.getItem("profiles");
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
    } else {
      getProfilesList();
    }
    getProfilesList();
  }, []);

  // Update localStorage whenever profiles state changes
  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        apiStatus,
        getProfilesList,
        createNewProfile,
        updateProfileById,
        deleteProfileById,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to access profile data and actions within ProfileProvider
export const useProfiles = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfiles must be used within a ProfileProvider");
  }
  return context;
};
