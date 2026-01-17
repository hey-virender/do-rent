import {create} from "zustand";

interface ProfileData {
  name: string;
  bio: string;
  address: string;
  gender: "male" | "female" | "other" | undefined;
  phone: string;
}

interface ProfileState {
  profileData: ProfileData;
  setProfileData: (data: Partial<ProfileData>) => void;
  errors: Record<string, string> | null;
  setErrors: (errors: Record<string, string> | null) => void;
  clearErrors: () => void;
  resetProfileData: () => void;
}


export const useProfileStore = create<ProfileState>((set) => ({
  profileData: {
    name: "",
    bio: "",
    address: "",
    gender: undefined,
    phone: "",
  },
  setProfileData: (data: Partial<ProfileData>) =>
    set((state) => ({
      profileData: { ...state.profileData, ...data },
    })),
  errors: null,
  setErrors: (errors) => set(() => ({ errors })),
  clearErrors: () => set(() => ({ errors: null })),
  resetProfileData: () => set(() => ({
    profileData: {
      name: "",
      bio: "",
      address: "",
      gender: undefined,
      phone: "",
    }
  })),

}))