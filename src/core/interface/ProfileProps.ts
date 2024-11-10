import { ReactNode } from "react";

export interface ApiStatus {
  loading: boolean;
  error: string | null;
}

export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  contactNumber?: string | any;
  dob?: string | any;
  age?: string | any;
}

export interface ProfileContextType {
  profiles: Profile[];
  apiStatus: ApiStatus;
  getProfilesList: () => void;
  createNewProfile: (data: Profile) => Promise<void>;
  updateProfileById: (id: string, data: Profile) => Promise<void>;
  deleteProfileById: (id: string) => Promise<void>;
}

export interface ProfileProviderProps {
  children: ReactNode;
}
